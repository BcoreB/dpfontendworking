import { useState } from 'react';
import getLanguageByEnglish from '@/utils/languages'
const AnnouncementComponent: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Announcement:', message);
      setMessage(''); // Clear the message after sending
    } else {
      alert('Please enter a message');
    }
  };

  return (
    <div className="max-w-lg mx-auto h-full mt-10">
      {/* Announcement Header */}
      <div className="bg-[#a855f7] text-white text-xl text-center font-semibold py-2 rounded-t-lg">
      {getLanguageByEnglish('Announcement')}
      </div>
      {/* Text Area */}
      <textarea
        className="w-full h-4/6 p-4 bg-[#f3e8ff] text-gray-800 rounded-b-lg outline-none resize-none "
        placeholder="Type your announcement here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* Send Button */}
      <button
        onClick={handleSend}
        className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-lg focus:outline-none"
      >
        {getLanguageByEnglish('SEND')}
      </button>
    </div>
  );
};

export default AnnouncementComponent;
