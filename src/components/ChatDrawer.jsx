import React, { useState } from 'react';

const ChatDrawer = ({ isOpen, onClose, hostName }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! Thanks for booking ${hostName}. Let me know if you have any questions.`, sender: 'host', time: '10:00 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputValue('');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-[100] transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1560518846-3b957f897626?auto=format&fit=crop&q=80&w=100" alt="Host" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-outfit font-semibold text-[#1E232A]">{hostName}</h3>
              <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Online
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          <div className="text-center text-xs text-gray-400 my-4">Today</div>
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl p-3 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#1E232A] text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
              }`}>
                <p>{msg.text}</p>
                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-primary transition-colors flex items-center pr-2">
               <input 
                 type="text" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder="Type a message..."
                 className="w-full bg-transparent border-none focus:outline-none p-3.5 text-sm"
               />
               <button type="button" className="text-gray-400 hover:text-gray-600 p-2">
                 <span className="material-symbols-outlined text-[20px]">attach_file</span>
               </button>
            </div>
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="w-12 h-12 flex-shrink-0 bg-[#B2E830] hover:bg-[#a1d628] text-[#1E232A] rounded-2xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatDrawer;
