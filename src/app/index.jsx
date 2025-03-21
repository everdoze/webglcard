import React, { useState, useEffect, lazy, Suspense } from 'react';
import PageManager from 'app/components/page-manager';
import NavigationPanel from 'app/components/navigation-panel';
import SocialNetworksPanel from 'app/components/social-networks-panel';
import AboutMe from "@/app/views/about-me";
import Projects from "@/app/views/projects";
import Skills from "@/app/views/skills";
import Contacts from "@/app/views/contacts";
import Hobbies from "@/app/views/hobbies";

const RendererComponent = lazy(() => import('./webgl/renderer-component'));

const pages = [
  {
    name: '/about',
    component: AboutMe,
  },
  {
    name: '/projects',
    component: Projects,
  },
  {
    name: '/skills',
    component: Skills,
  },
  {
    name: '/hobbies',
    component: Hobbies,
  },
  {
    name: '/contacts',
    component: Contacts,
  },
  
];

const Application = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  const onReady = () => {
    setTimeout(() => setProgress(100), 500);
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
        return prev + 30;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className={`fixed inset-0 flex items-center justify-center bg-primaryBg transition-opacity duration-800 z-50 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-1/2 h-2 bg-progressBarBg overflow-hidden">
            <div
              className="h-full bg-progressBarFore transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      <Suspense fallback={null}>
        <RendererComponent onReady={onReady} pages={pages} />
      </Suspense>
      
      <PageManager pages={pages}/>
      {!loading && <SocialNetworksPanel />}
      {!loading && <NavigationPanel pages={pages} />}
    </div>
  );
};

export default Application;
