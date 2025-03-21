import React, { useEffect, useState } from 'react';
import EventSystem from 'app/events';

const NavigationPanel = ({pages = []}) => {
  const [current, setCurrent] = useState(null);
  
  const nav = (e, p) => {
    e.stopPropagation();
    if (current !== p) {
      setCurrent(p);
      EventSystem.trigger('navigate-to', p);
    }
  }
  
  useEffect(() => {
    EventSystem.bind('reset-camera', () => setCurrent(null));
  
    const onShowPage = (page) => {
      setCurrent(() => page);
    };
    const onClosePage = () => {
      setCurrent(() => null);
    };
    
    EventSystem.bind('show-page', onShowPage);
    EventSystem.bind('close-page', onClosePage);
    return () => {
      EventSystem.unbind('reset-camera');
      EventSystem.unbind('show-page');
      EventSystem.unbind('close-page');
    }
  }, [])
  
  return (
    <div className="fixed top-4 left-4 w-28 bg-panelBg backdrop-blur-md p-3 rounded-lg space-y-2 z-50 transition-colors">
      {pages.map((p, idx) => (
        <div
          key={idx}
          onClick={(e) => nav(e, p.name)}
          className={`cursor-pointer px-3 py-1 rounded text-textColor hover:text-activeTextColor transition-colors ${
            current === p.name ? 'text-activeTextColor font-semibold' : ''
          }`}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
};

export default NavigationPanel;
