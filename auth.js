/**
 * Memory Jars — Authentication Module (auth.js)
 * Handles user registration, login, sessions, and PIN verification.
 *
 * Created by @luminabom | luminabom.portfolio
 */

import * as DB from './db.js';

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let _currentUser = null;

export function getCurrentUser() {
  return _currentUser;
}

export function isLoggedIn() {
  return _currentUser !== null;
}

// ─────────────────────────────────────────────
//  INIT — Restore session on page load
// ─────────────────────────────────────────────
export async function initAuth() {
  const session = await DB.loadSession();
  if (session) {
    _currentUser = session;
    return session;
  }
  return null;
}

// ─────────────────────────────────────────────
//  REGISTER
// ─────────────────────────────────────────────
export async function register(username, pin, confirmPin) {
  // Validate
  const errs = [];
  if (!username || username.trim().length < 2) errs.push('Username must be at least 2 characters.');
  if (username.trim().length > 32) errs.push('Username must be 32 characters or less.');
  if (!/^[a-zA-Z0-9_.\u0E00-\u0E7F]+$/.test(username.trim())) errs.push('Username may only contain letters, numbers, underscores, dots, or Thai characters.');
  if (!/^\d{6}$/.test(pin)) errs.push('PIN must be exactly 6 digits (0–9).');
  if (pin !== confirmPin) errs.push('PINs do not match.');
  if (errs.length) throw new Error(errs.join(' '));

  const user = await DB.createUser(username, pin);
  const session = await DB.saveSession(user);
  _currentUser = session;
  return { user, session };
}

// ─────────────────────────────────────────────
//  LOGIN
// ─────────────────────────────────────────────
export async function login(username, pin) {
  if (!username || !pin) throw new Error('Please enter your username and PIN.');
  const user = await DB.verifyUser(username, pin);
  const session = await DB.saveSession(user);
  _currentUser = session;
  return { user, session };
}

// ─────────────────────────────────────────────
//  LOGOUT
// ─────────────────────────────────────────────
export async function logout() {
  await DB.clearSession();
  _currentUser = null;
}

// ─────────────────────────────────────────────
//  CHANGE PIN
// ─────────────────────────────────────────────
export async function changePIN(username, oldPin, newPin, confirmNewPin) {
  if (!/^\d{6}$/.test(newPin)) throw new Error('New PIN must be exactly 6 digits.');
  if (newPin !== confirmNewPin) throw new Error('New PINs do not match.');
  await DB.verifyUser(username, oldPin); // will throw if wrong
  const user = await DB.getUserByUsername(username);
  const pin_hash = await DB.hashPIN(newPin);
  user.pin_hash = pin_hash;
  await DB.put('users', user);
}

// ─────────────────────────────────────────────
//  VALIDATE PIN FORMAT (for live UI feedback)
// ─────────────────────────────────────────────
export function validatePINInput(value) {
  if (!/^\d*$/.test(value)) return { ok: false, msg: 'PIN digits only (0–9).' };
  if (value.length < 6) return { ok: false, msg: `${6 - value.length} more digit${6 - value.length !== 1 ? 's' : ''} needed.` };
  if (value.length > 6) return { ok: false, msg: 'PIN must be exactly 6 digits.' };
  return { ok: true, msg: '✓ Good PIN' };
}

export function validateUsername(value) {
  if (!value || value.length < 2) return { ok: false, msg: 'At least 2 characters.' };
  if (value.length > 32) return { ok: false, msg: 'Max 32 characters.' };
  if (!/^[a-zA-Z0-9_.\u0E00-\u0E7F]+$/.test(value)) return { ok: false, msg: 'Letters, numbers, _ . or Thai only.' };
  return { ok: true, msg: '✓ Username looks good' };
}
