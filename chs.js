/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //#region 自动化
    'ON': '开启',
    'OFF': '关闭',
    'ENABLED': '启用',
    'DISABLED': '禁用',
    'SMART': '智能',
    'YES': '是',
    'NO': '否',
    'IDLE': '放置',
    'ACTIVE': '手动',
    //#endregion
    //#region 提示
    'Protip: you can hold the EXP button': '友情提示：您可以尝试按住经验值按钮',
    'Hang in there! Something happens at LVL 60...': '别放弃，60级的时候就有新东西了……',
    //#endregion
    //#region 显示
    'Maxed!': '已达最大!',
    'PRESTIGE!': '转生!',
    'UPGRADE!': '升级!',
    'MAXED': '已达最大',
    'EXP Boost': '经验增幅',
    'Autoclicker': '自动点击',
    'EXP Fluctuation': '经验涨落',
    'EXP Factor': '经验系数',
    'EXP Flux': '经验通量',
    'EXP Battery': '经验电池',
    'Total EXP': '总经验值',
    'Total Clicks': '总点击次数',
    'Time Played': '总游戏时长',
    'Total EXP (Current Prestige': '总经验值(本次转生',
    'Total Clicks (Current Prestige': '总点击次数(本次转生',
    'Time Played (Current Prestige': '总游戏时长(本次转生',
    'Highest Level': '最高等级',
    'Total EXP (All Time': '总经验值(所有时间',
    'Total Clicks (All Time': '总点击次数(所有时间',
    'Time Played (All Time': '总游戏时长(所有时间',
    'Highest Level (Current Reboot': '最高等级(当前重启',
    'Total EXP (Current Reboot': '总经验值(当前重启',
    'Total Clicks (Current Reboot': '总点击次数(当前重启',
    'Time Played (Current Reboot': '总游戏时长(当前重启',
    'Highest Level (All Time': '最高等级(所有时间',
    'Highest Level (Current Iteration': '最高等级(本次迭代',
    'Total EXP (Current Iteration': '总经验值(本次迭代',
    'Total Clicks (Current Iteration': '总点击次数(本次迭代',
    'Time Played (Current Iteration': '总游戏时长(本次迭代',
    'Automated EXP/click': '每次自动点击经验值',
    'Total Automated EXP Multipler': '自动点击经验值倍率',
    'Manual EXP/click': '每次手动点击经验值',
    'Total Manual EXP Multipler': '手动点击经验值倍率',
    'EXP/click': '每次点击经验值',
    'Total EXP Multipler': '点击经验值倍率',
    'Past Prestiges': '之前转生',
    'Past Reboots': '之前重启',
    'PURCHASED': '已购买',
    'REBOOT!': '重启!',
    'ACTIVATE!': '已激活!',
    'COMPLETED!': '已获得!',
    'Requires': '需要',
    'Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot': '进入挑战后将同时进行重启，如果不满足条件则无法获得瓦特',
    'To complete a challenge you must Reboot with the required amount of spare PP': '想要完成挑战，您需要以指定的空余转生点进行重启',
    'IN PROGRESS': '进行中',
    'ENTER CHALLENGE': '进入挑战',
    'Goal': '目标',
    'Photons gained are based on your Highest Level (Current Iteration': '光子获取量基于您的最高等级(本次迭代',
    'They don\'t do anything by themselves, and are only for spending': '它们本身不提供任何加成，只用于购买升级',
    'Resets dark matter and': '重置暗物质，并',
    'reduces Growth Factor 20': '使增长系数减少20',
    'reduces Growth Factor 30': '使增长系数减少30',
    'reduces Growth Factor ???': '使增长系数减少???',
    'And with our combined powers we will make great progress': '只要我们联手，将改天换地',
    'Imagine if the game didn\'t play itself': '想一想，如果这个游戏没有自动化会如何',
    'Maybe you should take a break from making progress for a bit': '或许有些时候毫无进展也是可以接受的',
    'Ask nicely for this one first': '既然你诚心诚意地发问了',
    'Do something "funny"': '做点有趣的事',
    'Be very lucky': '欧皇的证明',
    'Pay respects': '进入坦克',
    'A lot of work if you\'re blind': '即使看不见，您也依旧可以进行重置',
    'Throw it all away': '转生升级：我本可以忍受黑暗，如果我未曾见过光明',
    'Acquire appreciation for emoji': '受到表情们的欣赏(10次)',
    'Excessively challenging if you\'re blind': '挑战那种东西同样不需要看得见',
    'Straight to number two without number one': '不需要1，直接数到2',
    'Do it yourself when there\'s no point': '即使已经没有意义，仍然手动升级反应堆',
    'This is a no helium zone': '此地无氢零零克',
    'EXP production is boosted based on how many times you have Prestiged': '经验值产量基于转生次数而增加',
    'EXP production is boosted based on your highest level': '经验值产量基于最高等级而增加',
    'EXP production is boosted based on how much spare PP you have': '经验值产量基于空余转生点的数量而增加',
    'stacks with Magnified Flux if you have it, making it uncapped': '与通量增强升级相互叠乘，并使经验通量的效果不再有上限',
    'Discharge automation is also now unlocked with the EXP Capacitor instead of High Voltage I': '购买经验电容时就可以解锁自动放电',
    'EXP production is boosted based on your fastest Reboot': '经验值产量基于最速重启时间而增加',
    'Helium production is boosted based on how many watts you have': '氦产量基于瓦特数量而增加',
    'Helium production is boosted based on how much helium you have': '氦产量基于氦数量而增加',
    'This applies retroactively': '对之前购买过的升级也生效',
    'Helium production is boosted based on unspent hydrogen': '氦产量基于空余的氢数量而增加',
    'EXP production is boosted based on your fastest Quantum Iteration': '经验值产量基于最速量子迭代时间而增加',
    'EXP production is boosted based on unspent photons': '经验值产量基于空余的光子数量而增加',
    'Helium production is boosted based on Prism LVL': '氦产量基于棱镜等级而增加',
    'Dark matter growth factor is boosted based on your Highest Omega LVL': '暗物质增长系数基于欧米伽最高等级而增加',
    'All rules from the first four challenges, simultaneously': '前四个挑战的负面效果同时生效',
    'Why are you still using Long notation?': '您怎么还在用长整型记数法？',
    'Why are you still using Standard notation?': '您怎么还在用基本记数法？',
    '45 digits is a lot': '45位已经够长了',
    'Why are you still using Condensed notation?': '您怎么还在用缩略记数法？',
    'This achievement brought to you by the letter N': '本成就由字母N赞助推出',
    'Cancerously huge': '毒瘤一般的数字',
    'Can\'t even see how big this is': '这数字看不到了',
    'A non-zero portion of infinity': '无限的一小部分',
    'Oh, this is pretty mega': '欧米伽的英文听起来像哦好大',
    'This was huge in Rome': '罗马数字似乎不太适合表示这么大的数字',
    'NDUgZGlnaXRzIGlzIGEgbG90': 'NDXkvY3lt7Lnu4/lpJ/plb/kuoY=',
    'Unlocks the EXP Overclocker, which boosts EXP ???x for ???': '解锁经验超频，使经验值产量在???内变为???倍',
    'Unautomated clicks are boosted a further +??? for every Autoclicker tier': '自动点击每有1阶层，就使非自动点击的收益+???',
    'Longer Prestiges give more AMP (up to ???': '持续时间长的转生可以获得更多放大倍率(最高为???',
    'Unlocks ??? Capacitance mode, giving a ???x boost on Discharge': '解锁???电容模式，放电时可以提供???倍加成',
    'Also allows you to Discharge at ???': '并使您可以在???时放电',
    'EXP production is boosted +??? for every achievement completed': '每完成1个成就，经验值产量就增加???',
    'Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec': '同时在高级自动转生中增加峰值模式，在每秒放大倍率达到峰值时自动转生',
    'You permanently keep ??? of your Times Prestiged stat every Reboot': '每次重启时永久保留???的转生次数',
    'You gain ??? of your pending AMP every second': '每秒获得???的峰值放大倍率',
    'AMP Conversion now gives ??? of your pending AMP instead': '“放大倍率转换”特权变为每秒获得???的峰值放大倍率',
    'Prestige ??? times': '进行???次转生',
    'Play for ???': '总游戏时长达到???',
    'Reboot in under ???': '在花费时间少于???的前提下重启',
    'Quantize ??? times': '进行???次量子化',
    'Quantize in under ???': '在花费时间少于???的前提下量子化',
    'Gain no EXP for ???': '在???内没有获得过经验值',
    'Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge': '解锁???电容模式，放电时可以提供???倍加成',
    'Also unlocks automation for Discharge': '同时解锁自动放电',
    'All Upgrades require ??? fewer levels': '所有升级的等级需求减少???',
    'Does not apply to challenges': '对挑战无效',
    'Unlocks the EXP Overclocker, which boosts EXP 3x for 45 seconds': '解锁经验超频，使经验值产量在45秒内变为3倍',
    'Unautomated clicks are boosted a further +32% for every Autoclicker tier': '自动点击每有1阶层，就使非自动点击的收益+32%',
    'Longer Prestiges give more AMP (up to 10 seconds': '持续时间长的转生可以获得更多放大倍率(最高为10秒',
    'EXP production is boosted +5% for every achievement completed': '每完成1个成就，经验值产量就增加5%',
    'You permanently keep 25% of your Times Prestiged stat every Reboot': '每次重启时永久保留25%的转生次数',
    'You gain 20% of your pending AMP every second': '每秒获得20%的峰值放大倍率',
    'PP is immediately granted on leveling up rather than Prestiging': '升级时立即可以获得转生点，无需转生',
    'AMP Conversion now gives 100% of your pending AMP instead': '“放大倍率转换”特权变为每秒获得100%的峰值放大倍率',
    'Prestige 1 time': '进行1次转生',
    'Play for 1 hour': '总游戏时长达到1小时',
    'Play for 6 hours': '总游戏时长达到6小时',
    'Play for 24 hours': '总游戏时长达到24小时',
    'Play for 72 hours': '总游戏时长达到72小时',
    'Play for 168 hours': '总游戏时长达到168小时',
    'Reboot in under 1 hour': '在花费时间少于1小时的前提下重启',
    'Reboot in under 10 minutes': '在花费时间少于10分钟的前提下重启',
    'Reboot in under 1 minute': '在花费时间少于1分钟的前提下重启',
    'Reboot in under 1 second': '在花费时间少于1秒的前提下重启',
    'Quantize 1 time': '进行1次量子化',
    'Quantize in under 1 hour': '在花费时间少于1小时的前提下量子化',
    'Quantize in under 5 minutes': '在花费时间少于5分钟的前提下量子化',
    'Quantize in under 1 minute': '在花费时间少于1分钟的前提下量子化',
    'Quantize in under 30 seconds': '在花费时间少于30秒的前提下量子化',
    'Quantize in under 10 seconds': '在花费时间少于10秒的前提下量子化',
    'Gain no EXP for 10 minutes': '在10分钟内没有获得过经验值',
    'Unlocks 50% Capacitance mode, which gives a 8x boost on Discharge': '解锁50%电容模式，放电时可以提供8倍加成',
    'Unlocks 75% Capacitance mode, giving a 12x boost on Discharge': '解锁75%电容模式，放电时可以提供12倍加成',
    'Unlocks 100% Capacitance mode, giving a 16x boost on Discharge': '解锁100%电容模式，放电时可以提供16倍加成',
    'Also allows you to Discharge at 0 seconds': '并使您可以在0秒时放电',
    'Unlocks 50% Capacitance mode, which gives a 4x boost on Discharge': '解锁50%电容模式，放电时可以提供4倍加成',
    'Unlocks 75% Capacitance mode, giving a 6x boost on Discharge': '解锁75%电容模式，放电时可以提供6倍加成',
    'Unlocks 100% Capacitance mode, giving a 8x boost on Discharge': '解锁100%电容模式，放电时可以提供8倍加成',
    'All Upgrades require 25% fewer levels': '所有升级的等级需求减少25%',
    'All Upgrades require 50% fewer levels': '所有升级的等级需求减少50%',
    'Unlocks four additional modes for Auto-Prestige configuration': '解锁自动转生的四种额外模式',
    'Unlocks three additional modes for Auto-Prestige configuration': '解锁自动转生的三种额外模式',
    'Unlocks an upgrade that gives an additional multiplier to EXP': '解锁提供额外经验值倍率的升级',
    'Unlocks an upgrade that gives an additional multiplier to EXP with active and idle modes': '解锁提供额外经验值倍率的升级，有手动和放置两种模式',
    'Also starts with automation unlocked': '初始状态下就解锁自动化',
    'Unlocks the EXP Capacitor, which takes some of your EXP production and stores it': '解锁经验电容，减少部分经验值产量并将它储存起来',
    'Unlocks automation for Reboot': '解锁自动重启',
    'Also unlocks Past Reboots in Statistics': '并解锁统计面板下之前重启的统计',
    'You must surpass your highest level to gain more AMP, Patience and AMP Conversion do not apply': '您需要超过最高等级才可以获得更多放大倍率，耐心升级和放大倍率转换无效',
    'You must surpass your highest level to gain more AMP, Patience does not apply': '您需要超过最高等级才可以获得更多放大倍率，耐心升级无效',
    'Reboot in 6 Prestiges or less': '只能进行不超过6次转生',
    'Reboot in 1 Prestige or less': '只能进行不超过1次转生',
    'Reboot in ??? Prestiges or less': '只能进行不超过???次转生',
    'Multi-Prestige, Reboot Residue, Ease of Completion do not apply': '多重转生、重启余产和易于完成无效',
    'LONG': '长整型记数法',
    'STANDARD': '基本记数法',
    'SCIENTIFIC': '科学记数法',
    'ENGINEERING': '工程记数法',
    'CONDENSED': '缩略记数法',
    'LOGARITHM': '对数记数法',
    'LETTERS': '字母记数法',
    'CANCER': '毒瘤记数法',
    'INFINITY': '无限记数法',
    'ROMAN': '罗马记数法',
    'BASE64': 'BASE64记数法',
    'MIXED SCIENTIFIC': '混合科学记数法',
    'MIXED ENGINEERING': '混合工程记数法',
    'MILLION': '百万(1e6)',
    'BILLION': '十亿(1e9)',
    'SHOW ALL': '显示全部',
    'SHOW IMPORTANT': '显示重要',
    'HIDE BOUGHT': '隐藏已购买',
    'AUTOMATIC': '自动',
    'RAINBOW': '彩虹',
    'CUSTOM': '自定义',
    'NONE': '无',
    'PRESTIGE': '转生',
    'REBOOT': '重启',
    'Recharging': '充电中',
    'Standby': '就绪',
    //#endregion
    //#region 主页面
    'UPGRADES': '升级',
    'QUANTUM': '量子',
    'STATISTICS': '统计',
    'ACHIEVEMENTS': '成就',
    'SETTINGS': '设置',
    'THE END!': '结局!',
    'EXP Overclocker': '经验超频',
    'ACTIVATE': '激活',
    'EXP Capacitor': '经验电容',
    'Capacitance Mode': '电容模式',
    'switching Discharges': '切换是否放电',
    'DISCHARGE!': '放电!',
    'Discharge at (seconds': '放电时间(单位为秒',
    'AMP': '放大倍率',
    'PP': '转生点',
    'PP Upgrades': '转生点升级',
    'PP Progress Bar': '转生点进度条',
    'RESPEC!': '洗点!',
    'Auto-Prestige Configuration': '自动转生设置',
    'Automation': '自动',
    'Auto-Prestige Mode': '自动转生模式',
    'LEVEL': '等级',
    'TIME': '时间',
    'PEAK': '峰值',
    'Auto-Prestige Level': '自动转生等级',
    'Auto-Prestige AMP': '自动转生放大倍率',
    'Auto-Prestige PP': '自动转生转生点',
    'Auto-Prestige Time (in seconds': '自动转生时间(单位为秒',
    'Smart Auto-Prestige Configuration': '智能自动转生设置',
    'Smart Mode': '智能模式',
    'Current Mode Time: 0.00s': '当前模式时间：0.00秒',
    'Reset': '重置',
    'Time to wait in Peak mode (in seconds': '峰值模式中的等待时间(单位为秒',
    'Time to wait in PP mode (in seconds': '转生点模式中的等待时间(单位为秒',
    'AMP Limit (0 for no limit': '放大倍率限制(设为0则无限制',
    'Starting Mode': '初始模式',
    'PP Auto-upgrade Configuration': '自动转生点升级设置',
    'Priority Mode': '优先级模式',
    'IGNORE': '忽略',
    'WEAK': '最低',
    'STRICT': '严格',
    'g hydrogen': '克氢',
    'Generator requirements': '发电机需求',
    'All Prestige upgrades purchased': '已购买所有转生升级',
    'Auto-Reboot Configuration': '自动重启设置',
    'Auto-Reboot Mode': '自动重启模式',
    'WATTS': '瓦特',
    'Auto-Reboot Watts': '自动重启瓦特',
    'Auto-Reboot Time (in seconds': '自动重启时间(单位为秒',
    'Reboot for pending PP': '不等待转生点再重启',
    'Stop Rebooting after (in seconds': '重启停止时间(单位为秒',
    'Hide Completed Perks': '隐藏已获得的特权',
    'EXIT CHALLENGE': '退出挑战',
    'mg helium': '毫克氦',
    'Auto-Reactor Configuration': '自动反应堆设置',
    'Hydrogen Savings Proportion': '氢保留比例',
    'Deuterium Importance': '氘权重',
    'NUCLEAR REACTOR CORES': '核反应堆核心',
    'BUY ONE': '购买一次',
    'BUY MAX': '购买最大',
    'MAX ALL': '最大所有',
    'MAX HALF': '最大一半',
    'Deuterium Power': '氘供能',
    'QUANTIZE!': '量子化!',
    '108 challenge completions & LVL 65,536 required': '需要完成108次挑战并达到65536级',
    'Auto-Quantize Configuration': '自动量子化设置',
    'Auto-Quantize Mode': '自动量子化模式',
    'PHOTONS': '光子',
    'STEP': '倍增',
    'Auto-Quantize Photons': '自动量子化光子',
    'Auto-Quantize Time (in seconds': '自动量子化时间(单位为秒',
    'Auto-Quantize Multiplicative Step': '自动量子化倍增倍率',
    'kg dark matter': '千克暗物质',
    'COLLAPSE!': '坍缩!',
    'Prism Chamber': '棱镜间',
    'Reactor Chamber': '反应堆间',
    'Dark Matter Chamber': '暗物质间',
    'ASSIGN 1 Ω': '分配1Ω',
    'ASSIGN ALL Ω': '分配所有Ω',
    'RETRIEVE ALL Ω': '取回所有Ω',
    'OMEGA CHALLENGE': '欧米伽挑战',
    'You must be able to Quantize to enter the Omega Challenge': '您需要在可以量子化的前提下才可以进入欧米伽挑战',
    'Gain the required amount of photons to complete the Omega Challenge': '获得特定数量的光子以完成欧米伽挑战',
    'EXIT OMEGA CHALLENGE': '退出欧米伽挑战',
    'Current Level': '当前等级',
    'Current EXP': '当前经验值',
    'Autoclicking': '自动点击',
    'EXP Automation Power': '自动点击经验值收益',
    'Times Prestiged': '转生次数',
    'Amplification Points': '放大倍率',
    'Current Prestige Points': '当前转生点',
    'Total Prestige Points': '总转生点',
    'Total Reboots': '重启次数',
    'Generator Power': '发电机收益',
    'Current Hydrogen': '当前氢数量',
    'Total Quantum Iterations': '量子迭代次数',
    'Current Photons': '当前光子数量',
    'Fastest Prestige': '最速转生时间',
    'Fastest Reboot': '最速重启时间',
    'Fastest Quantum Iteration': '最速量子迭代时间',
    'PREV': '前页',
    'NEXT': '后页',
    'Game saved': '游戏已保存',
    'Work Theme': '摸鱼用界面',
    'Notation': '记数法',
    'Switchpoint': '数字格式切换界限',
    'Hotkeys': '快捷键',
    'RESET HOTKEYS': '重置快捷键',
    'Reboot Confirmation': '重启确认',
    'Challenge Confirmation': '挑战确认',
    'Quantize Confirmation': '量子化确认',
    'Priority Reset Layer': '显示的重置层级',
    'Hidden Achievement Hints': '显示隐藏成就提示',
    'Photosensitivity Mode': '进度条不闪烁',
    'Level Color': '等级颜色',
    'Hue': '色彩',
    'Visual Update Rate': '视觉刷新率',
    'Left/Right: Change tab': '左/右键：切换选项卡',
    '1-6: Buy upgrade (on upgrades tab': '1-6：购买升级(在升级选项卡下',
    'Shift+1-6: Toggle auto-upgrade (on upgrades tab': 'Shift+1-6：切换自动升级状态(在升级选项卡下',
    'EXP Simulator v2.3.202': '经验模拟器 v2.3.202',
    'Made by Zakuro': '作者Zakuro，汉化者by22dgb',
    'Last updated April 2, 2023': '最近更新时间：2023年4月2日',
    'CONGRATULATIONS!': '恭喜！',
    'You have reached LVL 1,000,000 and thus officially beaten EXP Simulator!': '您达到了1,000,000级，可以算是通关了经验模拟器！',
    'Thanks for sticking with the game for this long!': '谢谢您这么久以来的不离不弃！',
    'There\'s no second Limit Break or anything so you can\'t go past LVL 1,000,000...': '不存在其他机制使您可以超过1,000,000级……',
    'You can quit now, or you can try to play more if you want.': '因此您已经可以退出游戏了，当然，您也可以继续玩下去。',
    'Maybe you could even get all the achievements if you haven\'t already. Good luck!\n ': '或许您可以尝试获得所有的成就。总之祝您好运！',
    //#endregion
    //#region 初始化
    'Priority': '优先级',
    'Unlocks an upgrade that gives random amounts of extra EXP on all clicks': '解锁可以随机提供额外经验值的升级',
    'Manual Labor I': '手工作业 I',
    'Auto-Upgrading': '自动升级',
    'Unlocks automation for all upgrades': '解锁自动升级',
    'Auto-Prestiging': '自动转生',
    'Unlocks automation for Prestige': '解锁自动转生',
    'Also unlocks Past Prestiges in Statistics': '并解锁统计面板下之前转生的统计',
    'Manual Labor II': '手工作业 II',
    'Unlocks an upgrade that multiplies all EXP production': '解锁可以使经验值产量成倍提升的升级',
    'Limit Break': '界限突破',
    'Jumpstart I': '助推启动 I',
    'AMP Efficiency': '放大倍率收益',
    'The Auto-Prestige panel will now display average AMP gained per second': '自动转生面板可以显示每秒放大倍率的收益',
    'Starter Kit I': '初始套件 I',
    'Jumpstart II': '助推启动 II',
    'Manual Labor III': '手工作业 III',
    'Advanced Auto-Prestiging': '高级自动转生',
    'Jumpstart III': '助推启动 III',
    'True Randomness': '真实随机',
    'EXP Fluctuation is twice as strong': '经验涨落的效果翻倍',
    'Auto-Overclocking': '自动超频',
    'Unlocks an automator that will automatically activate EXP Overclock when its cooldown is over': '解锁自动超频，将在冷却时间结束后自动激活经验超频',
    'Manual Labor IV': '手工作业 IV',
    'Starter Kit II': '初始套件 II',
    'Extra Cycles I': '额外周期 I',
    'Unlocks an upgrade that generates a boost to EXP production, increasing over time': '解锁可以随着时间提升经验值加成的升级',
    'Caps at 20x': '最高20倍',
    'Stretched Time': '延长时间',
    'EXP Overclocker now stays active twice as long': '经验超频的效果持续时间翻倍',
    'Spare Power': '空余之力',
    'Extra Cycles II': '额外周期 II',
    'Manual Labor V': '手工作业 V',
    'Supercharge': '超级快充',
    'EXP Overclocker cooldown time is halved': '经验超频的冷却时间减半',
    'Prestige Power': '转生之力',
    'Starter Kit III': '初始套件 III',
    'Patience': '耐心',
    'Depth Power': '深度之力',
    'AAA': '3A电池',
    'Magnified Flux': '通量增强',
    'EXP Flux now increases 5x faster, and has a 5x higher cap': '经验通量增长速度变为5倍，且上限变为5倍',
    'Starter Kit IV': '初始套件 IV',
    'High Voltage I': '高电压 I',
    '9-Volt': '9伏电池',
    'High Voltage II': '高电压 II',
    'High Voltage III': '高电压 III',
    'The Generator': '发电机',
    'Unlocks a new prestige layer': '解锁新的重置层级',
    'Enter Reboot': '开始重启',
    'Starter Kit V': '初始套件 V',
    'Technological Gift I': '技术天赋 I',
    'You begin Reboots with every PP upgrade up to Limit Break already purchased': '重启后，初始状态下就直接获得直到界限突破为止的所有转生升级',
    'Uninhibited Flux': '无限通量',
    'Multi-Prestige': '多重转生',
    'Ultracharge': '究级快充',
    'EXP Overclocker cooldown time is halved a second time': '经验超频的冷却时间再度减半',
    'stacks with Supercharge': '与超级快充叠乘',
    'EXP Discount I': '经验折扣 I',
    'PP Auto-Upgrading': '自动转生升级',
    'Unlocks automation for Prestige upgrades': '解锁自动转生升级',
    'Fusion': '合二为一',
    'The active/idle switch for EXP Battery is removed, and both modes are now in effect simultaneously': '移除经验电池的手动/放置开关，两个效果同时生效',
    'Max Capacity': '最大容量',
    'Technological Gift II': '技术天赋 II',
    'You begin Reboots with every PP upgrade up to EXP Overclocker already purchased': '重启后，初始状态下就直接获得直到经验超频为止的所有转生升级',
    'Auto-Capacitance': '自动电容',
    'Unlocks automated mode switching for Capacitor, automatically switching to the highest available mode': '解锁自动电容，可以自动切换到最高效果的模式',
    'Also unlocks Smart Auto-Discharge, which automatically Discharges when best to do so': '并解锁智能自动放电，将在最合适的时候放电',
    'Starter Kit VI': '初始套件 VI',
    'All upgrades on the Upgrades tab have twice as many free tiers': '从所有初始套件升级中获得的免费阶层翻倍',
    'Energize': '通电',
    'Smart Auto-Prestige': '智能自动转生',
    'Unlocks a customizable Auto-Prestige setting that automatically switches between Peak and PP mode': '解锁智能自动转生，可以自动在峰值模式和转生点模式之间切换',
    'Auto-Reboot': '自动重启',
    'Speed Power I': '高速之力 I',
    'Challenges': '挑战',
    'Unlocks Challenges': '解锁挑战',
    'Reboot Residue': '重启余产',
    'Overachievements': '过度成就',
    'The Enter Reboot boost based on achievements now works multiplicatively instead of additively': '“开始重启”特权的效果从叠加变为叠乘',
    'Infinicharge': '无限充电',
    'The cooldown on EXP Overclocker is removed entirely, making Overclocker always active': '移除经验超频的冷却时间，使它常时生效',
    'EXP Discount II': '经验折扣 II',
    'Go Nuclear': '拥抱核能',
    'Unlocks the Nuclear Reactor': '解锁核反应堆',
    'Rebooting will now also give hydrogen': '重启可以获得氢',
    'Dual Power': '双重供能',
    'Snowball Effect': '滚雪球效应',
    'Deuterium Channeling': '氘引流',
    'AMP Conversion': '放大倍率转换',
    'PP Shift': '转生点变换',
    'Level up!': '升级了！',
    'Decathlevel': '十项全能',
    'Whoa, we\'re halfway there': '路程过半',
    'Push it to the limit': '达到极限',
    'Level 100 boss': '百级首领',
    'What do all these levels even do?': '等级到底还有什么用？',
    'The limit does not exist': '没有极限',
    'Addicted to EXP': '沉迷经验',
    'The pursuit of madness': '追求疯狂',
    'I tried so hard and got so far': '历尽艰辛，终于到达',
    'Overexperienced': '经验过度',
    'Blood, sweat, and EXP': '血汗经验',
    'Event horizon': '事件视界',
    'And this is to go even further beyond': '百尺竿头更进一步',
    'You\'re still here?': '您还在吗？',
    'On a whole new level': '全新的等级',
    'LVL -> BIG': '等级膨胀',
    'I dunno man I don\'t think it\'s enough progress': '不懂，我觉得进展还不够快',
    'Your parents wouldn\'t be proud': '您的家人还无法以您为傲',
    'To hell and back again': '生死之间',
    'The big one-oh-oh-oh-oh-oh': '伊铃凌零龄灵',
    'The grandmaster of level ups': '升级宗师',
    '200 Grand™': '奔驰200',
    'Stare into the abyss': '凝视深渊',
    'Levels all the way down': '向下升级',
    'What if the real levels were the friends we made along the way?': '或许等级是我们一路走来的朋友',
    'As it turns out, the limit DOES exist': '结果来看，是*有*极限的',
    'Square one': '回到原点',
    'See you in another life': '来生再会',
    'Nowhere to go but up': '唯有向前',
    'Welcome to hell': '地狱欢迎您',
    'A real grindset': '硬核刷子',
    'You\'ve been busy haven\'t you?': '您看起来忙的很',
    'And the reward for misplaced effort goes to... you': '虽然方向偏了，但结果是好的',
    'Stonks': '赚到饱',
    'Who wants to be a billionaire?': '谁想成为亿万富翁？',
    'US national debt': '美国国债',
    'The entire world economy': '世界经济',
    'Unfathomable wealth': '资产深不可测',
    'So big it breaks Long notation': '它太大了，甚至干掉了长整型记数法',
    'Satisfied yet?': '您满意了吗？',
    'Definitely can\'t count this on my hands': '显然已经数不清数量了',
    'Absolute unit': '绝对单位',
    'Top ten numbers you\'ll never use': '用不到的十大数字',
    'One chonker number': '很大很大的数字',
    'Endless growth': '无尽的增长',
    'It\'s okay I lost track too': '没事，我也迷路了',
    'Hungolomghnonoloughongous': '超级超级大的数字',
    'Big numbers for a big boy': '大块头有大数字',
    'I like my women like I like my numbers': '爱数字就像爱妹子',
    'Honestly quite sizeable': '真的超级可观',
    'More! More! More!!': '还不够！我还要更多，更多！',
    'Generic large number achievement name #20': '大数字成就编号20',
    'Well the digits keep comin and they don\'t stop comin': '数字增长，络绎不绝',
    'Honestly bro, this is just a really heckin big number... like I can\'t even think of any good name for this one so this is what you get': '已经大到不知道说什么好了',
    '*notices your EXP*': '*注意经验值*',
    'EXP singularity': '经验值奇点',
    'Halfway to infinity': '距离无限还有一半路程',
    'On the exponential scale this isn\'t really that big': '指数层面上来看也不算太大了',
    'Even Zakuro didn\'t expect you to make it this far': '连Zakuro都想不到您能玩到这里',
    'A hundred, at least': '至少一百',
    'Hot minute': '白驹过隙',
    'Time well spent': '欢乐时光',
    'Day in, day out': '日复一日',
    'Don\'t you have a life?': '您在现实中没有别的可以做吗？',
    'True dedication': '真实奉献',
    'Amplified': '放大了',
    'Haha AMP go brrrrr': '哈哈放大倍率就这么涨起来了',
    'Blast off': '芜湖起飞',
    'I can see my house from here': '这里能看到我的家',
    'Making the most out of your reset': '尽力利用重置',
    'Not bad, kid': '不错嘛，小子',
    'Oh, the places you\'ll go': '前程似锦',
    'We\'re not in Kansas anymore': '这里不是家',
    'Started from the bottom now we here': '从底层逆袭而上',
    'Nigh unstoppable': '近乎无法阻挡',
    'With great power comes great EXP': '能力越大，经验越大',
    'Where no man has gone before': '处子地',
    'To the end of space and time': '前往时空的尽头',
    'The only RNG in the game': '游戏中仅有的随机因素',
    'Unlock EXP Fluctuation': '解锁经验涨落',
    'Now we\'re getting somewhere': '有些进展了',
    'Unlock EXP Factor': '解锁经验系数',
    'The sky\'s the limit': '界限是无限',
    'Get Limit Break': '突破界限',
    'But can it run Crysis?': '那么，它可以运行孤岛危机吗？',
    'Unlock EXP Overclocker': '解锁经验超频',
    'The EXP flows within you': '心中奔流的经验',
    'Unlock EXP Flux': '解锁经验通量',
    'I\'ve got the power': '力量涌动',
    'Unlock EXP Battery': '解锁经验电池',
    'Delayed gratification': '延迟满足',
    'Unlock EXP Capacitor': '解锁经验电容',
    'Full potential unlocked': '潜能彻底释放',
    'Unlock everything on the Upgrades tab': '解锁升级选项卡下的所有内容',
    'Tutorial completed!': '教程完毕！',
    'EXP comes to those who wait': '经验青睐有准备的人',
    'Speedy clicking': '高速点击',
    'Sir, do you know how fast you were going?': '您知道您超速多少了吗？',
    'WE HAVE REAHCED MXAIMUN VLELOCIPY': '我们已经达了到最速大度',
    'Cube one': '又是回到原点',
    'Activate the Generator': '激活发电机',
    'All is lost again': '又失去了一切',
    'Less than zero': '零下',
    'Groundhog day': '土拨鼠日',
    'Cycle of insanity': '疯狂的周期',
    'I\'ve become so numb': '我已麻木不仁',
    'Progress from lost progress': '从失去的进度中获得进展',
    'Try turning it off and on again': '试着将它反复开关',
    'Picking up the pace': '加快步伐',
    'GAS GAS GAS': '加油，加油，加油',
    'Escape velocity': '逃逸速度',
    'At the speed of light': '犹如光速',
    'Did you miss them?': '想念它们么？',
    'Complete Challenge I for the first time': '首次完成挑战 I',
    'That\'s some serious markup': '坐地起价',
    'Complete Challenge II for the first time': '首次完成挑战 II',
    'When the levels are not so easy': '等级不再那么廉价',
    'Complete Challenge III for the first time': '首次完成挑战 III',
    'Oops! All pushing': '啊哦！只进不退',
    'Complete Challenge IV for the first time': '首次完成挑战 IV',
    'The definition of diminishing returns': '边际效用递减规律',
    'Complete Challenge V for the first time': '首次完成挑战 V',
    'Calculated': '精打细算',
    'Complete Challenge VI for the first time': '首次完成挑战 VI',
    'Helium is love Helium is life': '生活有氦就有了爱',
    'Complete Challenge VII for the first time': '首次完成挑战 VII',
    'Like kicking a brick wall': '陷入困境',
    'Complete Challenge VIII for the first time': '首次完成挑战 VIII',
    'Jack of all trades': '万事通',
    'Complete Challenge IX for the first time': '首次完成挑战 IX',
    'Ace of one trade': '专精于一',
    'One down, eight to go': '拿下一个，还剩八个',
    'I like a little challenge in my life': '我希望生活能有一些挑战',
    'That was only half as difficult': '也就一半难度吧',
    'Ultimate completionism': '终级完美主义',
    'Never again again': '再也不见，再见',
    'Congration, you done it': '恭喜，您成功了',
    'Fusion mailed': '聚变开始',
    'Unlock the Nuclear Reactor': '解锁核反应堆',
    'This bad boy can fit so much hydrogen in it': '这家伙可以容纳这么多氢',
    'Upgrade every core of the Reactor': '升级反应堆的每个核心',
    'Critical mass': '临界质量',
    'In case of implosion look at implosion': '如果发生爆炸，请直视它',
    'No shortage of helium for sure': '氦滥成灾',
    'Tesseract one': '再再度回到原点',
    'Now you\'re thinking with photons!': '想到传送门了吗',
    'Your life, in particles': '粒子人生',
    'Luckily they banished him to an island': '幸运的是他们成功把他放逐到了一个荒岛上',
    'Haha what if we turned everything you\'ve ever done into light': '如果我们把您所做的一切都变成了光会怎样',
    'Back into the blender again': '回到搅拌机',
    'You should go get a PhD': '您该去弄个博士学位来',
    'Heat death of the universe': '宇宙热寂',
    'All hail the Prism': '棱镜万岁',
    'Let its light inside you': '愿光照亮您',
    'Dazzling brilliance': '光彩夺目',
    'Superluminous': '超级亮度',
    'Okay that was too bright I\'m blind now': '眼睛，我的眼睛',
    'With great haste': '全速前进',
    'Look at the sparks fly': '飞舞的火花',
    'Quickest reset in the west': '极速重置',
    'Actually faster than light': '超越光速',
    'Objects in well are heavier than they appear': '井里的东西比看上去更重',
    'Unlock the Gravity Well': '解锁重力井',
    'Transfinite windup toy': '超限的发条玩具',
    'Unlock the Omega Drive': '解锁欧米伽驱动',
    'To infinity and not beyond': '飞向宇宙，囿于无限',
    'Infinity doesn\'t seem so far anymore': '无限不再遥远',
    'Reach ∞ kg dark matter in under 1 minute': '在花费时间少于1分钟的前提下达到∞千克暗物质',
    'At any point did someone say it was too much dark matter?': '是不是有谁说暗物质太多了？',
    'Infinity to one, real quick': '从无限到1，快得很',
    'Now don\'t collapse too much or you might break it': '别坍缩太多，会玩坏的',
    'Impressive': '令人难忘',
    'The Challenge to end all Challenges': '终末之挑战',
    'Complete the Omega Challenge for the first time': '首次完成欧米伽挑战',
    'Not a task for the faint of heart': '胆小怕事，莫入此门',
    '#intentionalfeature': '#有意的组合安排',
    'Discharge the Capacitor while the Overclocker is active': '在激活超频的同时对电容进行放电',
    'What a madman': '疯魔狂人',
    'Go an entire Reboot with all automation turned off': '在关闭所有自动化的前提下，完整地进行1次重启',
    'A whole lot of nothing': '空无一物',
    'Wish granted': '我就大发慈悲的告诉你',
    'Click this achievement\'s box': '点击该成就的方框',
    'Did it for the memes': '玩梗万岁！',
    'Enter a meme number into any input box': '在任意输入框内输入玩梗的数字',
    'Spontaneous Fortune': '自然而然的幸运',
    'F in the chat': '按此键',
    'As we can see you can\'t': '知道您看不见',
    'Spend an entire Reboot with ??? notation': '在使用???记数法的前提下，完整地进行1次重启',
    'But for why though?': '有什么意义呢？',
    'Respec when you already have all the PP upgrades': '在拥有所有转生升级的前提下，进行洗点',
    'Yes I love cancer': '我就是毒瘤',
    'Reboot 10 times while using Cancer notation': '在使用毒瘤记数法的前提下，进行10次重启',
    'Stuck between no eyes and a hard place': '被困在一个看不见又更困难的地方',
    'Complete a challenge while using ??? notation': '在使用???记数法的前提下，完成1次挑战',
    'You could stop at five or six Prestiges, or just none': '二选一：直接转生几次，或是不转生',
    'Reboot without Prestiging': '在不转生的前提下，进行重启',
    'Like adding a needle to a haystack': '大海捞针',
    'A real power move': '强大如斯',
    'Quantize without upgrading the Reactor': '在不升级反应堆的前提下，进行量子化',
    'You win 1 EXP': '您获得了1经验值',
    'Get every achievement': '获得其他所有成就',
    'Challenge I': '挑战 I',
    'EXP Overclocker and EXP Capacitor are disabled': '经验超频和经验电容失效',
    'Challenge II': '挑战 II',
    'Challenge III': '挑战 III',
    'Levels require more EXP the more levels you have': '等级越高，升级所需的经验值也就越多',
    'Challenge IV': '挑战 IV',
    'Challenge V': '挑战 V',
    'All EXP production reduces to zero over 30 seconds': '经验值产量在30秒内降为0',
    'Challenge VI': '挑战 VI',
    'Challenge VII': '挑战 VII',
    'All Upgrades tab things except EXP Boost and Autoclicker are disabled': '经验增幅和自动点击以外的升级内容失效',
    'The only EXP multipliers that apply are AMP, Challenge boosts, and Helium': '只有以下内容可以加成经验值产量：放大倍率，挑战加成和氦',
    'Challenge VIII': '挑战 VIII',
    'Helium production is disabled': '氦产量暂时归零',
    'Challenge IX': '挑战 IX',
    'Beta Decay': '贝塔衰变',
    'Advanced Auto-Reboot': '高级自动重启',
    'Unlocks Time mode for Auto-Reboot': '解锁自动重启的时间模式',
    'Ease of Completion': '易于完成',
    'You can do multiple completions per Challenge attempt, and completions are given automatically': '进入挑战可以完成多次挑战，并且不需要退出挑战也可以获得完成次数',
    'Speed Power II': '高速之力 II',
    'Auto-Reactor': '自动反应堆',
    'Unlocks automation for Reactor core upgrades': '解锁自动反应堆升级',
    'Quantum Privilege': '量子特惠',
    'Quantize no longer resets Challenge completions': '进行量子化时不再重置挑战完成次数',
    'Helium Avalanche': '氦之崩落',
    'The Snowball Effect perk becomes stronger': '使“滚雪球效应”特权变得更强',
    'Gravity Well': '重力井',
    'Unlocks the Gravity Well': '解锁重力井',
    'Expert Auto-Reboot': '专家自动重启',
    'Unlocks automation for not rebooting (to push levels for gaining photons': '解锁自动停止重启(以推进等级，获得光子',
    'Auto-Quantize': '自动量子化',
    'Unlocks Quantize automation': '解锁自动量子化',
    'Photonic Infusion': '光子灌注',
    'Extended Difficulty': '难度扩展',
    'All challenges can now be completed up to 20 times': '挑战的完成次数上限变为20次',
    'Completions past 12 also give a helium production boost': '超过12次以后，挑战还可以加成氦产量',
    'Atomic Refraction': '原子折射',
    'Open Sesame': '开门魔咒',
    'Hydrogen now no longer requires 98,304 watts to be gained': '不再需要有98304瓦特才能获得氢',
    'Deuterium Power now also boosts 3x instead': '氘供能改为每阶层使氦产量变为3倍',
    'Gravitational Waves': '引力波',
    'Dark matter also boosts helium production at a reduced amount': '暗物质可以加成氦产量，只是倍率降低',
    'Omega Drive': '欧米伽驱动',
    'Unlocks the Omega Drive': '解锁欧米伽驱动',
    'Auto-Collapse': '自动坍缩',
    'Unlocks automation for collapse': '解锁自动坍缩',
    'Advanced Auto-Quantize': '高级自动量子化',
    'Unlocks Step mode for Quantize automation': '解锁自动量子化的倍增模式',
    'Omega Supplement': '欧米伽补充剂',
    'Auto-Growth': '自动增长',
    'Unlocks automation for Growth Factor upgrade': '解锁自动购买增长系数升级',
    'Auto-Prism': '自动棱镜',
    'Unlocks automation for Prism upgrading': '解锁自动升级棱镜',
    'Transfinite Liberty': '超限自由',
    'The penalty for collapse is weaker': '使坍缩的惩罚弱化',
    'The Great Beyond': '登临彼岸',
    'Omega Challenge': '欧米伽挑战',
    'Unlocks the Omega Challenge': '解锁欧米伽挑战',
    //#endregion
    //#region 主要
    'Exported to clipboard': '已导出至剪贴板',
    'Save deleted': '已删除存档',
    'CHANGE': '变更',
    'RECORDING...': '记录中……',
    'Game saved': '游戏已保存',
    //#endregion
}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    ": ": "：",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "：",
    "： ": "：",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    "\n": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?(e[+\-]?\d?\.?\d+)?(e\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\s\d+(e\.\,\d+)?[A-Za-z]{0,4}(.*)$/, //处理数字及单位
    /^\/?\^?\d+[e\.\,\d\/]+$/, //处理数字及单位
    /^[e\.\,\d]+ \+ [e\.\,\d]+$/, //处理数字及单位
    /^(.*)[\u4E00-\u9FFF]+(.*)$/, //不抓取内容
    /^\d+:\d{1,2}:?\d{0,2}$/, //不抓取内容
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^(.+)：EXP button$/, '$1：经验值按钮'],
    [/^(.+)：Prestige$/, '$1：转生'],
    [/^(.+)：Toggle auto-Prestige$/, '$1：切换自动转生状态'],
    [/^(.+)：Reboot$/, '$1：重启'],
    [/^(.+)：Toggle auto-Reboot$/, '$1：切换自动重启状态'],
    [/^(.+)：Quantize$/, '$1：量子化'],
    [/^(.+)：Activate Overclocker$/, '$1：激活经验超频'],
    [/^(.+)：Toggle auto-Overclock$/, '$1：切换自动超频状态'],
    [/^(.+)：Discharge Capacitor$/, '$1：电容放电'],
    [/^(.+)：Toggle auto-Discharge$/, '$1：切换自动放电状态'],
    [/^(.+)：Toggle all automation$/, '$1：切换所有自动化状态'],
    [/^(.+)：Exit Challenge$/, '$1：退出挑战'],
    [/^(.+)：Buy all upgrades \(on upgrades tab$/, '$1：购买所有升级(在升级选项卡下'],
]);