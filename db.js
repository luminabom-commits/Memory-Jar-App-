/**
 * Memory Jars — Database Layer (db.js)
 * Uses IndexedDB for persistent, structured client-side storage.
 * Follows the schema defined in schema.json.
 *
 * Created by @luminabom | luminabom.portfolio
 */

const DB_NAME = 'MemoryJarsDB';
const DB_VERSION = 2;

let _db = null;

// ─────────────────────────────────────────────
//  OPEN / INIT
// ─────────────────────────────────────────────
export function openDB() {
  return new Promise((resolve, reject) => {
    if (_db) return resolve(_db);

    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event) => {
      const db = event.target.result;

      // users
      if (!db.objectStoreNames.contains('users')) {
        const us = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        us.createIndex('by_username', 'username', { unique: true });
      }

      // categories
      if (!db.objectStoreNames.contains('categories')) {
        const cs = db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
        cs.createIndex('by_owner', 'owner_id');
        cs.createIndex('by_name', 'name');
      }

      // jars
      if (!db.objectStoreNames.contains('jars')) {
        const js = db.createObjectStore('jars', { keyPath: 'id' });
        js.createIndex('by_owner', 'owner_id');
        js.createIndex('by_category', 'category_id');
        js.createIndex('by_created', 'created_at');
      }

      // memories
      if (!db.objectStoreNames.contains('memories')) {
        const ms = db.createObjectStore('memories', { keyPath: 'id' });
        ms.createIndex('by_jar', 'jar_id');
        ms.createIndex('by_date', 'date');
        ms.createIndex('by_type', 'type');
      }

      // sessions
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'key' });
      }
    };

    req.onsuccess = (event) => {
      _db = event.target.result;
      resolve(_db);
    };

    req.onerror = (event) => reject(event.target.error);
  });
}

// ─────────────────────────────────────────────
//  GENERIC HELPERS
// ─────────────────────────────────────────────
function tx(stores, mode = 'readonly') {
  return _db.transaction(stores, mode);
}

function promisifyRequest(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAll(store) {
  return promisifyRequest(tx(store).objectStore(store).getAll());
}

function getOne(store, key) {
  return promisifyRequest(tx(store).objectStore(store).get(key));
}

function put(store, record) {
  return promisifyRequest(tx(store, 'readwrite').objectStore(store).put(record));
}

function del(store, key) {
  return promisifyRequest(tx(store, 'readwrite').objectStore(store).delete(key));
}

function getByIndex(store, indexName, value) {
  return promisifyRequest(tx(store).objectStore(store).index(indexName).getAll(value));
}

// ─────────────────────────────────────────────
//  PIN HASHING  (SHA-256 via Web Crypto API)
// ─────────────────────────────────────────────
export async function hashPIN(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode('memoryjars_salt_' + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─────────────────────────────────────────────
//  USERS
// ─────────────────────────────────────────────
export async function createUser(username, pin) {
  const trimmed = username.trim();
  if (trimmed.length < 2) throw new Error('Username must be at least 2 characters.');
  if (!/^\d{6}$/.test(pin)) throw new Error('PIN must be exactly 6 digits.');

  // Check uniqueness
  const existing = await getUserByUsername(trimmed);
  if (existing) throw new Error('Username already taken.');

  const pin_hash = await hashPIN(pin);
  const now = new Date().toISOString();
  const avatarColors = ['#E8A427','#D4537E','#1D9E75','#378ADD','#7F77DD','#D85A30','#639922'];
  const avatar_color = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const user = {
    username: trimmed,
    pin_hash,
    avatar_color,
    created_at: now,
    last_login: now,
    settings: { lang: 'en', theme: 'warm', sort_mode: 'az' }
  };

  const id = await promisifyRequest(tx('users', 'readwrite').objectStore('users').add(user));
  return { ...user, id };
}

export async function getUserByUsername(username) {
  return promisifyRequest(
    tx('users').objectStore('users').index('by_username').get(username.trim())
  );
}

export async function verifyUser(username, pin) {
  const user = await getUserByUsername(username);
  if (!user) throw new Error('User not found.');
  const pin_hash = await hashPIN(pin);
  if (pin_hash !== user.pin_hash) throw new Error('Incorrect PIN.');
  // Update last_login
  user.last_login = new Date().toISOString();
  await put('users', user);
  return user;
}

export async function updateUserSettings(userId, settings) {
  const user = await getOne('users', userId);
  if (!user) throw new Error('User not found.');
  user.settings = { ...user.settings, ...settings };
  await put('users', user);
  return user;
}

// ─────────────────────────────────────────────
//  SESSIONS
// ─────────────────────────────────────────────
export async function saveSession(user) {
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // 24-hour session
  const session = {
    key: 'current',
    user_id: user.id,
    username: user.username,
    avatar_color: user.avatar_color,
    settings: user.settings,
    expires_at: expires.toISOString()
  };
  await put('sessions', session);
  return session;
}

export async function loadSession() {
  const session = await getOne('sessions', 'current');
  if (!session) return null;
  if (new Date(session.expires_at) < new Date()) {
    await del('sessions', 'current');
    return null;
  }
  return session;
}

export async function clearSession() {
  await del('sessions', 'current');
}

// ─────────────────────────────────────────────
//  CATEGORIES
// ─────────────────────────────────────────────
export async function getCategoriesForUser(userId) {
  // returns user's own + showcase (owner_id = null)
  const all = await getAll('categories');
  return all
    .filter(c => c.owner_id === userId || c.owner_id === null)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || a.name.localeCompare(b.name));
}

export async function createCategory(name, ownerId, sortOrder = 0) {
  const cat = {
    name: name.trim(),
    owner_id: ownerId,
    sort_order: sortOrder,
    created_at: new Date().toISOString()
  };
  const id = await promisifyRequest(tx('categories', 'readwrite').objectStore('categories').add(cat));
  return { ...cat, id };
}

export async function updateCategory(id, name) {
  const cat = await getOne('categories', id);
  if (!cat) throw new Error('Category not found.');
  cat.name = name.trim();
  await put('categories', cat);
  return cat;
}

export async function deleteCategory(id) {
  await del('categories', id);
}

export async function reorderCategories(orderedIds) {
  await Promise.all(orderedIds.map(async (id, i) => {
    const cat = await getOne('categories', id);
    if (cat) { cat.sort_order = i; await put('categories', cat); }
  }));
}

// ─────────────────────────────────────────────
//  JARS
// ─────────────────────────────────────────────
export async function getJarsForUser(userId) {
  const all = await getAll('jars');
  return all.filter(j => j.owner_id === userId || j.is_showcase);
}

export async function getShowcaseJars() {
  const all = await getAll('jars');
  return all.filter(j => j.is_showcase);
}

export async function createJar(jarData, ownerId) {
  const now = new Date().toISOString();
  const jar = {
    id: crypto.randomUUID(),
    owner_id: ownerId,
    name: jarData.name,
    category_id: jarData.category_id,
    color: jarData.color || 'amber',
    icon: jarData.icon || '',
    desc: jarData.desc || '',
    note: jarData.note || '',
    ctags: jarData.ctags || [],
    is_showcase: false,
    created_at: now,
    updated_at: now
  };
  await put('jars', jar);
  return jar;
}

export async function updateJar(id, updates) {
  const jar = await getOne('jars', id);
  if (!jar) throw new Error('Jar not found.');
  Object.assign(jar, updates, { updated_at: new Date().toISOString() });
  await put('jars', jar);
  return jar;
}

export async function deleteJar(id) {
  // also delete all memories
  const memories = await getMemoriesForJar(id);
  await Promise.all(memories.map(m => del('memories', m.id)));
  await del('jars', id);
}

// ─────────────────────────────────────────────
//  MEMORIES
// ─────────────────────────────────────────────
export async function getMemoriesForJar(jarId) {
  return getByIndex('memories', 'by_jar', jarId);
}

export async function createMemory(jarId, memData) {
  const memory = {
    id: crypto.randomUUID(),
    jar_id: jarId,
    type: memData.type,
    text: memData.text || '',
    data: memData.data || '',
    caption: memData.caption || '',
    date: memData.date || new Date().toISOString().slice(0, 10),
    mood: memData.mood || '',
    tags: memData.tags || [],
    created_at: new Date().toISOString()
  };
  await put('memories', memory);
  // Update jar's updated_at
  const jar = await getOne('jars', jarId);
  if (jar) { jar.updated_at = new Date().toISOString(); await put('jars', jar); }
  return memory;
}

export async function deleteMemory(id) {
  await del('memories', id);
}

// ─────────────────────────────────────────────
//  SEEDING — Showcase jars (run once)
// ─────────────────────────────────────────────
export async function seedShowcaseIfNeeded(showcaseData) {
  const existing = await getShowcaseJars();
  if (existing.length > 0) return; // Already seeded

  const now = new Date().toISOString();

  // Create showcase categories
  const catNames = [...new Set(showcaseData.map(j => j.category))];
  const catMap = {};
  for (let i = 0; i < catNames.length; i++) {
    const cat = await createCategory(catNames[i], null, i);
    catMap[catNames[i]] = cat.id;
  }

  // Create jars + memories
  for (const jd of showcaseData) {
    const jar = {
      id: jd.id || crypto.randomUUID(),
      owner_id: null,
      name: jd.name,
      category_id: catMap[jd.category],
      color: jd.color,
      icon: jd.icon || '',
      desc: jd.desc || '',
      note: jd.note || '',
      ctags: jd.ctags || [],
      is_showcase: true,
      created_at: now,
      updated_at: now
    };
    await put('jars', jar);

    for (const m of (jd.memories || [])) {
      await put('memories', {
        id: m.id || crypto.randomUUID(),
        jar_id: jar.id,
        type: m.type,
        text: m.text || '',
        data: m.data || '',
        caption: m.caption || '',
        date: m.date || now.slice(0, 10),
        mood: m.mood || '',
        tags: m.tags || [],
        created_at: now
      });
    }
  }
}

// ─────────────────────────────────────────────
//  EXPORT / IMPORT
// ─────────────────────────────────────────────
export async function exportUserData(userId, username) {
  const categories = await getCategoriesForUser(userId);
  const jars = await getJarsForUser(userId);
  const userJars = jars.filter(j => j.owner_id === userId);
  const memories = [];
  for (const jar of userJars) {
    const mems = await getMemoriesForJar(jar.id);
    memories.push(...mems);
  }

  return {
    export_version: '2.0',
    exported_at: new Date().toISOString(),
    exported_by: username,
    categories: categories.filter(c => c.owner_id === userId),
    jars: userJars,
    memories
  };
}

export async function importUserData(userId, jsonData) {
  const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  const now = new Date().toISOString();

  // Import categories
  const catIdMap = {};
  for (const cat of (data.categories || [])) {
    const newCat = await createCategory(cat.name, userId, cat.sort_order || 0);
    catIdMap[cat.id] = newCat.id;
  }

  // Import jars
  const jarIdMap = {};
  for (const jar of (data.jars || [])) {
    const newJar = {
      id: crypto.randomUUID(),
      owner_id: userId,
      name: jar.name,
      category_id: catIdMap[jar.category_id] || jar.category_id,
      color: jar.color || 'amber',
      icon: jar.icon || '',
      desc: jar.desc || '',
      note: jar.note || '',
      ctags: jar.ctags || [],
      is_showcase: false,
      created_at: now,
      updated_at: now
    };
    await put('jars', newJar);
    jarIdMap[jar.id] = newJar.id;
  }

  // Import memories
  for (const mem of (data.memories || [])) {
    await put('memories', {
      id: crypto.randomUUID(),
      jar_id: jarIdMap[mem.jar_id] || mem.jar_id,
      type: mem.type,
      text: mem.text || '',
      data: mem.data || '',
      caption: mem.caption || '',
      date: mem.date || now.slice(0, 10),
      mood: mem.mood || '',
      tags: mem.tags || [],
      created_at: now
    });
  }

  return { categories: Object.keys(catIdMap).length, jars: Object.keys(jarIdMap).length, memories: data.memories?.length || 0 };
}

// ─────────────────────────────────────────────
//  STATS
// ─────────────────────────────────────────────
export async function getUserStats(userId) {
  const jars = await getJarsForUser(userId);
  const userJars = jars.filter(j => j.owner_id === userId);
  let totalMemories = 0, totalPhotos = 0;
  for (const jar of userJars) {
    const mems = await getMemoriesForJar(jar.id);
    totalMemories += mems.length;
    totalPhotos += mems.filter(m => m.type === 'photo').length;
  }
  return { jars: userJars.length, memories: totalMemories, photos: totalPhotos };
}
