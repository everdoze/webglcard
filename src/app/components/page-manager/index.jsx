import React, { useEffect, useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import EventSystem from 'app/events';

let pagesHash = {};

const PageManager = ({pages = []}) => {
  const [page, setPage] = useState([]);
  const [shown, setShown] = useState(false);
  const pageRef = useRef(page);
  
  useEffect(() => {
    pages.forEach(p => pagesHash[p.name] = p.component);
    
    const showPage = (page) => {
      setPage(() => [pagesHash[page]]);
      setTimeout(() => setShown(true), 50);
    };
    EventSystem.bind('show-page', showPage);
    EventSystem.bind('close-page', closePage);
    
    return () => {
      EventSystem.unbind('show-page');
      EventSystem.unbind('close-page');
    };
  }, []);
  
  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  
  const closePage = () => {
    if (!pageRef.current.length) return;
    setShown(false);
    setTimeout(() => {
      setPage([])
    }, 400);
  };
  
  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      {page.length ? <div
        className={`absolute inset-0 transition-opacity duration-400 ${
          shown ? 'opacity-100' : 'opacity-0'
        } backdrop-blur-sm pointer-events-auto`}
      /> : null}
      
      {page.map((PageComponent, index) => (
        <div
          key={index}
          className={cn(
            "absolute left-1/2 top-1/2 z-50 pointer-events-auto transition-all duration-400 origin-center",
            shown ? "scale-100 opacity-100" : "scale-0 opacity-0",
            "transform -translate-x-1/2 -translate-y-1/2"
          )}
        >
          <PageComponent
            key={`page_${index}`}
            shown={shown}
            onClose={() => {
              closePage();
              EventSystem.trigger('reset-camera');
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PageManager;
