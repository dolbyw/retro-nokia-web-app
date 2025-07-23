import React, { useState } from 'react';
import { useNokiaStore } from '../store/useNokiaStore';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';

const MessagesScreen: React.FC = () => {
  const { conversations, contacts, createConversation, deleteConversation, selectConversation, setScreen, touchBlocked } = useNokiaStore();
  const { t, currentLanguage } = useLanguage();
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const menuItems = showNewConversation ? contacts.map((_, i) => `contact-${i}`) :
                   showDeleteConfirm ? ['confirm', 'cancel'] :
                   [...conversations.map((_, i) => `conversation-${i}`), 'new'];
  
  const handleItemClick = (index: number) => {
    if (touchBlocked) return;
    
    if (showNewConversation) {
      if (index < contacts.length) {
        const contact = contacts[index];
        const conversationId = createConversation(contact.name);
        selectConversation(conversationId);
        setScreen('message-detail');
        setShowNewConversation(false);
      }
    } else if (showDeleteConfirm) {
      if (index === 0) { // confirm
        const conversationIndex = Math.floor(index / 1);
        if (conversations[conversationIndex]) {
          deleteConversation(conversations[conversationIndex].id);
        }
        setShowDeleteConfirm(false);
      } else { // cancel
        setShowDeleteConfirm(false);
      }
    } else {
      if (index < conversations.length) {
        selectConversation(conversations[index].id);
        setScreen('message-detail');
      } else {
        setShowNewConversation(true);
      }
    }
  };

  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: menuItems.length,
    onEnter: () => {
      if (showNewConversation) {
        if (selectedIndex < contacts.length) {
          const contact = contacts[selectedIndex];
          const conversationId = createConversation(contact.name);
          selectConversation(conversationId);
          setScreen('message-detail');
          setShowNewConversation(false);
        }
      } else if (showDeleteConfirm) {
        if (selectedIndex === 0) { // confirm
          const conversationIndex = Math.floor(selectedIndex / 1);
          if (conversations[conversationIndex]) {
            deleteConversation(conversations[conversationIndex].id);
          }
          setShowDeleteConfirm(false);
        } else { // cancel
          setShowDeleteConfirm(false);
        }
      } else {
        if (selectedIndex < conversations.length) {
          selectConversation(conversations[selectedIndex].id);
          setScreen('message-detail');
        } else {
          setShowNewConversation(true);
        }
      }
    },
    onDelete: () => {
      if (!showNewConversation && !showDeleteConfirm && selectedIndex < conversations.length) {
        setShowDeleteConfirm(true);
      }
    },
    onBack: () => {
      if (showNewConversation) {
        setShowNewConversation(false);
      } else if (showDeleteConfirm) {
        setShowDeleteConfirm(false);
      } else {
        setScreen('menu');
      }
    }
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return t.now || '刚刚';
    } else if (diffHours < 24) {
      return `${diffHours}${t.hoursAgo || '小时前'}`;
    } else {
      const localeMap: { [key: string]: string } = {
        'zh-CN': 'zh-CN',
        'zh-TW': 'zh-TW',
        'en': 'en-US',
        'ru': 'ru-RU',
        'ja': 'ja-JP'
      };
      const locale = localeMap[currentLanguage] || 'en-US';
      return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
    }
  };
  
  if (showNewConversation) {
    return (
      <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
        {/* Header */}
        <div className="text-center py-3 border-b border-[#666666]">
          <div className="text-lg font-bold">{t.newConversation || '新建对话'}</div>
          <div className="text-xs mt-1">{t.selectContact || '选择联系人'}</div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {contacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`
                  px-4 py-3 border-b border-[#666666] cursor-pointer
                  ${selectedIndex === index ? 'bg-[#7A9B42]' : 'bg-[#9BBB58]'}
                  ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}
                  transition-colors duration-150
                `}
                onClick={() => handleItemClick(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-bold text-sm">{contact.name}</div>
                    <div className="text-xs mt-1">{contact.phone}</div>
                  </div>
                  <div className="text-xs">
                    {selectedIndex === index ? '►' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
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
              // Simulate Enter key press for new conversation
              if (selectedIndex < contacts.length) {
                const contact = contacts[selectedIndex];
                const conversationId = createConversation(contact.name);
                selectConversation(conversationId);
                setScreen('message-detail');
                setShowNewConversation(false);
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
              setShowNewConversation(false);
            }}
          >
            <div className="font-bold">{t.back}</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (showDeleteConfirm) {
    return (
      <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
        {/* Header */}
        <div className="text-center py-3 border-b border-[#666666]">
          <div className="text-lg font-bold">{t.deleteConversation || '删除对话'}</div>
        </div>

        {/* Confirm Dialog */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="text-sm">{t.confirmDelete || '确定要删除这个对话吗？'}</div>
            
            <div className="flex space-x-2">
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 0 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleItemClick(0)}
              >
                <div className="text-sm font-bold">{t.confirm || '确定'}</div>
              </div>
              
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 1 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleItemClick(1)}
              >
                <div className="text-sm font-bold">{t.cancel || '取消'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{t.messagesTitle}</div>
        <div className="text-xs mt-1">{conversations.length} {t.conversations}</div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {conversations.map((conversation, index) => (
            <div
              key={conversation.id}
              className={`
                px-4 py-3 border-b border-[#666666] cursor-pointer
                ${selectedIndex === index ? 'bg-[#7A9B42]' : 'bg-[#9BBB58]'}
                ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}
                transition-colors duration-150
              `}
              onClick={() => handleItemClick(index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-sm truncate">{conversation.contact}</div>
                    <div className="text-xs ml-2 flex-shrink-0">
                      {formatTime(conversation.timestamp)}
                    </div>
                  </div>
                  <div className="text-xs truncate text-gray-800">
                    {conversation.lastMessage || t.noMessages}
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  {selectedIndex === index ? '►' : ''}
                </div>
              </div>
            </div>
          ))}
          
          {/* New Conversation Option */}
          <div
            className={`
              px-4 py-3 border-b border-[#666666] cursor-pointer
              ${selectedIndex === conversations.length ? 'bg-[#7A9B42]' : 'bg-[#9BBB58]'}
              ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}
              transition-colors duration-150
            `}
            onClick={() => handleItemClick(conversations.length)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-bold text-sm">+ {t.newConversation || '新建对话'}</div>
              </div>
              <div className="text-xs">
                {selectedIndex === conversations.length ? '►' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          <div>{t.useArrowKeysToNavigate}</div>
          <div>{t.pressEnterToSelect}</div>
          <div>{t.deleteKeyToDelete || 'Delete键删除'}</div>
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
            if (selectedIndex < conversations.length) {
              selectConversation(conversations[selectedIndex].id);
              setScreen('message-detail');
            } else {
              setShowNewConversation(true);
            }
          }}
        >
          <div className="font-bold">{selectedIndex < conversations.length ? t.open : t.new || '新建'}</div>
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

export default MessagesScreen;