import React from 'react';
import Github from '@/components/icons/github';
import Linkedin from '@/components/icons/linkedin';
import Telegram from '@/components/icons/telegram';

const SocialNetworksPanel = () => {
  const iconStyle = { fill: '#ade0e0' };
  
  return (
    <div className="fixed bottom-4 right-4 flex flex-col justify-center space-y-4 z-50 bg-panelBg p-4 rounded-lg backdrop-blur-md transition-custom">
      <a
        className="hover:scale-110 transition-transform"
        href="https://github.com/everdoze"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github {...iconStyle} />
      </a>
      <a
        className="hover:scale-110 transition-transform"
        href="https://www.linkedin.com/in/andrey-aulov-71224121a"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin {...iconStyle} />
      </a>
      <a
        className="hover:scale-110 transition-transform"
        href="https://t.me/everdoze"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Telegram {...iconStyle} />
      </a>
    </div>
  );
};

export default SocialNetworksPanel;
