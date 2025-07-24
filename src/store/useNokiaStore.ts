import { create } from 'zustand';

export type Screen = 'home' | 'menu' | 'contacts' | 'messages' | 'games' | 'settings' | 'contact-detail' | 'message-detail' | 'snake-game' | 'tetris-game';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  contact: string;
  messages: Message[];
  lastMessage: string;
  timestamp: Date;
}

interface NokiaState {
  currentScreen: Screen;
  selectedIndex: number;
  contacts: Contact[];
  conversations: Conversation[];
  selectedContactId: string | null;
  selectedConversationId: string | null;
  snakeScore: number;
  tetrisScore: number;
  gameRunning: boolean;
  touchBlocked: boolean;
  language: string;
  ringtone: string;
  
  // Actions
  setScreen: (screen: Screen) => void;
  setSelectedIndex: (index: number) => void;
  selectContact: (contactId: string) => void;
  selectConversation: (conversationId: string) => void;
  setSnakeScore: (score: number) => void;
  setTetrisScore: (score: number) => void;
  setGameRunning: (running: boolean) => void;
  setTouchBlocked: (blocked: boolean) => void;
  setLanguage: (language: string) => void;
  setRingtone: (ringtone: string) => void;
  goBack: () => void;
  
  // Contact actions
  addContact: (name: string, phone: string) => void;
  deleteContact: (contactId: string) => void;
  
  // Message actions
  sendMessage: (conversationId: string, content: string) => void;
  createConversation: (contactName: string) => string;
  deleteConversation: (conversationId: string) => void;
}

const mockContacts: Contact[] = [
  { id: '1', name: '张小明', phone: '13800138001' },
  { id: '2', name: '李小红', phone: '13800138002' },
  { id: '3', name: '王大伟', phone: '13800138003' },
  { id: '4', name: '刘小芳', phone: '13800138004' },
  { id: '5', name: '陈小华', phone: '13800138005' },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: '张小明',
    lastMessage: '你好！最近怎么样？',
    timestamp: new Date(Date.now() - 3600000),
    messages: [
      { id: '1', sender: '张小明', content: '你好！最近怎么样？', timestamp: new Date(Date.now() - 3600000), isOwn: false },
      { id: '2', sender: '我', content: '我很好，谢谢！', timestamp: new Date(Date.now() - 3000000), isOwn: true },
    ]
  },
  {
    id: '2',
    contact: '李小红',
    lastMessage: '明天见',
    timestamp: new Date(Date.now() - 7200000),
    messages: [
      { id: '3', sender: '李小红', content: '我们明天还是约在老地方见面吗？', timestamp: new Date(Date.now() - 7200000), isOwn: false },
      { id: '4', sender: '我', content: '好的，明天见', timestamp: new Date(Date.now() - 6600000), isOwn: true },
    ]
  },
  {
    id: '3',
    contact: '王大伟',
    lastMessage: '周末一起吃饭吧',
    timestamp: new Date(Date.now() - 86400000),
    messages: [
      { id: '5', sender: '王大伟', content: '周末一起吃饭吧，好久没见了', timestamp: new Date(Date.now() - 86400000), isOwn: false },
    ]
  },
];

export const useNokiaStore = create<NokiaState>((set, get) => ({
  currentScreen: 'home',
  selectedIndex: 0,
  contacts: mockContacts,
  conversations: mockConversations,
  selectedContactId: null,
  selectedConversationId: null,
  snakeScore: 0,
  tetrisScore: 0,
  gameRunning: false,
  touchBlocked: false, // Default to allow touch for better user experience
  language: 'en',
  ringtone: 'nokia', // Default to Nokia tune

  setScreen: (screen) => set({ currentScreen: screen, selectedIndex: 0 }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  selectContact: (contactId) => set({ selectedContactId: contactId }),
  selectConversation: (conversationId) => set({ selectedConversationId: conversationId }),
  setSnakeScore: (score) => set({ snakeScore: score }),
  setTetrisScore: (score) => set({ tetrisScore: score }),
  setGameRunning: (running) => set({ gameRunning: running }),
  setTouchBlocked: (blocked) => set({ touchBlocked: blocked }),
  setLanguage: (language) => set({ language: language }),
  setRingtone: (ringtone) => set({ ringtone: ringtone }),
  
  // Contact actions
  addContact: (name, phone) => set((state) => ({
    contacts: [...state.contacts, {
      id: Date.now().toString(),
      name,
      phone
    }]
  })),
  
  deleteContact: (contactId) => set((state) => ({
    contacts: state.contacts.filter(contact => contact.id !== contactId),
    conversations: state.conversations.filter(conv => {
      const contact = state.contacts.find(c => c.id === contactId);
      return contact ? conv.contact !== contact.name : true;
    })
  })),
  
  // Message actions
  sendMessage: (conversationId, content) => set((state) => {
    const conversations = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: '我',
          content,
          timestamp: new Date(),
          isOwn: true
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: content,
          timestamp: new Date()
        };
      }
      return conv;
    });
    return { conversations };
  }),
  
  createConversation: (contactName) => {
    const newConversationId = Date.now().toString();
    set((state) => ({
      conversations: [...state.conversations, {
        id: newConversationId,
        contact: contactName,
        messages: [],
        lastMessage: '',
        timestamp: new Date()
      }]
    }));
    return newConversationId;
  },
  
  deleteConversation: (conversationId) => set((state) => ({
    conversations: state.conversations.filter(conv => conv.id !== conversationId)
  })),
  
  goBack: () => {
    const { currentScreen } = get();
    switch (currentScreen) {
      case 'contact-detail':
        set({ currentScreen: 'contacts', selectedContactId: null });
        break;
      case 'message-detail':
        set({ currentScreen: 'messages', selectedConversationId: null });
        break;
      case 'snake-game':
      case 'tetris-game':
        set({ currentScreen: 'games', gameRunning: false });
        break;
      case 'contacts':
      case 'messages':
      case 'games':
      case 'settings':
        set({ currentScreen: 'menu' });
        break;
      case 'menu':
        set({ currentScreen: 'home' });
        break;
      default:
        break;
    }
  },
}));