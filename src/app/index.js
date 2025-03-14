import React, {useState, useEffect, lazy, Suspense} from "react";

import style from './style.scss';
import PageManager from 'app/components/page-manager';
import NavigationPanel from 'app/components/navigation-panel';
import SocialNetworksPanel from 'app/components/social-networks-panel';

const RendererComponent = lazy(() => import('./webgl/renderer-component'));

const Application = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  const onReady = () => {
    setProgress(100);
  };
  
  const handleReady = () => {
    setFadeOut(true);
    setTimeout(() => setLoading(false), 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleReady();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {loading && <div className={`${style.loadingScreen} ${fadeOut ? style.fadeOut : ""}`}>
        <div className={style.progressBar}>
          <div className={style.progress} style={{ width: `${progress}%` }}></div>
        </div>
      </div>}
      <Suspense fallback={null}>
        <RendererComponent onReady={onReady}/>
      </Suspense>
      <PageManager/>
      {!loading && <SocialNetworksPanel/>}
      {!loading && <NavigationPanel/>}
    </div>
    
  );
};

export default Application;