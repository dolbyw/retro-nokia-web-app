import { useEffect } from 'react';
import { useNokiaStore, Screen } from '../store/useNokiaStore';

interface NavigationConfig {
  maxIndex: number;
  onEnter?: () => void;
  onBack?: () => void;
  onDelete?: () => void;
  customHandlers?: {
    [key: string]: () => void;
  };
}

export const useKeyboardNavigation = (config: NavigationConfig) => {
  const { 
    selectedIndex, 
    setSelectedIndex, 
    currentScreen, 
    setScreen, 
    goBack,
    contacts,
    conversations,
    selectContact,
    selectConversation
  } = useNokiaStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent default browser behavior
      event.preventDefault();
      
      const { key } = event;
      
      // Custom handlers first
      if (config.customHandlers && config.customHandlers[key]) {
        config.customHandlers[key]();
        return;
      }
      
      switch (key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
          break;
          
        case 'ArrowDown':
        case 's':
        case 'S':
          if (selectedIndex < config.maxIndex - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
          break;
          
        case 'ArrowLeft':
        case 'a':
        case 'A':
          // For menu navigation (3x3 grid)
          if (currentScreen === 'menu') {
            const newIndex = selectedIndex - 1;
            if (newIndex >= 0 && Math.floor(newIndex / 3) === Math.floor(selectedIndex / 3)) {
              setSelectedIndex(newIndex);
            }
          }
          break;
          
        case 'ArrowRight':
        case 'd':
        case 'D':
          // For menu navigation (3x3 grid)
          if (currentScreen === 'menu') {
            const newIndex = selectedIndex + 1;
            if (newIndex < 9 && Math.floor(newIndex / 3) === Math.floor(selectedIndex / 3)) {
              setSelectedIndex(newIndex);
            }
          }
          break;
          
        case 'Enter':
        case ' ':
          if (config.onEnter) {
            config.onEnter();
          } else {
            handleDefaultEnter();
          }
          break;
          
        case 'Escape':
        case 'Backspace':
          if (config.onBack) {
            config.onBack();
          } else {
            goBack();
          }
          break;
          
        case 'Delete':
          if (config.onDelete) {
            config.onDelete();
          }
          break;
          
        // Menu shortcut
        case 'm':
        case 'M':
          if (currentScreen === 'home') {
            setScreen('menu');
          }
          break;
      }
    };
    
    const handleDefaultEnter = () => {
      switch (currentScreen) {
        case 'home':
          setScreen('menu');
          break;
          
        case 'menu':
          const menuItems: Screen[] = ['contacts', 'messages', 'games', 'settings', 'home', 'home', 'home', 'home', 'home'];
          const targetScreen = menuItems[selectedIndex];
          if (targetScreen && targetScreen !== 'home') {
            setScreen(targetScreen);
          }
          break;
          
        case 'contacts':
          if (contacts[selectedIndex]) {
            selectContact(contacts[selectedIndex].id);
            setScreen('contact-detail');
          }
          break;
          
        case 'messages':
          if (conversations[selectedIndex]) {
            selectConversation(conversations[selectedIndex].id);
            setScreen('message-detail');
          }
          break;
          
        case 'games':
          if (selectedIndex === 0) {
            setScreen('snake-game');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedIndex, currentScreen, config, contacts, conversations]);

  return { selectedIndex };
};