import React, {useEffect, useState} from 'react';
import EventSystem from 'app/events';
import style from './style.scss';

const NavigationPanel = () => {
  const [current, setCurrent] = useState(null);
  const infoPoints = ['/about','/projects', '/contacts', '/hobbies', '/skills'];
  
  const nav = (e, p) => {
    e.stopPropagation();
    if (current !== p) {
      setCurrent(p);
      EventSystem.trigger('navigate-to', p);
    }
  }
  
  useEffect(() => {
    EventSystem.bind('reset-camera', () => setCurrent(null));
    return () => EventSystem.unbind('reset-camera');
  }, [])
  
  return (<div className={style.navPanel}>
    {infoPoints.map((p, idx) =>
      <div
        key={idx} onClick={(e) => nav(e, p)}
        className={style.navItem}>
        {p}
      </div>)}
  </div>)
};

export default NavigationPanel;