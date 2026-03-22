/**
 * Memory Jars — app.js  v3.0
 * State, i18n (EN/TH/ZH/JA/KO), jar data, utilities
 * Created by @luminabom | luminabom.portfolio
 */

// ─────────────────────────────────────────────
//  FULL I18N — all 5 languages, every string
// ─────────────────────────────────────────────
export const LANGS = {
  en: {
    appTitle:'Memory Jars', appSubtitle:'Keep your most treasured moments',
    // Nav
    allJars:'All Jars', myJars:'My Jars', showcase:'Showcase', library:'Library',
    organise:'Organise', data:'Data',
    // Auth
    login:'Log In', register:'Create Account', logout:'Log out', signIn:'Sign In',
    username:'Username', pin:'PIN (6 digits)', confirmPin:'Confirm PIN',
    noAccount:'New here?', hasAccount:'Already have an account?',
    syncHint:'Optional — sign in to back up across devices',
    backToJars:'← Back to jars',
    // Jar actions
    newJar:'New Jar', createJar:'Create a new jar', jarName:'Jar name',
    colour:'Colour', category:'Category', jarDesc:'Description (optional)',
    icon:'Icon', jarNote:'Hover note', creatorTags:'Creator tags (comma-separated)',
    createJarBtn:'Create jar', editJar:'Edit jar',
    saveChanges:'Save changes', deleteJar:'Delete jar',
    duplicate:'Duplicate', cancel:'Cancel',
    // Jar card
    memCnt:(n)=>`${n} memor${n===1?'y':'ies'}`,
    // Memories
    all:'All', notes:'Notes', photos:'Photos',
    addMemory:'Add a memory', note:'📝 Note', photo:'📷 Photo',
    yourNote:'Your note', mood:'Mood', date:'Date', tags:'Tags',
    saveNote:'Save note', caption:'Caption (optional)', savePhoto:'Save photo(s)',
    clickToChoose:'Tap to choose photos (multiple OK)',
    writeHere:'Write a memory…', typeTag:'type + Enter',
    noMemType:'No memories of this type.',
    emptyJar:'This jar is empty — add a memory below ✨',
    showcaseJarNote:'✨ Showcase jar — ',
    showcaseCreateOwn:'create your own jar',
    showcaseCreateOwnSuffix:' to add memories.',
    // Categories
    manageCategories:'Categories', addCategory:'Add',
    noCats:'No categories yet', catMovedTo:'Jars will be moved to My Jars.',
    renameCategory:'Rename category:',
    // Shelf
    noJars:'No jars yet — tap ＋ to create one!',
    noResults:'No results found.',
    emptyShelf:'No jars here yet',
    // Search
    searchPlaceholder:'Search jars & memories…', clearSearch:'Clear',
    searchLabel:'Search',
    // Sort
    sortAZ:'A–Z', sortZA:'Z–A', sortNewest:'Newest', sortOldest:'Oldest',
    sort:'Sort',
    // Stats sidebar
    statsTitle:'Stats', statsJars:'Jars', statsMems:'Memories', statsPhotos:'Photos',
    // Sidebar
    categories:'Categories', exportData:'Export', importData:'Import',
    // Confirm
    confirmDeleteJar:'This will permanently delete the jar and all its memories.',
    confirmDeleteMem:'Delete this memory permanently?',
    confirmDeleteCat:'Jars will be moved to My Jars.',
    // Toast
    saved:'Saved!', deleted:'Deleted.', jarCreated:'Jar created!', duplicated:'Duplicated!',
    importOK:'Imported!', exportOK:'Exported!',
    loginSuccess:'Welcome back!', registerSuccess:'Account created!', loggedOut:'Logged out.',
    // Auth errors
    writeFirst:'Please write something first!', choosePhoto:'Choose a photo first!',
    nameJar:'Please name your jar!', importFail:'Import failed — invalid file.',
    // Privacy
    privacyTitle:'Privacy', privacyText:'All data is stored locally in your browser. Nothing is sent to any server. Clearing browser site data will erase all jars, memories, and accounts. Export your data regularly as a backup.',
    dismiss:'Dismiss',
    // Context menu
    open:'Open',
  },

  th: {
    appTitle:'โหลความทรงจำ', appSubtitle:'เก็บความทรงจำที่ล้ำค่าของคุณ',
    allJars:'โหลทั้งหมด', myJars:'โหลของฉัน', showcase:'ตัวอย่าง', library:'คลัง',
    organise:'จัดระเบียบ', data:'ข้อมูล',
    login:'เข้าสู่ระบบ', register:'สร้างบัญชี', logout:'ออกจากระบบ', signIn:'เข้าสู่ระบบ',
    username:'ชื่อผู้ใช้', pin:'PIN (6 หลัก)', confirmPin:'ยืนยัน PIN',
    noAccount:'ยังไม่มีบัญชี?', hasAccount:'มีบัญชีแล้ว?',
    syncHint:'ไม่บังคับ — เข้าสู่ระบบเพื่อสำรองข้อมูลข้ามอุปกรณ์',
    backToJars:'← กลับไปยังโหล',
    newJar:'โหลใหม่', createJar:'สร้างโหลใหม่', jarName:'ชื่อโหล',
    colour:'สี', category:'หมวดหมู่', jarDesc:'คำอธิบาย (ไม่บังคับ)',
    icon:'ไอคอน', jarNote:'โน้ตเมื่อชี้เมาส์', creatorTags:'แท็กผู้สร้าง (คั่นด้วยจุลภาค)',
    createJarBtn:'สร้างโหล', editJar:'แก้ไขโหล',
    saveChanges:'บันทึกการเปลี่ยนแปลง', deleteJar:'ลบโหล',
    duplicate:'ทำสำเนา', cancel:'ยกเลิก',
    memCnt:(n)=>`${n} ความทรงจำ`,
    all:'ทั้งหมด', notes:'บันทึก', photos:'รูปภาพ',
    addMemory:'เพิ่มความทรงจำ', note:'📝 บันทึก', photo:'📷 รูปภาพ',
    yourNote:'บันทึกของคุณ', mood:'อารมณ์', date:'วันที่', tags:'แท็ก',
    saveNote:'บันทึก', caption:'คำบรรยาย (ไม่บังคับ)', savePhoto:'บันทึกรูปภาพ',
    clickToChoose:'แตะเพื่อเลือกรูปภาพ (เลือกหลายรูปได้)',
    writeHere:'เขียนความทรงจำ…', typeTag:'พิมพ์ + Enter',
    noMemType:'ไม่มีความทรงจำประเภทนี้',
    emptyJar:'โหลนี้ว่างเปล่า — เพิ่มความทรงจำด้านล่าง ✨',
    showcaseJarNote:'✨ โหลตัวอย่าง — ',
    showcaseCreateOwn:'สร้างโหลของคุณเอง',
    showcaseCreateOwnSuffix:' เพื่อเพิ่มความทรงจำ',
    manageCategories:'หมวดหมู่', addCategory:'เพิ่ม',
    noCats:'ยังไม่มีหมวดหมู่', catMovedTo:'โหลจะถูกย้ายไปยัง "โหลของฉัน"',
    renameCategory:'เปลี่ยนชื่อหมวดหมู่:',
    noJars:'ยังไม่มีโหล — กด ＋ เพื่อสร้างโหลแรก!',
    noResults:'ไม่พบผลลัพธ์',
    emptyShelf:'ยังไม่มีโหลในหมวดหมู่นี้',
    searchPlaceholder:'ค้นหาโหลและความทรงจำ…', clearSearch:'ล้าง',
    searchLabel:'ค้นหา',
    sortAZ:'ก–ฮ', sortZA:'ฮ–ก', sortNewest:'ใหม่สุด', sortOldest:'เก่าสุด',
    sort:'เรียงลำดับ',
    statsTitle:'สถิติ', statsJars:'โหล', statsMems:'ความทรงจำ', statsPhotos:'รูปภาพ',
    categories:'หมวดหมู่', exportData:'ส่งออก', importData:'นำเข้า',
    confirmDeleteJar:'จะลบโหลและความทรงจำทั้งหมดอย่างถาวร',
    confirmDeleteMem:'ลบความทรงจำนี้อย่างถาวร?',
    confirmDeleteCat:'โหลจะถูกย้ายไปยัง "โหลของฉัน"',
    saved:'บันทึกแล้ว!', deleted:'ลบแล้ว', jarCreated:'สร้างโหลแล้ว!', duplicated:'ทำสำเนาแล้ว!',
    importOK:'นำเข้าสำเร็จ!', exportOK:'ส่งออกสำเร็จ!',
    loginSuccess:'ยินดีต้อนรับกลับ!', registerSuccess:'สร้างบัญชีแล้ว!', loggedOut:'ออกจากระบบแล้ว',
    writeFirst:'กรุณาเขียนบางอย่างก่อน!', choosePhoto:'กรุณาเลือกรูปภาพก่อน!',
    nameJar:'กรุณาตั้งชื่อโหลของคุณ!', importFail:'นำเข้าล้มเหลว — ไฟล์ไม่ถูกต้อง',
    privacyTitle:'ความเป็นส่วนตัว',
    privacyText:'ข้อมูลทั้งหมดถูกเก็บไว้ในเบราว์เซอร์ของคุณ ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ใด การล้างข้อมูลไซต์จะลบโหล ความทรงจำ และบัญชีทั้งหมด ส่งออกข้อมูลเป็นประจำเพื่อสำรองข้อมูล',
    dismiss:'ปิด', open:'เปิด',
  },

  zh: {
    appTitle:'记忆罐', appSubtitle:'将珍贵的时刻保存在罐子里',
    allJars:'全部罐子', myJars:'我的罐子', showcase:'展示', library:'库',
    organise:'整理', data:'数据',
    login:'登录', register:'创建账户', logout:'退出登录', signIn:'登录',
    username:'用户名', pin:'PIN（6位数字）', confirmPin:'确认PIN',
    noAccount:'没有账户？', hasAccount:'已有账户？',
    syncHint:'可选 — 登录以跨设备备份',
    backToJars:'← 返回罐子',
    newJar:'新建罐子', createJar:'创建新罐子', jarName:'罐子名称',
    colour:'颜色', category:'分类', jarDesc:'描述（可选）',
    icon:'图标', jarNote:'悬停提示', creatorTags:'创作者标签（逗号分隔）',
    createJarBtn:'创建', editJar:'编辑罐子',
    saveChanges:'保存更改', deleteJar:'删除罐子',
    duplicate:'复制', cancel:'取消',
    memCnt:(n)=>`${n}条记忆`,
    all:'全部', notes:'笔记', photos:'照片',
    addMemory:'添加记忆', note:'📝 笔记', photo:'📷 照片',
    yourNote:'你的笔记', mood:'心情', date:'日期', tags:'标签',
    saveNote:'保存笔记', caption:'说明（可选）', savePhoto:'保存照片',
    clickToChoose:'点击选择照片（可多选）',
    writeHere:'写下你的记忆…', typeTag:'输入后回车',
    noMemType:'没有此类型的记忆',
    emptyJar:'空罐子 — 在下方添加记忆 ✨',
    showcaseJarNote:'✨ 展示罐子 — ',
    showcaseCreateOwn:'创建自己的罐子',
    showcaseCreateOwnSuffix:'以添加记忆。',
    manageCategories:'分类', addCategory:'添加',
    noCats:'还没有分类', catMovedTo:'罐子将移至"我的罐子"。',
    renameCategory:'重命名分类：',
    noJars:'还没有罐子 — 点击 ＋ 创建！',
    noResults:'未找到结果',
    emptyShelf:'此分类暂无罐子',
    searchPlaceholder:'搜索罐子和记忆…', clearSearch:'清除',
    searchLabel:'搜索',
    sortAZ:'A–Z', sortZA:'Z–A', sortNewest:'最新', sortOldest:'最旧',
    sort:'排序',
    statsTitle:'统计', statsJars:'罐子', statsMems:'记忆', statsPhotos:'照片',
    categories:'分类', exportData:'导出', importData:'导入',
    confirmDeleteJar:'此操作将永久删除罐子及所有记忆。',
    confirmDeleteMem:'永久删除此记忆？',
    confirmDeleteCat:'罐子将移至"我的罐子"。',
    saved:'已保存！', deleted:'已删除', jarCreated:'已创建！', duplicated:'已复制！',
    importOK:'已导入！', exportOK:'已导出！',
    loginSuccess:'欢迎回来！', registerSuccess:'账户已创建！', loggedOut:'已退出',
    writeFirst:'请先写点什么！', choosePhoto:'请先选择照片！',
    nameJar:'请为罐子命名！', importFail:'导入失败 — 文件无效',
    privacyTitle:'隐私',
    privacyText:'所有数据存储在您的浏览器中。不向任何服务器发送数据。清除浏览器站点数据将删除所有罐子、记忆和账户。请定期导出数据进行备份。',
    dismiss:'关闭', open:'打开',
  },

  ja: {
    appTitle:'思い出の瓶', appSubtitle:'大切な瞬間を瓶に保存しましょう',
    allJars:'すべての瓶', myJars:'私の瓶', showcase:'ショーケース', library:'ライブラリ',
    organise:'整理', data:'データ',
    login:'ログイン', register:'アカウント作成', logout:'ログアウト', signIn:'ログイン',
    username:'ユーザー名', pin:'PIN（6桁）', confirmPin:'PINを確認',
    noAccount:'アカウントをお持ちでない方', hasAccount:'すでにアカウントをお持ちの方',
    syncHint:'任意 — デバイス間でバックアップするにはログイン',
    backToJars:'← 瓶に戻る',
    newJar:'新しい瓶', createJar:'新しい瓶を作成', jarName:'瓶の名前',
    colour:'色', category:'カテゴリ', jarDesc:'説明（任意）',
    icon:'アイコン', jarNote:'ホバーメモ', creatorTags:'クリエイタータグ（カンマ区切り）',
    createJarBtn:'作成', editJar:'瓶を編集',
    saveChanges:'変更を保存', deleteJar:'瓶を削除',
    duplicate:'複製', cancel:'キャンセル',
    memCnt:(n)=>`${n}件の思い出`,
    all:'すべて', notes:'メモ', photos:'写真',
    addMemory:'思い出を追加', note:'📝 メモ', photo:'📷 写真',
    yourNote:'あなたのメモ', mood:'気分', date:'日付', tags:'タグ',
    saveNote:'メモを保存', caption:'キャプション（任意）', savePhoto:'写真を保存',
    clickToChoose:'タップして写真を選択（複数可）',
    writeHere:'思い出を書いてください…', typeTag:'入力してEnter',
    noMemType:'このタイプの思い出はありません',
    emptyJar:'空の瓶 — 下に思い出を追加しましょう ✨',
    showcaseJarNote:'✨ ショーケースの瓶 — ',
    showcaseCreateOwn:'自分の瓶を作成する',
    showcaseCreateOwnSuffix:'と思い出を追加できます。',
    manageCategories:'カテゴリ', addCategory:'追加',
    noCats:'カテゴリがありません', catMovedTo:'瓶は「私の瓶」に移動されます。',
    renameCategory:'カテゴリを変更:',
    noJars:'まだ瓶がありません — ＋ をタップして作成！',
    noResults:'結果が見つかりません',
    emptyShelf:'このカテゴリに瓶はありません',
    searchPlaceholder:'瓶や思い出を検索…', clearSearch:'クリア',
    searchLabel:'検索',
    sortAZ:'A–Z', sortZA:'Z–A', sortNewest:'新しい順', sortOldest:'古い順',
    sort:'並び替え',
    statsTitle:'統計', statsJars:'瓶', statsMems:'思い出', statsPhotos:'写真',
    categories:'カテゴリ', exportData:'エクスポート', importData:'インポート',
    confirmDeleteJar:'この瓶とすべての思い出が完全に削除されます。',
    confirmDeleteMem:'この思い出を完全に削除しますか？',
    confirmDeleteCat:'瓶は「私の瓶」に移動されます。',
    saved:'保存しました！', deleted:'削除しました', jarCreated:'瓶を作成しました！', duplicated:'複製しました！',
    importOK:'インポートしました！', exportOK:'エクスポートしました！',
    loginSuccess:'おかえりなさい！', registerSuccess:'アカウントを作成しました！', loggedOut:'ログアウトしました',
    writeFirst:'何か書いてください！', choosePhoto:'写真を選んでください！',
    nameJar:'瓶に名前を付けてください！', importFail:'インポート失敗 — ファイルが無効です',
    privacyTitle:'プライバシー',
    privacyText:'すべてのデータはブラウザにローカルで保存されます。サーバーには何も送信されません。ブラウザのサイトデータを消去すると、すべての瓶・思い出・アカウントが削除されます。定期的にデータをエクスポートしてバックアップしてください。',
    dismiss:'閉じる', open:'開く',
  },

  ko: {
    appTitle:'추억 항아리', appSubtitle:'소중한 순간들을 항아리에 담아보세요',
    allJars:'전체 항아리', myJars:'나의 항아리', showcase:'쇼케이스', library:'라이브러리',
    organise:'정리', data:'데이터',
    login:'로그인', register:'계정 만들기', logout:'로그아웃', signIn:'로그인',
    username:'사용자 이름', pin:'PIN (6자리)', confirmPin:'PIN 확인',
    noAccount:'계정이 없으신가요?', hasAccount:'이미 계정이 있으신가요?',
    syncHint:'선택 사항 — 기기 간 백업을 위해 로그인',
    backToJars:'← 항아리로 돌아가기',
    newJar:'새 항아리', createJar:'새 항아리 만들기', jarName:'항아리 이름',
    colour:'색상', category:'카테고리', jarDesc:'설명 (선택사항)',
    icon:'아이콘', jarNote:'호버 메모', creatorTags:'크리에이터 태그 (쉼표 구분)',
    createJarBtn:'만들기', editJar:'항아리 편집',
    saveChanges:'변경 사항 저장', deleteJar:'항아리 삭제',
    duplicate:'복제', cancel:'취소',
    memCnt:(n)=>`추억 ${n}개`,
    all:'전체', notes:'메모', photos:'사진',
    addMemory:'추억 추가', note:'📝 메모', photo:'📷 사진',
    yourNote:'나의 메모', mood:'기분', date:'날짜', tags:'태그',
    saveNote:'메모 저장', caption:'캡션 (선택사항)', savePhoto:'사진 저장',
    clickToChoose:'탭하여 사진 선택 (여러 장 가능)',
    writeHere:'추억을 적어보세요…', typeTag:'입력 후 Enter',
    noMemType:'이 유형의 추억이 없습니다',
    emptyJar:'빈 항아리 — 아래에 추억을 추가하세요 ✨',
    showcaseJarNote:'✨ 쇼케이스 항아리 — ',
    showcaseCreateOwn:'나만의 항아리를 만들어',
    showcaseCreateOwnSuffix:'추억을 추가하세요.',
    manageCategories:'카테고리', addCategory:'추가',
    noCats:'카테고리가 없습니다', catMovedTo:'항아리는 "나의 항아리"로 이동됩니다.',
    renameCategory:'카테고리 이름 변경:',
    noJars:'항아리가 없습니다 — ＋ 을 탭하여 만들어보세요!',
    noResults:'결과를 찾을 수 없습니다',
    emptyShelf:'이 카테고리에 항아리가 없습니다',
    searchPlaceholder:'항아리와 추억 검색…', clearSearch:'지우기',
    searchLabel:'검색',
    sortAZ:'가–힣', sortZA:'힣–가', sortNewest:'최신순', sortOldest:'오래된 순',
    sort:'정렬',
    statsTitle:'통계', statsJars:'항아리', statsMems:'추억', statsPhotos:'사진',
    categories:'카테고리', exportData:'내보내기', importData:'가져오기',
    confirmDeleteJar:'항아리와 모든 추억이 영구적으로 삭제됩니다.',
    confirmDeleteMem:'이 추억을 영구적으로 삭제하시겠습니까?',
    confirmDeleteCat:'항아리는 "나의 항아리"로 이동됩니다.',
    saved:'저장됨!', deleted:'삭제됨', jarCreated:'항아리가 만들어졌습니다!', duplicated:'복제됨!',
    importOK:'가져왔습니다!', exportOK:'내보냈습니다!',
    loginSuccess:'다시 오셨군요!', registerSuccess:'계정이 만들어졌습니다!', loggedOut:'로그아웃됨',
    writeFirst:'먼저 무언가 작성해 주세요!', choosePhoto:'먼저 사진을 선택해 주세요!',
    nameJar:'항아리 이름을 입력해 주세요!', importFail:'가져오기 실패 — 잘못된 파일',
    privacyTitle:'개인정보',
    privacyText:'모든 데이터는 브라우저에 로컬로 저장됩니다. 어떤 서버에도 전송되지 않습니다. 브라우저 사이트 데이터를 지우면 모든 항아리, 추억, 계정이 삭제됩니다. 정기적으로 데이터를 내보내 백업하세요.',
    dismiss:'닫기', open:'열기',
  },
};

export const JAR_COLORS = [
  { id:'amber',  fill:'#E8A427', glass:'rgba(232,164,39,.18)',  stroke:'#C07B12' },
  { id:'rose',   fill:'#D4537E', glass:'rgba(212,83,126,.18)',  stroke:'#99355A' },
  { id:'teal',   fill:'#1D9E75', glass:'rgba(29,158,117,.18)',  stroke:'#0F6E56' },
  { id:'blue',   fill:'#378ADD', glass:'rgba(55,138,221,.18)',  stroke:'#185FA5' },
  { id:'purple', fill:'#7F77DD', glass:'rgba(127,119,221,.18)', stroke:'#534AB7' },
  { id:'coral',  fill:'#D85A30', glass:'rgba(216,90,48,.18)',   stroke:'#993C1D' },
  { id:'green',  fill:'#639922', glass:'rgba(99,153,34,.18)',   stroke:'#3B6D11' },
  { id:'pink',   fill:'#E91E8C', glass:'rgba(233,30,140,.15)', stroke:'#B01568' },
  { id:'navy',   fill:'#2C3E8C', glass:'rgba(44,62,140,.15)',  stroke:'#1A2560' },
  { id:'olive',  fill:'#7D8B2A', glass:'rgba(125,139,42,.15)', stroke:'#5A6418' },
];

export const JAR_ICONS = ['🌸','🌊','⭐','🌙','🔥','🍀','🎵','🌈','🦋','🌺','🏔','🎨','🍃','💫','🎪','🌻','🍁','🐾','🌍','🎭','☕','📖','🎋','🏮','🌷','🎀','🎁','🦊'];

export const SHOWCASE_DATA = [
  { id:'sc01', name:'Golden Summer', color:'amber', icon:'🌊', category:'Seasons', desc:'Sun-soaked afternoons', note:'Those long July evenings when the light turned everything gold — we never wanted it to end.', ctags:['Featured','@luminabom'], memories:[{id:'sm01',type:'note',text:'Lay in the grass until the stars came out. Counted seven shooting stars. Made seven wishes.',date:'2024-07-14',mood:'😊',tags:['summer','stars']},{id:'sm02',type:'note',text:'The smell of sunscreen and salt water. Cold watermelon at sunset. This is what happiness feels like.',date:'2024-07-22',mood:'😍',tags:['beach','happiness']}]},
  { id:'sc02', name:'ความสุข', color:'rose', icon:'🌸', category:'Thai Collection', desc:'ความสุขเล็กๆ น้อยๆ', note:'สิ่งเล็กๆ น้อยๆ ที่ทำให้รอยยิ้มปรากฏ', ctags:['Thai','@luminabom'], memories:[{id:'sm03',type:'note',text:'วันนี้ฝนตก นั่งดื่มชาอยู่ที่หน้าต่าง ฟังเสียงหยดน้ำ รู้สึกสงบมาก 🍵',date:'2024-08-03',mood:'😌',tags:['ฝน','สงบ']},{id:'sm04',type:'note',text:'เจอแมวส้มตัวอ้วนหน้าร้านข้าวแกง นั่งข้างๆ กันกินข้าว วันนี้ดีมาก',date:'2024-09-11',mood:'😊',tags:['แมว','ความสุข']}]},
  { id:'sc03', name:'Rainy Days', color:'blue', icon:'🌧', category:'Seasons', desc:'Cosy moments', note:'Rain on the window, a warm blanket, and nowhere to be.', ctags:['Featured','New'], memories:[{id:'sm05',type:'note',text:'Made mushroom soup from scratch. The kitchen smelled incredible. Ate it watching old films.',date:'2024-10-18',mood:'😌',tags:['cooking','cosy']},{id:'sm06',type:'note',text:'Power went out during the storm. Lit every candle. Played board games until midnight.',date:'2024-11-02',mood:'😂',tags:['storm','candles']}]},
  { id:'sc04', name:'Wanderlust', color:'teal', icon:'🏔', category:'Travel', desc:'Places that left marks', note:'Every ticket stub, every map crease, every wrong turn that led somewhere beautiful.', ctags:['Travel','Featured'], memories:[{id:'sm07',type:'note',text:'Lost in the medina for two hours. Found the blue door. Worth every wrong turn.',date:'2024-03-07',mood:'🤩',tags:['Morocco','adventure']},{id:'sm08',type:'note',text:'Hiked to a viewpoint with no name. Found it following a shepherd. Best view of my life.',date:'2024-05-19',mood:'😍',tags:['hiking','viewpoint']}]},
  { id:'sc05', name:'Night Thoughts', color:'navy', icon:'🌙', category:'Reflections', desc:'Ideas after midnight', note:'The quiet hours when honest thoughts surface.', ctags:['New','@luminabom'], memories:[{id:'sm09',type:'note',text:"2:14am. Realized I've been afraid of the wrong things. Made a list of what actually matters.",date:'2024-06-28',mood:'😔',tags:['midnight','clarity']},{id:'sm10',type:'note',text:"Every lit window is someone's whole world. The thought made me feel connected to strangers.",date:'2024-12-01',mood:'😌',tags:['city','wonder']}]},
  { id:'sc06', name:'Garden Hours', color:'green', icon:'🌻', category:'Nature', desc:'Soil, seeds, slow growth', note:'Patience is a plant. You water it, wait, and one morning everything is blooming.', ctags:['Nature','@luminabom'], memories:[{id:'sm11',type:'note',text:'First tomato of the season. Ate it warm from the vine with a pinch of salt. Extraordinary.',date:'2024-08-12',mood:'😊',tags:['garden','harvest']},{id:'sm12',type:'note',text:'Planted lavender seeds. In my mind I can already smell them. Optimism feels like this.',date:'2024-04-02',mood:'🤩',tags:['lavender','hope']}]},
  { id:'sc07', name:'ความฝัน', color:'purple', icon:'💫', category:'Thai Collection', desc:'ความฝันที่อยากให้เป็นจริง', note:'ความฝันไม่มีวันหมดอายุ เก็บไว้ในโหลนี้', ctags:['Thai','Featured'], memories:[{id:'sm13',type:'note',text:'ฝันว่าได้เดินทางไปทะเลทราย ทรายสีส้มอมทอง ฟ้าสีครามเข้ม — อยากไปให้ได้สักครั้ง',date:'2024-07-30',mood:'🤩',tags:['ความฝัน','ทะเลทราย']},{id:'sm14',type:'note',text:'เขียนแผนชีวิต 5 ปีในสมุดโน้ตเก่า ไม่รู้จะเป็นจริงไหม แต่รู้สึกดีที่ได้เขียน',date:'2024-09-20',mood:'😊',tags:['แผน','ความหวัง']}]},
  { id:'sc08', name:'Friendship Jar', color:'coral', icon:'🎭', category:'People', desc:'Shared moments', note:'You cannot keep time, but you can keep the feeling.', ctags:['Featured','People'], memories:[{id:'sm15',type:'note',text:"Road trip with no destination. Six hours, three playlists, one flat tyre, and the best conversation of the year.",date:'2024-06-14',mood:'😂',tags:['roadtrip','friends']},{id:'sm16',type:'note',text:"Surprise birthday dinner that wasn't a surprise — pretending was its own kind of gift.",date:'2024-11-18',mood:'😍',tags:['birthday','friendship']}]},
  { id:'sc09', name:'Morning Rituals', color:'olive', icon:'☕', category:'Daily Life', desc:'Quiet ceremonies', note:'Before the world asks anything of me — the kettle, the window light, fifteen minutes only mine.', ctags:['Daily','@luminabom'], memories:[{id:'sm17',type:'note',text:"Woke before dawn. Made pour-over coffee. Watched the sky change. Didn't check my phone for an hour.",date:'2024-09-05',mood:'😌',tags:['morning','coffee']},{id:'sm18',type:'note',text:"Started a new notebook. That first blank page feeling — terrifying and hopeful at once.",date:'2024-01-01',mood:'🤩',tags:['notebook','beginnings']}]},
  { id:'sc10', name:'Little Wonders', color:'pink', icon:'🦋', category:'Nature', desc:'Tiny beautiful things', note:'The universe hides its best work in small things.', ctags:['Nature','New'], memories:[{id:'sm19',type:'note',text:'A cello player at 7am in an empty square. Listened 20 minutes. We both cried a little.',date:'2024-04-28',mood:'😢',tags:['music','unexpected']},{id:'sm20',type:'note',text:"Found a library book with a note from 1987: \"I hope you're happy.\" I am.",date:'2024-07-09',mood:'😍',tags:['library','connection']}]},
  { id:'sc11', name:'ธรรมชาติ', color:'green', icon:'🍃', category:'Thai Collection', desc:'ธรรมชาติรอบตัวเรา', note:'ธรรมชาติสอนโดยไม่ต้องพูดสักคำ', ctags:['Thai','Nature'], memories:[{id:'sm21',type:'note',text:'ไปนั่งริมน้ำยามเย็น เห็นปลากระโดด แดดสาดแสงเป็นสีทอง สวยจนลืมหายใจ',date:'2024-10-05',mood:'😍',tags:['ริมน้ำ','ธรรมชาติ']},{id:'sm22',type:'note',text:'เดินในป่า ได้ยินเสียงนกร้อง ลมพัดผ่านใบไม้ ใจสงบขึ้นทันที',date:'2024-11-14',mood:'😌',tags:['ป่า','สงบ']}]},
  { id:'sc12', name:"Year's End", color:'rose', icon:'⭐', category:'Reflections', desc:'Gratitude in a jar', note:"Every December I fill this jar. It's always heavier than I expect — in a good way.", ctags:['Featured','@luminabom'], memories:[{id:'sm23',type:'note',text:"Seven people I'm grateful for. Nine moments I'd live again. The math of a good year.",date:'2024-12-28',mood:'😊',tags:['gratitude','year']},{id:'sm24',type:'note',text:"Read my journal from January. The person who wrote those pages seems like a stranger. Growth is quiet then obvious.",date:'2024-12-30',mood:'😔',tags:['growth','reflection']}]},
];

export const appState = {
  lang: 'en', sortMode: 'az',
  activeJarId: null, memFilter: 'all',
  searchQuery: '', editingJarId: null,
  pendingPhotos: [], noteTags: [], photoTags: [],
  newColor: 'amber', newIcon: '',
  editColor: 'amber', editIcon: '',
};

export function t(key) {
  const l = LANGS[appState.lang] || LANGS.en;
  const v = l[key]; if (v !== undefined) return v;
  return LANGS.en[key] || key;
}
export function uid() { return crypto.randomUUID(); }
export function today() { return new Date().toISOString().slice(0,10); }
export function fdate(d) { if (!d) return ''; try { return new Date(d).toLocaleDateString(); } catch { return d; } }
export function escH(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
export function trunc(s, n) { return s.length > n ? s.slice(0,n)+'…' : s; }
export function sortJars(jars, mode) {
  return [...jars].sort((a,b) => {
    if (mode==='az') return a.name.localeCompare(b.name);
    if (mode==='za') return b.name.localeCompare(a.name);
    if (mode==='newest') return (b.updated_at||'') > (a.updated_at||'') ? 1 : -1;
    return (a.created_at||'') < (b.created_at||'') ? -1 : 1;
  });
}
export function jarMatchesSearch(jar, memories, q) {
  if (!q) return true;
  const hay = [jar.name, jar.category||'', jar.desc||'', jar.note||'', ...(jar.ctags||[]),
    ...(memories||[]).map(m=>(m.text||'')+(m.caption||'')+' '+(m.tags||[]).join(' '))
  ].join(' ').toLowerCase();
  return hay.includes(q);
}
