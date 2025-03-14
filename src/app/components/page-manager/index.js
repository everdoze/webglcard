import React, {useEffect, useState} from 'react';
import EventSystem from 'app/events';
import debounce from 'utils/debounce';
import style from './style.scss';

const PageManager = () => {
  const [page, setPage] = useState([]);
  const [shown, setShown] = useState(false);
  
  useEffect(() => {
    const showPage = (page) => {
      setShown(true);
      setPage(() => [page.component]);
    }
    EventSystem.bind('show-page', showPage);
    EventSystem.bind('close-page', closePage);
    
    return () => {
      EventSystem.unbind('show-page');
      EventSystem.unbind('close-page');
    }
  }, []);
  
  const closePage = () => {
    setShown(false);
    resetPages();
  };
  
  const resetPages = debounce(() => {
    setPage([]);
  }, 200);
  
  return (
    <div>
      {page.map((PageComponent, index) => (
        <div key={index} className={style.page}>
          <div key={`overlay_${index}`} className={style.pageOverlay}></div>
          <PageComponent key={`page_${index}`} shown={shown} onClose={() => {
            closePage();
            EventSystem.trigger('reset-camera');
          }} />
        </div>
      ))}
    </div>
  );
};

export default PageManager;