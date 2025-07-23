import React, { useState } from 'react';
import { useNokiaStore } from '../store/useNokiaStore';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';

const MessageDetailScreen: React.FC = () => {
  const { conversations, selectedConversationId, sendMessage, touchBlocked, setScreen } = useNokiaStore();
  const { t } = useLanguage();
  const [isComposing, setIsComposing] = useState(false);
  const [messageText, setMessageText] = useState('');
  const conversation = conversations.find(c => c.id === selectedConversationId);
  
  const menuItems = isComposing ? ['send', 'cancel'] : ['compose'];
  
  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: menuItems.length,
    onEnter: () => {
      if (isComposing) {
        if (selectedIndex === 0) { // send
          if (messageText.trim() && selectedConversationId) {
            sendMessage(selectedConversationId, messageText.trim());
            setMessageText('');
            setIsComposing(false);
          }
        } else { // cancel
          setMessageText('');
          setIsComposing(false);
        }
      } else {
        setIsComposing(true);
      }
    },
    customHandlers: {
      'a': () => isComposing && setMessageText(prev => prev + 'a'),
      'b': () => isComposing && setMessageText(prev => prev + 'b'),
      'c': () => isComposing && setMessageText(prev => prev + 'c'),
      'd': () => isComposing && setMessageText(prev => prev + 'd'),
      'e': () => isComposing && setMessageText(prev => prev + 'e'),
      'f': () => isComposing && setMessageText(prev => prev + 'f'),
      'g': () => isComposing && setMessageText(prev => prev + 'g'),
      'h': () => isComposing && setMessageText(prev => prev + 'h'),
      'i': () => isComposing && setMessageText(prev => prev + 'i'),
      'j': () => isComposing && setMessageText(prev => prev + 'j'),
      'k': () => isComposing && setMessageText(prev => prev + 'k'),
      'l': () => isComposing && setMessageText(prev => prev + 'l'),
      'm': () => isComposing && setMessageText(prev => prev + 'm'),
      'n': () => isComposing && setMessageText(prev => prev + 'n'),
      'o': () => isComposing && setMessageText(prev => prev + 'o'),
      'p': () => isComposing && setMessageText(prev => prev + 'p'),
      'q': () => isComposing && setMessageText(prev => prev + 'q'),
      'r': () => isComposing && setMessageText(prev => prev + 'r'),
      's': () => isComposing && setMessageText(prev => prev + 's'),
      't': () => isComposing && setMessageText(prev => prev + 't'),
      'u': () => isComposing && setMessageText(prev => prev + 'u'),
      'v': () => isComposing && setMessageText(prev => prev + 'v'),
      'w': () => isComposing && setMessageText(prev => prev + 'w'),
      'x': () => isComposing && setMessageText(prev => prev + 'x'),
      'y': () => isComposing && setMessageText(prev => prev + 'y'),
      'z': () => isComposing && setMessageText(prev => prev + 'z'),
      ' ': () => isComposing && setMessageText(prev => prev + ' '),
      '1': () => isComposing && setMessageText(prev => prev + '1'),
      '2': () => isComposing && setMessageText(prev => prev + '2'),
      '3': () => isComposing && setMessageText(prev => prev + '3'),
      '4': () => isComposing && setMessageText(prev => prev + '4'),
      '5': () => isComposing && setMessageText(prev => prev + '5'),
      '6': () => isComposing && setMessageText(prev => prev + '6'),
      '7': () => isComposing && setMessageText(prev => prev + '7'),
      '8': () => isComposing && setMessageText(prev => prev + '8'),
      '9': () => isComposing && setMessageText(prev => prev + '9'),
      '0': () => isComposing && setMessageText(prev => prev + '0'),
    },
    onDelete: () => {
      if (isComposing && messageText.length > 0) {
        setMessageText(prev => prev.slice(0, -1));
      }
    }
  });

  if (!conversation) {
    return (
      <div className="h-full bg-[#9BBB58] text-black font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold mb-2">{t.conversationNotFound}</div>
          <div className="text-xs">{t.pressEscToGoBack}</div>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
      {/* Header */}
      <div className="text-center py-3 border-b border-[#666666]">
        <div className="text-lg font-bold">{conversation.contact}</div>
        <div className="text-xs mt-1">{conversation.messages.length} {t.messages}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden p-2">
        <div className="h-full overflow-y-auto space-y-2">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`
                max-w-[80%] p-2 border border-[#666666]
                ${message.isOwn 
                  ? 'ml-auto bg-[#7A9B42] text-right' 
                  : 'mr-auto bg-[#AACCAA] text-left'
                }
              `}
            >
              <div className="text-xs font-bold mb-1">
                {message.isOwn ? t.you : message.sender}
              </div>
              <div className="text-sm mb-1">
                {message.content}
              </div>
              <div className="text-xs opacity-75">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      {isComposing ? (
        <div className="border-t border-[#666666] p-3">
          <div className="border border-[#666666] p-2 bg-[#AACCAA]">
            <div className="text-xs font-bold mb-1">{t.typeMessage || '输入消息'}</div>
            <div className="text-sm min-h-[20px]">{messageText || '_'}</div>
            <div className="text-xs mt-1 opacity-75">
              {t.typeToInput || '直接输入文字，Delete删除'}
            </div>
          </div>
          
          <div className="flex space-x-2 mt-2">
            <div className={`flex-1 border border-[#666666] p-2 text-center ${
              selectedIndex === 0 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
            }`}>
              <div className="text-sm font-bold">{t.send || '发送'}</div>
            </div>
            
            <div className={`flex-1 border border-[#666666] p-2 text-center ${
              selectedIndex === 1 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
            }`}>
              <div className="text-sm font-bold">{t.cancel || '取消'}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-[#666666] p-3">
          <div className={`border border-[#666666] p-2 text-center ${
            selectedIndex === 0 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
          }`}>
            <div className="text-sm font-bold">{t.composeMessage || '编写消息'}</div>
          </div>
        </div>
      )}

      {/* Navigation Instructions */}
      <div className="px-4 py-2 border-t border-[#666666]">
        <div className="text-center text-xs space-y-1">
          {isComposing ? (
            <div>{t.enterToSend || 'Enter发送，ESC取消'}</div>
          ) : (
            <div>{t.enterToCompose || 'Enter编写消息，ESC返回'}</div>
          )}
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
            if (isComposing) {
              if (selectedIndex === 0) { // send
                if (messageText.trim() && selectedConversationId) {
                  sendMessage(selectedConversationId, messageText.trim());
                  setMessageText('');
                  setIsComposing(false);
                }
              } else { // cancel
                setMessageText('');
                setIsComposing(false);
              }
            } else {
              setIsComposing(true);
            }
          }}
        >
          <div className="font-bold">
            {isComposing ? (selectedIndex === 0 ? t.send || '发送' : t.cancel || '取消') : t.compose || '编写'}
          </div>
        </div>
        <div 
          className={`text-right cursor-pointer ${
            !touchBlocked ? 'hover:bg-[#7A9B42] hover:text-white' : ''
          } px-2 py-1 rounded transition-colors duration-150`}
          onClick={() => {
            if (touchBlocked) return;
            setScreen('messages');
          }}
        >
          <div className="font-bold">{t.back}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailScreen;