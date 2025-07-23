import React from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useNokiaStore } from '../store/useNokiaStore';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

const MainMenu: React.FC = () => {
  const { t } = useLanguage();
  const { touchBlocked, setScreen } = useNokiaStore();
  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: 9,
    onEnter: () => {
      const item = menuItems[selectedIndex];
      if (item && item.name) {
        switch (item.id) {
          case 'contacts':
            setScreen('contacts');
            break;
          case 'messages':
            setScreen('messages');
            break;
          case 'games':
            setScreen('games');
            break;
          case 'settings':
            setScreen('settings');
            break;
        }
      }
    }
  });

  const handleItemClick = (item: MenuItem, index: number) => {
    if (touchBlocked || !item.name) return;
    
    // Same logic as keyboard navigation
    switch (item.id) {
      case 'contacts':
        setScreen('contacts');
        break;
      case 'messages':
        setScreen('messages');
        break;
      case 'games':
        setScreen('games');
        break;
      case 'settings':
        setScreen('settings');
        break;
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'contacts', name: t.contacts, icon: '👤' },
    { id: 'messages', name: t.messages, icon: '💬' },
    { id: 'games', name: t.games, icon: '🎮' },
    { id: 'settings', name: t.settings, icon: '⚙️' },
    { id: 'empty1', name: '', icon: '' },
    { id: 'empty2', name: '', icon: '' },
    { id: 'empty3', name: '', icon: '' },
    { id: 'empty4', name: '', icon: '' },
    { id: 'empty5', name: '', icon: '' },
  ];

  const renderPixelIcon = (type: string) => {
    switch (type) {
      case '👤': // Contacts
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="9" y="3" width="6" height="6" />
              <rect x="6" y="12" width="12" height="9" />
            </svg>
          </div>
        );
      case '💬': // Messages
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="3" y="6" width="18" height="12" />
              <rect x="9" y="18" width="3" height="3" />
            </svg>
          </div>
        );
      case '🎮': // Games
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="3" y="9" width="18" height="6" />
              <rect x="6" y="6" width="3" height="3" />
              <rect x="15" y="6" width="3" height="3" />
              <rect x="6" y="18" width="3" height="3" />
              <rect x="15" y="18" width="3" height="3" />
            </svg>
          </div>
        );
      case '⚙️': // Settings
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
              <rect x="9" y="9" width="6" height="6" />
              <rect x="10.5" y="3" width="3" height="6" />
              <rect x="10.5" y="15" width="3" height="6" />
              <rect x="3" y="10.5" width="6" height="3" />
              <rect x="15" y="10.5" width="6" height="3" />
            </svg>
          </div>
        );
      default:
        return <div className="w-12 h-12"></div>;
    }
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-xl font-bold">{t.menu}</div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex flex-col items-center justify-center
                border-2 border-[#666666]
                min-h-[80px]
                ${selectedIndex === index ? 'bg-[#7A9B42] border-black' : 'bg-[#9BBB58]'}
                ${item.name ? 'cursor-pointer' : ''}
                ${!touchBlocked && item.name ? 'hover:bg-[#7A9B42]' : ''}
                transition-colors duration-150
              `}
              onClick={() => handleItemClick(item, index)}
            >
              {item.icon && (
                <>
                  <div className="mb-3">
                    {renderPixelIcon(item.icon)}
                  </div>
                  <div className="text-sm text-center font-bold px-1">
                    {item.name}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.useArrowKeysToNavigate}</div>
          <div>{t.pressEnterToSelect}</div>
        </div>
      </div>

      {/* Soft Keys */}
      <div className="flex justify-between px-4 py-2 text-xs border-t border-[#666666]">
        <div 
          className={`text-left cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            // Simulate Enter key press
            const menuItems = ['contacts', 'messages', 'games', 'settings'];
            const selectedItem = menuItems[selectedIndex];
            if (selectedItem && selectedIndex < 4) {
              setScreen(selectedItem as any);
            }
          }}
        >
          <div className="font-bold">{t.select}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('home');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;