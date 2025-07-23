# Nokia 3310 复古按键机 UI 网页应用

一个完全复刻 Nokia 3310 经典界面的网页应用，支持纯键盘导航，完美还原复古按键机体验。
---代码完全由TRAE IDE 编写---

## ✨ 项目特色

- 🎯 **完全复刻 Nokia 3310 界面** - 像素级还原经典 UI 设计，包括经典的单色LCD显示效果
- ⌨️ **纯键盘导航** - 支持方向键、回车键、ESC键等经典按键操作，完美模拟按键机体验
- 📱 **移动端优化** - 完美适配手机屏幕，支持触摸操作和虚拟按键
- 🌐 **离线支持** - PWA 应用，可离线使用，支持添加到主屏幕
- 🎮 **内置游戏** - 经典贪吃蛇和俄罗斯方块游戏，完全复刻原版游戏体验
- 🌍 **多语言支持** - 支持简体中文、繁体中文、英文、俄文、日文等多种语言
- 📞 **通讯录管理** - 添加、查看、删除联系人，支持电话号码管理
- 💬 **短信功能** - 模拟短信收发体验，支持对话管理
- ⚙️ **系统设置** - 铃声、背光、对比度、语言等个性化设置
- 🎨 **复古视觉效果** - 经典绿色背光、像素字体、单色显示效果

## 📱 界面截图

### 主界面
<img width="334" height="508" alt="{15277818-6D27-425A-8846-5EA237B91482}" src="https://github.com/user-attachments/assets/d17ab304-1dcc-4441-8f80-92911b572c84" />


经典的Nokia开机界面，显示运营商信息、信号强度、电池电量和当前时间日期。

### 主菜单
<img width="335" height="507" alt="{A656D57F-CDEC-46E1-9EA8-35E1A10B92FB}" src="https://github.com/user-attachments/assets/e09a5e34-861c-4e84-8e30-52bbc08708b3" />


包含通讯录、短信、游戏、设置等经典功能模块的主菜单界面。

### 游戏界面


<img width="335" height="506" alt="{4D6192D5-EFD0-4300-934C-DF49B65434D9}" src="https://github.com/user-attachments/assets/4324d300-7bf4-4d9f-85ba-4b8ab08d694f" />

完全复刻的俄罗斯方块游戏，包含得分显示、下一个方块预览等经典元素。



<img width="334" height="506" alt="{EBF3E926-9FAE-4901-B370-4BE2020FB45B}" src="https://github.com/user-attachments/assets/a6641ff4-6b3a-4491-a5a3-3e54a1e0d4bd" />

经典贪吃蛇游戏，保持原版的游戏机制和视觉效果。

### 通讯录界面
<img width="335" height="506" alt="{8EA88E05-0356-4219-9E87-2CC5D1C8EFA4}" src="https://github.com/user-attachments/assets/f7e8d988-4eb4-4481-baa1-4c64aa51cb99" />

支持添加、查看、删除联系人的通讯录管理界面。

### 短信界面
<img width="335" height="509" alt="{1F04D18C-3EA9-42F5-80D2-5AD085E9EE8C}" src="https://github.com/user-attachments/assets/3263df98-b439-4777-b31e-1dd6e97b7ab0" />

模拟短信收发功能，支持对话管理和消息编写。

### 设置界面
<img width="335" height="509" alt="{67CE121D-6C89-4AF6-812A-027223F827D1}" src="https://github.com/user-attachments/assets/23b41c7a-72fd-410a-980f-7fa41808a3c8" />


包含铃声、背光、对比度、语言等个性化设置选项。

## 🎮 操作指南

### 基本导航
- **方向键 (↑↓←→)** - 在菜单中导航
- **Enter键** - 确认选择
- **ESC键** - 返回上级菜单
- **M键** - 快速打开主菜单

### 游戏控制
- **贪吃蛇游戏**：方向键控制移动方向，Enter键暂停/继续
- **俄罗斯方块**：方向键移动，上键旋转，空格键快速下降，Enter键暂停/继续

### 文本输入
- **字母键** - 直接输入文字
- **数字键** - 输入数字
- **Delete键** - 删除字符
- **Enter键** - 确认输入

### 功能模块
1. **主屏幕** - 显示时间、信号、电池状态
2. **通讯录** - 查看联系人信息
3. **短信** - 查看消息对话
4. **游戏中心** - 玩经典贪吃蛇游戏
5. **设置** - 调整系统设置

## 🛠️ 技术栈

### 核心技术
- **前端框架**: React 18 + TypeScript - 现代化的组件开发
- **构建工具**: Vite - 快速的开发构建体验
- **样式方案**: Tailwind CSS - 原子化CSS框架
- **状态管理**: Zustand - 轻量级状态管理
- **PWA支持**: Vite PWA Plugin - 离线应用支持

### 开发工具
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript 严格模式
- **包管理**: pnpm - 高效的包管理工具

### 特色功能实现
- **键盘导航**: 自定义 Hook 实现完整的键盘事件处理
- **国际化**: 支持 5 种语言的完整翻译系统
- **游戏引擎**: 纯 JavaScript 实现的贪吃蛇和俄罗斯方块
- **复古UI**: CSS 实现的像素级 Nokia 3310 界面还原
- **响应式设计**: 适配桌面端和移动端的完美体验

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📱 移动端使用

1. 在安卓手机浏览器中打开应用
2. 点击浏览器菜单中的"添加到主屏幕"
3. 应用将作为PWA安装到手机上
4. 支持离线使用，无需网络连接

## 🎨 设计特色

- **经典Nokia绿色** (#9BBB58) 作为主色调
- **像素化字体** - 模拟LCD显示效果
- **简洁边框** - 还原按键机界面风格
- **网格布局** - 经典九宫格菜单设计

## 🎮 游戏功能

### 贪吃蛇游戏
- 使用方向键控制蛇的移动
- 吃食物增长身体和分数
- 撞墙或撞到自己游戏结束
- 自动保存最高分记录

## 📁 项目结构

```
src/
├── components/                 # React组件
│   ├── HomeScreen.tsx         # 主屏幕 - Nokia开机界面
│   ├── MainMenu.tsx           # 主菜单 - 四大功能模块
│   ├── GamesScreen.tsx        # 游戏选择界面
│   ├── SnakeGame.tsx          # 贪吃蛇游戏组件
│   ├── TetrisGame.tsx         # 俄罗斯方块游戏组件
│   ├── ContactsScreen.tsx     # 通讯录管理界面
│   ├── ContactDetailScreen.tsx # 联系人详情界面
│   ├── MessagesScreen.tsx     # 短信列表界面
│   ├── MessageDetailScreen.tsx # 短信详情界面
│   ├── SettingsScreen.tsx     # 系统设置界面
│   └── Empty.tsx              # 空状态组件
├── hooks/                      # 自定义Hooks
│   ├── useKeyboardNavigation.ts # 键盘导航逻辑
│   ├── useLanguage.ts         # 多语言支持
│   └── useTheme.ts            # 主题管理
├── store/                      # 状态管理
│   └── useNokiaStore.ts       # 全局状态管理
├── locales/                    # 国际化文件
│   └── index.ts               # 多语言翻译配置
├── lib/                        # 工具函数
│   └── utils.ts               # 通用工具函数
├── pages/                      # 页面组件
│   └── Home.tsx               # 主页面容器
└── assets/                     # 静态资源
    └── react.svg              # 图标资源
```

## 🌟 核心功能详解

### 🎮 游戏系统
- **贪吃蛇游戏**
  - 完全复刻Nokia 3310原版游戏机制
  - 支持暂停/继续功能
  - 实时得分统计和最高分记录
  - 经典的像素风格和音效模拟

- **俄罗斯方块游戏**
  - 7种经典方块形状（I、O、T、S、Z、J、L）
  - 完整的旋转和移动机制
  - 消行动画和得分系统
  - 难度递增和速度调节
  - 下一个方块预览功能

### 📞 通讯录系统
- 联系人增删改查功能
- 支持姓名和电话号码管理
- 按字母顺序排序显示
- 联系人详情查看界面
- 数据持久化存储

### 💬 短信系统
- 模拟短信收发体验
- 对话列表管理
- 消息编写和发送
- 时间戳显示
- 对话删除功能

### ⚙️ 设置系统
- **铃声设置**: Nokia铃声、蜂鸣、静音
- **背光设置**: 5秒、15秒、30秒、常亮
- **对比度设置**: 低、中、正常、高
- **语言设置**: 5种语言切换
- **触摸屏蔽**: 纯键盘模式切换
- **设备信息**: 软件版本、内存信息

### 🌍 国际化支持
- **简体中文** (zh-CN)
- **繁体中文** (zh-TW) 
- **英文** (en)
- **俄文** (ru)
- **日文** (ja)

每种语言都包含完整的界面翻译，包括菜单、按钮、提示信息、游戏界面等。

## 🔧 自定义配置

### 添加新语言
```typescript
// src/locales/index.ts
export const translations: Record<string, Translations> = {
  'your-lang': {
    // 添加你的语言翻译
  }
}
```

### 修改默认设置
```typescript
// src/store/useNokiaStore.ts
const useNokiaStore = create<NokiaState>((set, get) => ({
  // 修改默认配置
  settings: {
    ringtone: 'nokiaTune',
    vibration: true,
    // ...
  }
}))
```

### 自定义主题
```css
/* src/index.css */
:root {
  --nokia-bg: #9bb53a; /* 修改背景色 */
  --nokia-text: #000;  /* 修改文字色 */
}
```

## 🚀 部署指南

### Vercel 部署
```bash
npm i -g vercel
vercel --prod
```

### Netlify 部署
```bash
npm run build
# 上传 dist 文件夹到 Netlify
```

### GitHub Pages 部署
```bash
npm run build
npm run deploy
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. **Fork** 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 **Pull Request**

### 贡献类型
- 🐛 **Bug修复** - 修复现有功能问题
- ✨ **新功能** - 添加新的功能特性
- 📝 **文档改进** - 完善项目文档
- 🌍 **国际化** - 添加新的语言支持
- 🎨 **UI优化** - 改进用户界面体验
- ⚡ **性能优化** - 提升应用性能

### 开发规范
- 遵循 ESLint 和 Prettier 代码规范
- 提交信息使用 [Conventional Commits](https://conventionalcommits.org/) 格式
- 新功能需要添加相应的测试用例
- 确保所有测试通过后再提交

---

**享受复古的Nokia体验！** 📱✨

如果这个项目对你有帮助，请给我们一个 ⭐ Star！
