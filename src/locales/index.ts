export interface Translations {
  // Common
  back: string;
  select: string;
  change: string;
  ok: string;
  cancel: string;
  exit: string;
  confirm: string;
  new: string;
  conversations: string;
  deleteKeyToDelete: string;
  name: string;
  phone: string;
  add: string;
  now: string;
  hoursAgo: string;
  calling: string;
  
  // Home Screen
  nokia: string;
  welcomeToNokia: string;
  connectingPeople: string;
  chinaMobile: string;
  networkAvailable: string;
  pressMenuForOptions: string;
  pressMenuToAccess: string;
  
  // Main Menu
  menu: string;
  contacts: string;
  messages: string;
  games: string;
  settings: string;
  
  // Settings
  settingsTitle: string;
  configureDevice: string;
  ringtone: string;
  vibration: string;
  backlightTime: string;
  displayContrast: string;
  language: string;
  touchBlocking: string;
  touchBlocked: string;
  about: string;
  deviceInfo: string;
  softwareVersion: string;
  memory: string;
  available: string;
  useArrowKeys: string;
  pressEnterToChange: string;
  on: string;
  off: string;
  
  // Ringtone options
  nokiaTune: string;
  beep: string;
  silent: string;
  
  // Backlight options
  seconds5: string;
  seconds15: string;
  seconds30: string;
  alwaysOn: string;
  
  // Contrast options
  low: string;
  normal: string;
  high: string;
  medium: string;
  
  // Contacts
  contactsTitle: string;
  noContacts: string;
  
  // Messages
  messagesTitle: string;
  noMessages: string;
  send: string;
  compose: string;
  composeMessage: string;
  typeToInput: string;
  enterToSend: string;
  enterToCompose: string;
  newConversation: string;
  selectContact: string;
  deleteConversation: string;
  confirmDelete: string;
  addContact: string;
  contactName: string;
  contactPhone: string;
  save: string;
  deleteContact: string;
  
  // Games
  gamesTitle: string;
  snakeGame: string;
  tetris: string;
  classicSnakeGame: string;
  classicTetrisGame: string;
  comingSoon: string;
  selectGameToPlay: string;
  highScores: string;
  notAvailable: string;
  play: string;
  score: string;
  highScore: string;
  pressEnterToStart: string;
  gameOver: string;
  pressEnterToRestart: string;
  useArrowKeysToControl: string;
  playing: string;
  start: string;
  finalScore: string;
  useArrowKeysToMove: string;
  eatFoodToGrow: string;
  pause: string;
  paused: string;
  arrowKeys: string;
  moveSnake: string;
  backToGamesMenu: string;
  
  // Tetris specific
  next: string;
  lines: string;
  level: string;
  restart: string;
  resume: string;
  upToRotate: string;
  enterToPause: string;
  spaceToHardDrop: string;
  downToFastDrop: string;
  gameStartHint: string;
  gamePausedHint: string;
  gameOverHint: string;
  gamePlayingHint: string;
  startGame: string;
  continueGame: string;
  restartGame: string;
  pauseGame: string;
  exitGame: string;
  moveBlock: string;
  rotateBlock: string;
  fastDrop: string;
  hardDrop: string;
  backToMenu: string;
  
  // Contacts
  contactNotFound: string;
  pressEscToGoBack: string;
  contactDetails: string;
  phoneNumber: string;
  type: string;
  mobile: string;
  status: string;
  online: string;
  call: string;
  view: string;
  
  // Messages
  conversationNotFound: string;
  you: string;
  typeMessage: string;
  reply: string;
  open: string;
  
  // Common
  empty: string;
  
  // Navigation
  useArrowKeysToNavigate: string;
  pressEnterToSelect: string;
  escToBack: string;
}

export const translations: Record<string, Translations> = {
  'zh-CN': {
    // Common
    back: '返回',
    select: '选择',
    change: '更改',
    ok: '确定',
    cancel: '取消',
    exit: '退出',
    confirm: '确定',
    new: '新建',
    conversations: '对话',
    deleteKeyToDelete: 'Delete键删除',
    name: '姓名',
    phone: '电话',
    add: '添加',
    now: '刚刚',
    hoursAgo: '小时前',
    calling: '正在拨打',
    
    // Home Screen
    nokia: '诺基亚',
    welcomeToNokia: '欢迎使用诺基亚',
    connectingPeople: '科技以人为本',
    chinaMobile: '中国移动',
    networkAvailable: '网络可用',
    pressMenuForOptions: '按菜单键查看选项',
    pressMenuToAccess: '按菜单键或M键进入菜单',
    
    // Main Menu
    menu: '菜单',
    contacts: '通讯录',
    messages: '短信',
    games: '游戏',
    settings: '设置',
    
    // Settings
    settingsTitle: '设置',
    configureDevice: '配置您的设备',
    ringtone: '铃声',
    vibration: '振动',
    backlightTime: '背光时间',
    displayContrast: '显示对比度',
    language: '语言',
    touchBlocking: '屏蔽触摸',
    touchBlocked: '触摸屏蔽',
    about: '关于',
    deviceInfo: '设备信息',
    softwareVersion: '软件版本',
    memory: '内存',
    available: '可用',
    useArrowKeys: '使用 ↑↓ 导航',
    pressEnterToChange: '按 ENTER 更改设置',
    on: '开',
    off: '关',
    
    // Ringtone options
    nokiaTune: '诺基亚铃声',
    beep: '蜂鸣',
    silent: '静音',
    
    // Backlight options
    seconds5: '5秒',
    seconds15: '15秒',
    seconds30: '30秒',
    alwaysOn: '常亮',
    
    // Contrast options
    low: '低',
    normal: '正常',
    high: '高',
    medium: '中',
    
    // Contacts
    contactsTitle: '通讯录',
    noContacts: '无联系人',
    
    // Messages
    messagesTitle: '短信',
    noMessages: '无消息',
    send: '发送',
    compose: '编写',
    composeMessage: '编写消息',
    typeToInput: '直接输入文字，Delete删除',
    enterToSend: 'Enter发送，ESC取消',
    enterToCompose: 'Enter编写消息，ESC返回',
    newConversation: '新建对话',
    selectContact: '选择联系人',
    deleteConversation: '删除对话',
    confirmDelete: '确认删除？',
    addContact: '添加联系人',
    contactName: '姓名',
    contactPhone: '电话',
    save: '保存',
    deleteContact: '删除联系人',
    
    // Games
    gamesTitle: '游戏',
    snakeGame: '贪吃蛇',
    tetris: '俄罗斯方块',
    classicSnakeGame: '经典贪吃蛇游戏',
    classicTetrisGame: '经典俄罗斯方块游戏',
    comingSoon: '即将推出...',
    selectGameToPlay: '选择一个游戏来玩',
    highScores: '最高分',
    notAvailable: '不可用',
    play: '玩',
    score: '得分',
    highScore: '最高分',
    pressEnterToStart: '按 ENTER 开始',
    gameOver: '游戏结束！按 ENTER 重新开始',
    pressEnterToRestart: '按 ENTER 重新开始',
    useArrowKeysToControl: '使用方向键控制蛇',
    playing: '游戏中',
    start: '开始',
    finalScore: '最终得分',
    useArrowKeysToMove: '使用方向键移动',
    eatFoodToGrow: '吃食物来成长',
    pause: '暂停',
    paused: '已暂停',
    arrowKeys: '方向键',
    moveSnake: '移动蛇',
    backToGamesMenu: '返回游戏菜单',
    
    // Tetris specific
    next: '下一个',
    lines: '行数',
    level: '等级',
    restart: '重新开始',
    resume: '继续',
    upToRotate: '上键旋转',
    enterToPause: 'Enter暂停',
    spaceToHardDrop: '空格硬降',
    downToFastDrop: '下箭头: 快速下降',
    gameStartHint: '按确认键开始游戏',
    gamePausedHint: '游戏已暂停 - 按确认键继续',
    gameOverHint: '游戏结束! 按确认键重新开始',
    gamePlayingHint: '游戏进行中',
    startGame: '开始',
    continueGame: '继续',
    restartGame: '再来一局',
    pauseGame: '暂停',
    exitGame: '退出',
    moveBlock: '方向键: 移动方块',
    rotateBlock: '上箭头: 旋转方块',
    fastDrop: '下箭头: 快速下降',
    hardDrop: '空格键: 硬降落',
    backToMenu: 'ESC: 返回菜单',
    
    // Contacts
    contactNotFound: '未找到联系人',
    pressEscToGoBack: '按 ESC 返回',
    contactDetails: '联系人详情',
    phoneNumber: '电话号码',
    type: '类型',
    mobile: '手机',
    status: '状态',
    online: '在线',
    call: '呼叫',
    view: '查看',
    
    // Messages
    conversationNotFound: '未找到对话',
    you: '您',
    typeMessage: '输入消息：',
    reply: '回复',
    open: '打开',
    
    // Common
    empty: '空',
    
    // Navigation
    useArrowKeysToNavigate: '使用方向键导航',
    pressEnterToSelect: '按 ENTER 选择',
    escToBack: 'ESC 返回'
  },
  
  'zh-TW': {
    // Common
    back: '返回',
    select: '選擇',
    change: '更改',
    ok: '確定',
    cancel: '取消',
    exit: '退出',
    confirm: '確定',
    new: '新建',
    conversations: '對話',
    deleteKeyToDelete: 'Delete鍵刪除',
    name: '姓名',
    phone: '電話',
    add: '添加',
    now: '剛剛',
    hoursAgo: '小時前',
    calling: '正在撥打',
    
    // Home Screen
    nokia: '諾基亞',
    welcomeToNokia: '歡迎使用諾基亞',
    connectingPeople: '科技以人為本',
    chinaMobile: '中國移動',
    networkAvailable: '網路可用',
    pressMenuForOptions: '按選單鍵查看選項',
    pressMenuToAccess: '按選單鍵或M鍵進入選單',
    
    // Main Menu
    menu: '選單',
    contacts: '通訊錄',
    messages: '簡訊',
    games: '遊戲',
    settings: '設定',
    
    // Settings
    settingsTitle: '設定',
    configureDevice: '配置您的裝置',
    ringtone: '鈴聲',
    vibration: '震動',
    backlightTime: '背光時間',
    displayContrast: '顯示對比度',
    language: '語言',
    touchBlocking: '屏蔽觸摸',
    touchBlocked: '觸摸屏蔽',
    about: '關於',
    deviceInfo: '裝置資訊',
    softwareVersion: '軟體版本',
    memory: '記憶體',
    available: '可用',
    useArrowKeys: '使用 ↑↓ 導航',
    pressEnterToChange: '按 ENTER 更改設定',
    on: '開',
    off: '關',
    
    // Ringtone options
    nokiaTune: '諾基亞鈴聲',
    beep: '蜂鳴',
    silent: '靜音',
    
    // Backlight options
    seconds5: '5秒',
    seconds15: '15秒',
    seconds30: '30秒',
    alwaysOn: '常亮',
    
    // Contrast options
    low: '低',
    normal: '正常',
    high: '高',
    medium: '中',
    
    // Contacts
    contactsTitle: '通訊錄',
    noContacts: '無聯絡人',
    
    // Messages
    messagesTitle: '簡訊',
    noMessages: '無訊息',
    send: '發送',
    compose: '編寫',
    composeMessage: '編寫訊息',
    typeToInput: '直接輸入文字，Delete刪除',
    enterToSend: 'Enter發送，ESC取消',
    enterToCompose: 'Enter編寫訊息，ESC返回',
    newConversation: '新建對話',
    selectContact: '選擇聯絡人',
    deleteConversation: '刪除對話',
    confirmDelete: '確認刪除？',
    addContact: '添加聯絡人',
    contactName: '姓名',
    contactPhone: '電話',
    save: '保存',
    deleteContact: '刪除聯絡人',
    
    // Games
    gamesTitle: '遊戲',
    snakeGame: '貪食蛇',
    tetris: '俄羅斯方塊',
    classicSnakeGame: '經典貪食蛇遊戲',
    classicTetrisGame: '經典俄羅斯方塊遊戲',
    comingSoon: '即將推出...',
    selectGameToPlay: '選擇一個遊戲來玩',
    highScores: '最高分',
    notAvailable: '不可用',
    play: '玩',
    score: '得分',
    highScore: '最高分',
    pressEnterToStart: '按 ENTER 開始',
    gameOver: '遊戲結束！按 ENTER 重新開始',
    pressEnterToRestart: '按 ENTER 重新開始',
    useArrowKeysToControl: '使用方向鍵控制蛇',
    playing: '遊戲中',
    start: '開始',
    finalScore: '最終得分',
    useArrowKeysToMove: '使用方向鍵移動',
    eatFoodToGrow: '吃食物來成長',
    pause: '暫停',
    paused: '已暫停',
    arrowKeys: '方向鍵',
    moveSnake: '移動蛇',
    backToGamesMenu: '返回遊戲選單',
    
    // Tetris specific
    next: '下一個',
    lines: '行數',
    level: '等級',
    restart: '重新開始',
    resume: '繼續',
    upToRotate: '上鍵旋轉',
    enterToPause: 'Enter暫停',
    spaceToHardDrop: '空格硬降',
    downToFastDrop: '下箭頭: 快速下降',
    gameStartHint: '按確認鍵開始遊戲',
    gamePausedHint: '遊戲已暫停 - 按確認鍵繼續',
    gameOverHint: '遊戲結束! 按確認鍵重新開始',
    gamePlayingHint: '遊戲進行中',
    startGame: '開始',
    continueGame: '繼續',
    restartGame: '再來一局',
    pauseGame: '暫停',
    exitGame: '退出',
    moveBlock: '方向鍵: 移動方塊',
    rotateBlock: '上箭頭: 旋轉方塊',
    fastDrop: '下箭頭: 快速下降',
    hardDrop: '空格鍵: 硬降落',
    backToMenu: 'ESC: 返回選單',
    
    // Contacts
    contactNotFound: '未找到聯絡人',
    pressEscToGoBack: '按 ESC 返回',
    contactDetails: '聯絡人詳情',
    phoneNumber: '電話號碼',
    type: '類型',
    mobile: '手機',
    status: '狀態',
    online: '線上',
    call: '呼叫',
    view: '查看',
    
    // Messages
    conversationNotFound: '未找到對話',
    you: '您',
    typeMessage: '輸入訊息：',
    reply: '回覆',
    open: '打開',
    
    // Common
    empty: '空',
    
    // Navigation
    useArrowKeysToNavigate: '使用方向鍵導航',
    pressEnterToSelect: '按 ENTER 選擇',
    escToBack: 'ESC 返回'
  },
  
  'en': {
    // Common
    back: 'Back',
    select: 'Select',
    change: 'Change',
    ok: 'OK',
    cancel: 'Cancel',
    exit: 'Exit',
    confirm: 'Confirm',
    new: 'New',
    conversations: 'conversations',
    deleteKeyToDelete: 'Delete key to delete',
    name: 'Name',
    phone: 'Phone',
    add: 'Add',
    now: 'now',
    hoursAgo: ' hours ago',
    calling: 'Calling',
    
    // Home Screen
    nokia: 'NOKIA',
    welcomeToNokia: 'Welcome to Nokia',
    connectingPeople: 'Connecting People',
    chinaMobile: 'China Mobile',
    networkAvailable: 'Network Available',
    pressMenuForOptions: 'Press MENU for options',
    pressMenuToAccess: 'Press MENU or M to access menu',
    
    // Main Menu
    menu: 'Menu',
    contacts: 'Contacts',
    messages: 'Messages',
    games: 'Games',
    settings: 'Settings',
    
    // Settings
    settingsTitle: 'Settings',
    configureDevice: 'Configure your device',
    ringtone: 'Ringtone',
    vibration: 'Vibration',
    backlightTime: 'Backlight Time',
    displayContrast: 'Display Contrast',
    language: 'Language',
    touchBlocking: 'Touch Blocking',
    touchBlocked: 'Touch Blocked',
    about: 'About',
    deviceInfo: 'Device information',
    softwareVersion: 'Software Version',
    memory: 'Memory',
    available: 'Available',
    useArrowKeys: 'Use ↑↓ to navigate',
    pressEnterToChange: 'Press ENTER to change setting',
    on: 'ON',
    off: 'OFF',
    
    // Ringtone options
    nokiaTune: 'Nokia Tune',
    beep: 'Beep',
    silent: 'Silent',
    
    // Backlight options
    seconds5: '5 seconds',
    seconds15: '15 seconds',
    seconds30: '30 seconds',
    alwaysOn: 'Always on',
    
    // Contrast options
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    medium: 'Medium',
    
    // Contacts
    contactsTitle: 'Contacts',
    noContacts: 'No contacts',
    
    // Messages
    messagesTitle: 'Messages',
    noMessages: 'No messages',
    send: 'Send',
    compose: 'Compose',
    composeMessage: 'Compose Message',
    typeToInput: 'Type directly, Delete to remove',
    enterToSend: 'Enter to send, ESC to cancel',
    enterToCompose: 'Enter to compose, ESC to back',
    newConversation: 'New Conversation',
    selectContact: 'Select Contact',
    deleteConversation: 'Delete Conversation',
    confirmDelete: 'Confirm delete?',
    addContact: 'Add Contact',
    contactName: 'Name',
    contactPhone: 'Phone',
    save: 'Save',
    deleteContact: 'Delete Contact',
    
    // Games
    gamesTitle: 'Games',
    snakeGame: 'Snake Game',
    tetris: 'Tetris',
    classicSnakeGame: 'Classic snake game',
    classicTetrisGame: 'Classic Tetris game',
    comingSoon: 'Coming soon...',
    selectGameToPlay: 'Select a game to play',
    highScores: 'High Scores',
    notAvailable: 'Not available',
    play: 'Play',
    score: 'Score',
    highScore: 'High',
    pressEnterToStart: 'Press ENTER to start',
    gameOver: 'Game Over! Press ENTER to restart',
    pressEnterToRestart: 'Press ENTER to restart',
    useArrowKeysToControl: 'Use arrow keys to control snake',
    playing: 'Playing',
    start: 'Start',
    finalScore: 'Final Score',
    useArrowKeysToMove: 'Use arrow keys to move',
    eatFoodToGrow: 'Eat food to grow',
    pause: 'Pause',
    paused: 'Paused',
    arrowKeys: 'Arrow Keys',
    moveSnake: 'Move Snake',
    backToGamesMenu: 'Back to Games Menu',
    
    // Tetris specific
    next: 'Next',
    lines: 'Lines',
    level: 'Level',
    restart: 'Restart',
    resume: 'Resume',
    upToRotate: 'Up to rotate',
    enterToPause: 'Enter to pause',
    spaceToHardDrop: 'Space to hard drop',
    downToFastDrop: 'Down arrow: Fast drop',
    gameStartHint: 'Press Enter to start game',
    gamePausedHint: 'Game paused - Press Enter to continue',
    gameOverHint: 'Game over! Press Enter to restart',
    gamePlayingHint: 'Game in progress',
    startGame: 'Start',
    continueGame: 'Continue',
    restartGame: 'Play Again',
    pauseGame: 'Pause',
    exitGame: 'Exit',
    moveBlock: 'Arrow keys: Move block',
    rotateBlock: 'Up arrow: Rotate block',
    fastDrop: 'Down arrow: Fast drop',
    hardDrop: 'Space: Hard drop',
    backToMenu: 'ESC: Back to menu',
      
      // Contacts
    contactNotFound: 'Contact Not Found',
    pressEscToGoBack: 'Press ESC to go back',
    contactDetails: 'Contact Details',
    phoneNumber: 'PHONE NUMBER',
    type: 'TYPE',
    mobile: 'Mobile',
    status: 'STATUS',
    online: 'Online',
    call: 'Call',
    view: 'View',
    
    // Messages
    conversationNotFound: 'Conversation Not Found',
    you: 'You',
    typeMessage: 'Type message:',
    reply: 'Reply',
    open: 'Open',
    
    // Common
    empty: 'Empty',
    
    // Navigation
    useArrowKeysToNavigate: 'Use arrow keys to navigate',
    pressEnterToSelect: 'Press ENTER to select',
    escToBack: 'ESC: Back to games menu'
  },
  
  'ru': {
    // Common
    back: 'Назад',
    select: 'Выбрать',
    change: 'Изменить',
    ok: 'ОК',
    cancel: 'Отмена',
    exit: 'Выход',
    confirm: 'Подтвердить',
    new: 'Новый',
    conversations: 'разговоры',
    deleteKeyToDelete: 'Клавиша Delete для удаления',
    name: 'Имя',
    phone: 'Телефон',
    add: 'Добавить',
    now: 'сейчас',
    hoursAgo: ' часов назад',
    calling: 'Звоню',
    
    // Home Screen
    nokia: 'NOKIA',
    welcomeToNokia: 'Добро пожаловать в Nokia',
    connectingPeople: 'Соединяя людей',
    chinaMobile: 'China Mobile',
    networkAvailable: 'Сеть доступна',
    pressMenuForOptions: 'Нажмите МЕНЮ для опций',
    pressMenuToAccess: 'Нажмите МЕНЮ или M для входа в меню',
    
    // Main Menu
    menu: 'Меню',
    contacts: 'Контакты',
    messages: 'Сообщения',
    games: 'Игры',
    settings: 'Настройки',
    
    // Settings
    settingsTitle: 'Настройки',
    configureDevice: 'Настройте ваше устройство',
    ringtone: 'Мелодия звонка',
    vibration: 'Вибрация',
    backlightTime: 'Время подсветки',
    displayContrast: 'Контрастность дисплея',
    language: 'Язык',
    touchBlocking: 'Блокировка касаний',
    touchBlocked: 'Блокировка касаний',
    about: 'О программе',
    deviceInfo: 'Информация об устройстве',
    softwareVersion: 'Версия ПО',
    memory: 'Память',
    available: 'Доступно',
    useArrowKeys: 'Используйте ↑↓ для навигации',
    pressEnterToChange: 'Нажмите ENTER для изменения',
    on: 'ВКЛ',
    off: 'ВЫКЛ',
    
    // Ringtone options
    nokiaTune: 'Мелодия Nokia',
    beep: 'Сигнал',
    silent: 'Без звука',
    
    // Backlight options
    seconds5: '5 секунд',
    seconds15: '15 секунд',
    seconds30: '30 секунд',
    alwaysOn: 'Всегда включена',
    
    // Contrast options
    low: 'Низкая',
    normal: 'Обычная',
    high: 'Высокая',
    medium: 'Средняя',
    
    // Contacts
    contactsTitle: 'Контакты',
    noContacts: 'Нет контактов',
    
    // Messages
    messagesTitle: 'Сообщения',
    noMessages: 'Нет сообщений',
    send: 'Отправить',
    compose: 'Написать',
    composeMessage: 'Написать сообщение',
    typeToInput: 'Введите текст, Delete для удаления',
    enterToSend: 'Enter отправить, ESC отмена',
    enterToCompose: 'Enter написать, ESC назад',
    newConversation: 'Новый разговор',
    selectContact: 'Выбрать контакт',
    deleteConversation: 'Удалить разговор',
    confirmDelete: 'Подтвердить удаление?',
    addContact: 'Добавить контакт',
    contactName: 'Имя',
    contactPhone: 'Телефон',
    save: 'Сохранить',
    deleteContact: 'Удалить контакт',
    
    // Games
    gamesTitle: 'Игры',
    snakeGame: 'Змейка',
    tetris: 'Тетрис',
    classicSnakeGame: 'Классическая игра змейка',
    classicTetrisGame: 'Классическая игра Тетрис',
    comingSoon: 'Скоро...',
    selectGameToPlay: 'Выберите игру для игры',
    highScores: 'Рекорды',
    notAvailable: 'Недоступно',
    play: 'Играть',
    score: 'Счёт',
    highScore: 'Рекорд',
    pressEnterToStart: 'Нажмите ENTER для начала',
    gameOver: 'Игра окончена! Нажмите ENTER для перезапуска',
    pressEnterToRestart: 'Нажмите ENTER для перезапуска',
    useArrowKeysToControl: 'Используйте стрелки для управления змейкой',
    playing: 'Игра',
    start: 'Старт',
    finalScore: 'Финальный счёт',
    useArrowKeysToMove: 'Используйте стрелки для движения',
    eatFoodToGrow: 'Ешьте еду чтобы расти',
    pause: 'Пауза',
    paused: 'Пауза',
    arrowKeys: 'Стрелки',
    moveSnake: 'Двигать змейку',
    backToGamesMenu: 'Назад в меню игр',
    
    // Tetris specific
    next: 'Следующий',
    lines: 'Линии',
    level: 'Уровень',
    restart: 'Перезапуск',
    resume: 'Продолжить',
    upToRotate: 'Вверх для поворота',
    enterToPause: 'Enter для паузы',
    spaceToHardDrop: 'Пробел для быстрого падения',
    downToFastDrop: 'Стрелка вниз: Быстрое падение',
    gameStartHint: 'Нажмите Enter для начала игры',
    gamePausedHint: 'Игра приостановлена - Нажмите Enter для продолжения',
    gameOverHint: 'Игра окончена! Нажмите Enter для перезапуска',
    gamePlayingHint: 'Игра в процессе',
    startGame: 'Начать',
    continueGame: 'Продолжить',
    restartGame: 'Играть снова',
    pauseGame: 'Пауза',
    exitGame: 'Выход',
    moveBlock: 'Стрелки: Движение блока',
    rotateBlock: 'Стрелка вверх: Поворот блока',
    fastDrop: 'Стрелка вниз: Быстрое падение',
    hardDrop: 'Пробел: Мгновенное падение',
    backToMenu: 'ESC: Назад в меню',
      
      // Contacts
    contactNotFound: 'Контакт не найден',
    pressEscToGoBack: 'Нажмите ESC для возврата',
    contactDetails: 'Детали контакта',
    phoneNumber: 'НОМЕР ТЕЛЕФОНА',
    type: 'ТИП',
    mobile: 'Мобильный',
    status: 'СТАТУС',
    online: 'В сети',
    call: 'Звонок',
    view: 'Просмотр',
    
    // Messages
    conversationNotFound: 'Разговор не найден',
    you: 'Вы',
    typeMessage: 'Введите сообщение:',
    reply: 'Ответить',
    open: 'Открыть',
    
    // Common
    empty: 'Пусто',
    
    // Navigation
    useArrowKeysToNavigate: 'Используйте стрелки для навигации',
    pressEnterToSelect: 'Нажмите ENTER для выбора',
    escToBack: 'ESC: Назад в меню игр'
  },
  
  'ja': {
    // Common
    back: '戻る',
    select: '選択',
    change: '変更',
    ok: 'OK',
    cancel: 'キャンセル',
    exit: '終了',
    confirm: '確認',
    new: '新規',
    conversations: '会話',
    deleteKeyToDelete: 'Deleteキーで削除',
    name: '名前',
    phone: '電話',
    add: '追加',
    now: '今',
    hoursAgo: '時間前',
    calling: '発信中',
    
    // Home Screen
    nokia: 'NOKIA',
    welcomeToNokia: 'Nokiaへようこそ',
    connectingPeople: '人と人をつなぐ',
    chinaMobile: 'China Mobile',
    networkAvailable: 'ネットワーク利用可能',
    pressMenuForOptions: 'オプションはMENUキーを押してください',
    pressMenuToAccess: 'MENUキーまたはMキーでメニューにアクセス',
    
    // Main Menu
    menu: 'メニュー',
    contacts: '連絡先',
    messages: 'メッセージ',
    games: 'ゲーム',
    settings: '設定',
    
    // Settings
    settingsTitle: '設定',
    configureDevice: 'デバイスを設定',
    ringtone: '着信音',
    vibration: 'バイブレーション',
    backlightTime: 'バックライト時間',
    displayContrast: 'ディスプレイコントラスト',
    language: '言語',
    touchBlocking: 'タッチブロック',
    touchBlocked: 'タッチブロック',
    about: 'バージョン情報',
    deviceInfo: 'デバイス情報',
    softwareVersion: 'ソフトウェアバージョン',
    memory: 'メモリ',
    available: '利用可能',
    useArrowKeys: '↑↓ でナビゲート',
    pressEnterToChange: 'ENTER で設定を変更',
    on: 'オン',
    off: 'オフ',
    
    // Ringtone options
    nokiaTune: 'Nokia チューン',
    beep: 'ビープ',
    silent: 'サイレント',
    
    // Backlight options
    seconds5: '5秒',
    seconds15: '15秒',
    seconds30: '30秒',
    alwaysOn: '常時点灯',
    
    // Contrast options
    low: '低',
    normal: '標準',
    high: '高',
    medium: '中',
    
    // Contacts
    contactsTitle: '連絡先',
    noContacts: '連絡先なし',
    
    // Messages
    messagesTitle: 'メッセージ',
    noMessages: 'メッセージなし',
    send: '送信',
    compose: '作成',
    composeMessage: 'メッセージ作成',
    typeToInput: '直接入力、Delete で削除',
    enterToSend: 'Enter で送信、ESC でキャンセル',
    enterToCompose: 'Enter で作成、ESC で戻る',
    newConversation: '新しい会話',
    selectContact: '連絡先を選択',
    deleteConversation: '会話を削除',
    confirmDelete: '削除しますか？',
    addContact: '連絡先を追加',
    contactName: '名前',
    contactPhone: '電話',
    save: '保存',
    deleteContact: '連絡先を削除',
    
    // Games
    gamesTitle: 'ゲーム',
    snakeGame: 'スネークゲーム',
    tetris: 'テトリス',
    classicSnakeGame: 'クラシックスネークゲーム',
    classicTetrisGame: 'クラシックテトリスゲーム',
    comingSoon: '近日公開...',
    selectGameToPlay: 'プレイするゲームを選択',
    highScores: 'ハイスコア',
    notAvailable: '利用不可',
    play: 'プレイ',
    score: 'スコア',
    highScore: 'ハイスコア',
    pressEnterToStart: 'ENTER でスタート',
    gameOver: 'ゲームオーバー！ENTER でリスタート',
    pressEnterToRestart: 'ENTER でリスタート',
    useArrowKeysToControl: '矢印キーでスネークを操作',
    playing: 'プレイ中',
    start: 'スタート',
    finalScore: '最終スコア',
    useArrowKeysToMove: '矢印キーで移動',
    eatFoodToGrow: '食べ物を食べて成長',
    pause: '一時停止',
    paused: '一時停止中',
    arrowKeys: '矢印キー',
    moveSnake: 'スネークを移動',
    backToGamesMenu: 'ゲームメニューに戻る',
    
    // Tetris specific
    next: '次',
    lines: 'ライン',
    level: 'レベル',
    restart: '再開',
    resume: '続行',
    upToRotate: '上で回転',
    enterToPause: 'Enterで一時停止',
    spaceToHardDrop: 'スペースでハードドロップ',
    downToFastDrop: '下矢印: 高速落下',
    gameStartHint: 'Enterを押してゲーム開始',
    gamePausedHint: 'ゲーム一時停止中 - Enterで続行',
    gameOverHint: 'ゲームオーバー！Enterで再開',
    gamePlayingHint: 'ゲーム進行中',
    startGame: '開始',
    continueGame: '続行',
    restartGame: 'もう一度',
    pauseGame: '一時停止',
    exitGame: '終了',
    moveBlock: '矢印キー: ブロック移動',
    rotateBlock: '上矢印: ブロック回転',
    fastDrop: '下矢印: 高速落下',
    hardDrop: 'スペース: ハードドロップ',
    backToMenu: 'ESC: メニューに戻る',
      
      // Contacts
    contactNotFound: '連絡先が見つかりません',
    pressEscToGoBack: 'ESC で戻る',
    contactDetails: '連絡先詳細',
    phoneNumber: '電話番号',
    type: 'タイプ',
    mobile: 'モバイル',
    status: 'ステータス',
    online: 'オンライン',
    call: '通話',
    view: '表示',
    
    // Messages
    conversationNotFound: '会話が見つかりません',
    you: 'あなた',
    typeMessage: 'メッセージを入力:',
    reply: '返信',
    open: '開く',
    
    // Common
    empty: '空',
    
    // Navigation
    useArrowKeysToNavigate: '矢印キーでナビゲート',
    pressEnterToSelect: 'ENTER で選択',
    escToBack: 'ESC: ゲームメニューに戻る'
  }
};

export const getLanguageDisplayName = (code: string): string => {
  const names: Record<string, string> = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'ru': 'Русский',
    'ja': '日本語'
  };
  return names[code] || code;
};

export const supportedLanguages = ['zh-CN', 'zh-TW', 'en', 'ru', 'ja'];