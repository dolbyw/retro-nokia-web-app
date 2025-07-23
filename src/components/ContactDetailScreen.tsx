import React from 'react';
import { useNokiaStore } from '../store/useNokiaStore';
import { useLanguage } from '../hooks/useLanguage';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const ContactDetailScreen: React.FC = () => {
  const { selectedContactId, contacts, touchBlocked, setScreen } = useNokiaStore();
  const { t } = useLanguage();
  
  useKeyboardNavigation({
    maxIndex: 1,
  });
  
  const contact = contacts.find(c => c.id === selectedContactId);
  
  if (!contact) {
    return (
      <div className="h-full bg-[#9BBB58] text-black font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold mb-2">{t.contactNotFound}</div>
          <div className="text-xs">{t.pressEscToGoBack}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.contactDetails}</div>
      </div>

      {/* Contact Info */}
      <div className="flex-1 p-4">
        <div className="space-y-6">
          {/* Avatar */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto border-2 border-black bg-[#7A9B42] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" className="fill-black">
                <rect x="12" y="8" width="8" height="8" />
                <rect x="8" y="20" width="16" height="8" />
              </svg>
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <div className="text-xl font-bold mb-2">{contact.name}</div>
          </div>

          {/* Phone Number */}
          <div className="border border-[#666666] p-3">
            <div className="text-xs font-bold mb-1">{t.phoneNumber}</div>
            <div className="text-lg font-mono">{contact.phone}</div>
          </div>

          {/* Additional Info */}
          <div className="border border-[#666666] p-3">
            <div className="text-xs font-bold mb-1">{t.type}</div>
            <div className="text-sm">{t.mobile}</div>
          </div>

          <div className="border border-[#666666] p-3">
            <div className="text-xs font-bold mb-1">{t.status}</div>
            <div className="text-sm flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              {t.available}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.pressEscToGoBack}</div>
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
            // Simulate call action
            alert(`${t.calling || '正在拨打'} ${contact.name} (${contact.phone})`);
          }}
        >
          <div className="font-bold">{t.call}</div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('contacts');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailScreen;