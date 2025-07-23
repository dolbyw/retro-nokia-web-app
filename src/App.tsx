import React, { useEffect } from 'react';
import { useNokiaStore } from './store/useNokiaStore';
import HomeScreen from './components/HomeScreen';
import MainMenu from './components/MainMenu';
import ContactsScreen from './components/ContactsScreen';
import ContactDetailScreen from './components/ContactDetailScreen';
import MessagesScreen from './components/MessagesScreen';
import MessageDetailScreen from './components/MessageDetailScreen';
import GamesScreen from './components/GamesScreen';
import SnakeGame from './components/SnakeGame';
import TetrisGame from './components/TetrisGame';
import SettingsScreen from './components/SettingsScreen';

function App() {
  const { currentScreen, touchBlocked } = useNokiaStore();

  // Control touch events and context menu based on touchBlocked state
  useEffect(() => {
    if (touchBlocked) {
      const disableTouch = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const disableContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      const disableSelection = (e: Event) => {
        e.preventDefault();
      };

      // Add touch event listeners only when touchBlocked is true
      document.addEventListener('touchstart', disableTouch, { passive: false });
      document.addEventListener('touchmove', disableTouch, { passive: false });
      document.addEventListener('touchend', disableTouch, { passive: false });
      document.addEventListener('touchcancel', disableTouch, { passive: false });
      
      // Add context menu and selection listeners only when touchBlocked is true
      document.addEventListener('contextmenu', disableContextMenu);
      document.addEventListener('selectstart', disableSelection);
      document.addEventListener('dragstart', disableSelection);

      // Apply Nokia-style CSS when touchBlocked is true
      document.body.style.userSelect = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      (document.body.style as any).webkitTouchCallout = 'none';
      (document.body.style as any).webkitTapHighlightColor = 'transparent';

      return () => {
        document.removeEventListener('touchstart', disableTouch);
        document.removeEventListener('touchmove', disableTouch);
        document.removeEventListener('touchend', disableTouch);
        document.removeEventListener('touchcancel', disableTouch);
        document.removeEventListener('contextmenu', disableContextMenu);
        document.removeEventListener('selectstart', disableSelection);
        document.removeEventListener('dragstart', disableSelection);
      };
    } else {
      // Restore normal behavior when touchBlocked is false
      document.body.style.userSelect = 'auto';
      (document.body.style as any).webkitUserSelect = 'auto';
      (document.body.style as any).webkitTouchCallout = 'default';
      (document.body.style as any).webkitTapHighlightColor = 'rgba(0,0,0,0.1)';
    }
  }, [touchBlocked]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'menu':
        return <MainMenu />;
      case 'contacts':
        return <ContactsScreen />;
      case 'contact-detail':
        return <ContactDetailScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'message-detail':
        return <MessageDetailScreen />;
      case 'games':
        return <GamesScreen />;
      case 'snake-game':
        return <SnakeGame />;
      case 'tetris-game':
        return <TetrisGame />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div 
      className="w-full h-screen bg-[#9BBB58] overflow-hidden"
      style={{
        touchAction: touchBlocked ? 'none' : 'auto'
      }}
    >
      {/* Nokia Phone Frame */}
      <div className="w-full h-full max-w-md mx-auto bg-[#9BBB58] border-4 border-[#666666] relative">
        {/* Screen */}
        <div className="w-full h-full bg-[#9BBB58] relative overflow-hidden">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default App;
