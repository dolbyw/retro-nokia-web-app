import React, { useState } from 'react';
import { useNokiaStore } from '../store/useNokiaStore';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useLanguage } from '../hooks/useLanguage';

const ContactsScreen: React.FC = () => {
  const { contacts, addContact, deleteContact, selectContact, setScreen, touchBlocked } = useNokiaStore();
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const menuItems = showAddForm ? ['name', 'phone', 'save', 'cancel'] : 
                   showDeleteConfirm ? ['confirm', 'cancel'] :
                   [...contacts.map((_, i) => `contact-${i}`), 'add'];
  
  const handleContactClick = (index: number) => {
    if (touchBlocked) return;
    
    if (showAddForm) {
      if (index === 2) { // save
        if (newName.trim() && newPhone.trim()) {
          addContact(newName.trim(), newPhone.trim());
          setNewName('');
          setNewPhone('');
          setShowAddForm(false);
        }
      } else if (index === 3) { // cancel
        setNewName('');
        setNewPhone('');
        setShowAddForm(false);
      }
    } else if (showDeleteConfirm) {
      if (index === 0) { // confirm
        const contactIndex = Math.floor(index / 1);
        if (contacts[contactIndex]) {
          deleteContact(contacts[contactIndex].id);
        }
        setShowDeleteConfirm(false);
      } else { // cancel
        setShowDeleteConfirm(false);
      }
    } else {
      if (index < contacts.length) {
        selectContact(contacts[index].id);
        setScreen('contact-detail');
      } else {
        setShowAddForm(true);
      }
    }
  };

  const { selectedIndex } = useKeyboardNavigation({
    maxIndex: menuItems.length,
    onEnter: () => {
      if (showAddForm) {
        if (selectedIndex === 2) { // save
          if (newName.trim() && newPhone.trim()) {
            addContact(newName.trim(), newPhone.trim());
            setNewName('');
            setNewPhone('');
            setShowAddForm(false);
          }
        } else if (selectedIndex === 3) { // cancel
          setNewName('');
          setNewPhone('');
          setShowAddForm(false);
        }
      } else if (showDeleteConfirm) {
        if (selectedIndex === 0) { // confirm
          const contactIndex = Math.floor(selectedIndex / 1);
          if (contacts[contactIndex]) {
            deleteContact(contacts[contactIndex].id);
          }
          setShowDeleteConfirm(false);
        } else { // cancel
          setShowDeleteConfirm(false);
        }
      } else {
        if (selectedIndex < contacts.length) {
          selectContact(contacts[selectedIndex].id);
          setScreen('contact-detail');
        } else {
          setShowAddForm(true);
        }
      }
    },
    onDelete: () => {
      if (!showAddForm && !showDeleteConfirm && selectedIndex < contacts.length) {
        setShowDeleteConfirm(true);
      }
    }
  });

  if (showAddForm) {
    return (
      <div className="h-full bg-[#9BBB58] text-black font-mono flex flex-col">
        {/* Header */}
        <div className="text-center py-3 border-b border-[#666666]">
          <div className="text-lg font-bold">{t.addContact || '添加联系人'}</div>
        </div>

        {/* Add Form */}
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div className={`border border-[#666666] p-3 ${
              selectedIndex === 0 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
            }`}>
              <div className="text-xs font-bold mb-1">{t.name || '姓名'}</div>
              <div className="text-sm">{newName || '_'}</div>
            </div>
            
            <div className={`border border-[#666666] p-3 ${
              selectedIndex === 1 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
            }`}>
              <div className="text-xs font-bold mb-1">{t.phone || '电话'}</div>
              <div className="text-sm">{newPhone || '_'}</div>
            </div>
            
            <div className="flex space-x-2">
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 2 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleContactClick(2)}
              >
                <div className="text-sm font-bold">{t.save || '保存'}</div>
              </div>
              
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 3 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleContactClick(3)}
              >
                <div className="text-sm font-bold">{t.cancel || '取消'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-4 py-2 border-t border-[#666666]">
          <div className="text-center text-xs space-y-1">
            <div>{t.useArrowKeysToNavigate}</div>
            <div>{t.pressEnterToSelect}</div>
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
          <div className="text-lg font-bold">{t.deleteContact || '删除联系人'}</div>
        </div>

        {/* Confirm Dialog */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="text-sm">{t.confirmDelete || '确定要删除这个联系人吗？'}</div>
            
            <div className="flex space-x-2">
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 0 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleContactClick(0)}
              >
                <div className="text-sm font-bold">{t.confirm || '确定'}</div>
              </div>
              
              <div 
                className={`flex-1 border border-[#666666] p-3 text-center cursor-pointer ${
                  selectedIndex === 1 ? 'bg-[#7A9B42]' : 'bg-[#AACCAA]'
                } ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}`}
                onClick={() => handleContactClick(1)}
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
        <div className="text-lg font-bold">{t.contactsTitle}</div>
        <div className="text-xs mt-1">{contacts.length} {t.contacts}</div>
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
              onClick={() => handleContactClick(index)}
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
          
          {/* Add Contact Option */}
          <div
            className={`
              px-4 py-3 border-b border-[#666666] cursor-pointer
              ${selectedIndex === contacts.length ? 'bg-[#7A9B42]' : 'bg-[#9BBB58]'}
              ${!touchBlocked ? 'hover:bg-[#7A9B42]' : ''}
              transition-colors duration-150
            `}
            onClick={() => handleContactClick(contacts.length)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-bold text-sm">+ {t.addContact || '添加联系人'}</div>
              </div>
              <div className="text-xs">
                {selectedIndex === contacts.length ? '►' : ''}
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
            if (selectedIndex < contacts.length) {
              selectContact(contacts[selectedIndex].id);
              setScreen('contact-detail');
            } else {
              setShowAddForm(true);
            }
          }}
        >
          <div className="font-bold">{selectedIndex < contacts.length ? t.view : t.add || '添加'}</div>
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

export default ContactsScreen;