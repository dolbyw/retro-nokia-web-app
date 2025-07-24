import React, { useState, useEffect } from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useNokiaStore } from '../store/useNokiaStore';
import { getLanguageDisplayName, supportedLanguages } from '../locales';
import { ringtoneManager } from '../utils/ringtoneManager';

interface SettingItem {
  id: string;
  name: string;
  type: 'toggle' | 'select' | 'info';
  value: string | boolean;
  options?: string[];
}

const SettingsScreen: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { touchBlocked, setTouchBlocked, language, setLanguage, setScreen, ringtone, setRingtone } = useNokiaStore();
  
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [isPlayingRingtone, setIsPlayingRingtone] = useState(false);

  // 初始化铃声管理器
  useEffect(() => {
    ringtoneManager.initialize();
  }, []);
  
  useEffect(() => {
    // 铃声选项映射
    const ringtoneMap: { [key: string]: string } = {
      'nokia': t.nokiaTune,
      'beep': t.beep,
      'silent': t.silent
    };

    const newSettings: SettingItem[] = [
      {
        id: 'ringtone',
        name: t.ringtone,
        type: 'select',
        value: ringtoneMap[ringtone] || t.nokiaTune,
        options: [t.nokiaTune, t.beep, t.silent]
      },
      {
        id: 'vibration',
        name: t.vibration,
        type: 'toggle',
        value: true
      },
      {
        id: 'backlight',
        name: t.backlightTime,
        type: 'select',
        value: t.seconds15,
        options: [t.seconds5, t.seconds15, t.seconds30, t.alwaysOn]
      },
      {
        id: 'contrast',
        name: t.displayContrast,
        type: 'select',
        value: t.normal,
        options: [t.low, t.normal, t.high]
      },
      {
        id: 'touchBlocking',
        name: t.touchBlocking,
        type: 'toggle',
        value: touchBlocked
      },
      {
        id: 'language',
        name: t.language,
        type: 'select',
        value: getLanguageDisplayName(currentLanguage),
        options: supportedLanguages.map(lang => getLanguageDisplayName(lang))
      },
      {
        id: 'about',
        name: t.about,
        type: 'info',
        value: 'Nokia 3310 v2.0'
      }
    ];
    setSettings(newSettings);
  }, [t, touchBlocked, currentLanguage, ringtone]);

  const handleSettingClick = async (index: number) => {
    if (touchBlocked) return;
    
    const setting = settings[index];
    if (setting.type === 'toggle') {
      toggleSetting(setting.id);
    } else if (setting.type === 'select') {
      await cycleSetting(setting.id);
    }
  };

  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: settings.length,
    onEnter: async () => {
      const setting = settings[selectedIndex];
      if (setting.type === 'toggle') {
        toggleSetting(setting.id);
      } else if (setting.type === 'select') {
        await cycleSetting(setting.id);
      }
    }
  });

  const toggleSetting = (id: string) => {
    if (id === 'touchBlocking') {
      setTouchBlocked(!touchBlocked);
    } else {
      setSettings(prev => prev.map(setting => 
        setting.id === id 
          ? { ...setting, value: !setting.value }
          : setting
      ));
    }
  };

  const cycleSetting = async (id: string) => {
    if (id === 'language') {
      const currentIndex = supportedLanguages.indexOf(currentLanguage);
      const nextIndex = (currentIndex + 1) % supportedLanguages.length;
      const newLanguage = supportedLanguages[nextIndex];
      changeLanguage(newLanguage);
      setLanguage(newLanguage);
    } else if (id === 'ringtone') {
      // 铃声选项循环
      const ringtoneIds = ['nokia', 'beep', 'silent'];
      const currentIndex = ringtoneIds.indexOf(ringtone);
      const nextIndex = (currentIndex + 1) % ringtoneIds.length;
      const newRingtone = ringtoneIds[nextIndex];
      
      setRingtone(newRingtone);
      
      // 预览新铃声
      if (newRingtone !== 'silent') {
        setIsPlayingRingtone(true);
        try {
          await ringtoneManager.previewRingtone(newRingtone);
        } catch (error) {
          console.warn('Failed to preview ringtone:', error);
        } finally {
          setTimeout(() => setIsPlayingRingtone(false), 2000);
        }
      }
    } else {
      setSettings(prev => prev.map(setting => {
        if (setting.id === id && setting.options) {
          const currentIndex = setting.options.indexOf(setting.value as string);
          const nextIndex = (currentIndex + 1) % setting.options.length;
          return { ...setting, value: setting.options[nextIndex] };
        }
        return setting;
      }));
    }
  };

  const renderValue = (setting: SettingItem) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center">
            <div className={`w-8 h-4 border border-black relative ${
              setting.value ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
            }`}>
              <div className={`w-3 h-3 bg-black absolute top-0.5 transition-all ${
                setting.value ? 'right-0.5' : 'left-0.5'
              }`} />
            </div>
            <span className="ml-2 text-xs">
              {setting.value ? t.on : t.off}
            </span>
          </div>
        );
      case 'select':
        return (
          <div className="flex items-center">
            <div className="text-sm">
              {setting.value as string}
            </div>
            {setting.id === 'ringtone' && isPlayingRingtone && (
              <div className="ml-2 text-xs animate-pulse">
                ♪
              </div>
            )}
          </div>
        );
      case 'info':
        return (
          <div className="text-sm opacity-75">
            {setting.value as string}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.settingsTitle}</div>
        <div className="text-xs mt-1">{t.configureDevice}</div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {settings.map((setting, index) => (
            <div
              key={setting.id}
              className={`
                px-4 py-3 border-b border-[#666666]
                ${selectedIndex === index ? 'bg-[#7A9B42]' : 'bg-[#9BBB58]'}
                ${setting.type !== 'info' ? 'cursor-pointer' : ''}
                ${!touchBlocked && setting.type !== 'info' ? 'hover:bg-[#7A9B42]' : ''}
                transition-colors duration-150
              `}
              onClick={() => handleSettingClick(index)}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-bold text-sm">{setting.name}</div>
                  {setting.type === 'info' && (
                    <div className="text-xs mt-1 opacity-75">
                      {t.deviceInfo}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex items-center">
                  {renderValue(setting)}
                  {selectedIndex === index && setting.type !== 'info' && (
                    <span className="ml-2">►</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Info */}
      <div className="px-4 py-3 border-t border-[#666666] bg-[#AACCAA]">
        <div className="text-center text-xs space-y-1">
          <div className="font-bold">Nokia 3310 Retro</div>
          <div>{t.softwareVersion}: 2.0.1</div>
          <div>{t.memory}: 16MB {t.available}</div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.useArrowKeys}</div>
          <div>{t.pressEnterToChange}</div>
        </div>
      </div>

      {/* Soft Keys */}
      <div className="flex justify-between px-4 py-2 text-xs border-t border-[#666666]">
        <div 
          className={`text-left cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={async () => {
            if (touchBlocked) return;
            // Simulate Enter key press
            const setting = settings[selectedIndex];
            if (setting.type === 'toggle') {
              toggleSetting(setting.id);
            } else if (setting.type === 'select') {
              await cycleSetting(setting.id);
            }
          }}
        >
          <div className="font-bold">{t.change}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('menu');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;