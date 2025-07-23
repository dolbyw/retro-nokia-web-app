import React, { useState, useEffect } from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useNokiaStore } from '../store/useNokiaStore';

const HomeScreen: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { touchBlocked, setScreen } = useNokiaStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useKeyboardNavigation({
    maxIndex: 1,
    onEnter: () => {
      // Enter key on home screen should open menu
      setScreen('menu');
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    // Map language codes to locale strings
    const localeMap: { [key: string]: string } = {
      'zh-cn': 'zh-CN',
      'zh-tw': 'zh-TW',
      'en': 'en-US',
      'ru': 'ru-RU',
      'ja': 'ja-JP'
    };
    
    const locale = localeMap[currentLanguage] || 'en-US';
    
    return date.toLocaleTimeString(locale, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    // Map language codes to locale strings
    const localeMap: { [key: string]: string } = {
      'zh-cn': 'zh-CN',
      'zh-tw': 'zh-TW',
      'en': 'en-US',
      'ru': 'ru-RU',
      'ja': 'ja-JP'
    };
    
    const locale = localeMap[currentLanguage] || 'en-US';
    
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-2 py-1 text-xs border-b border-[#666666]">
        <div className="flex items-center space-x-1">
          {/* Signal Strength */}
          <div className="flex space-x-px">
            <div className="w-1 h-2 bg-black"></div>
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-1 h-4 bg-black"></div>
            <div className="w-1 h-5 bg-black"></div>
          </div>
        </div>
        
        <div className="text-center font-bold">
          {formatTime(currentTime)}
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Battery */}
          <div className="relative">
            <div className="w-6 h-3 border border-black bg-[#9BBB58]">
              <div className="w-4 h-1 bg-black mt-1 ml-1"></div>
            </div>
            <div className="absolute -right-1 top-1 w-1 h-1 bg-black"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        {/* Nokia Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">NOKIA</div>
          <div className="text-sm">{t.connectingPeople}</div>
        </div>

        {/* Date Display */}
        <div className="text-center mb-8">
          <div className="text-lg font-bold">{formatDate(currentTime)}</div>
        </div>

        {/* Operator Info */}
        <div className="text-center mb-8">
          <div className="text-sm">{t.chinaMobile}</div>
          <div className="flex justify-center items-center mt-1">
            <div className="w-2 h-2 bg-black rounded-full mr-1"></div>
            <span className="text-xs">{t.networkAvailable}</span>
          </div>
        </div>
      </div>

      {/* Bottom Instructions */}
      <div className="px-4 py-3 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.pressMenuToAccess}</div>
          <div>{t.useArrowKeysToNavigate}</div>
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
            setScreen('menu');
          }}
        >
          <div className="font-bold">{t.menu}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            // Exit functionality - could close app or go to home
            // For now, just stay on home screen
          }}
        >
          <div className="font-bold">{t.exit}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;