import React, { useEffect, useRef } from "react";
import Renderer from './renderer';

const RendererComponent = ({onReady, pages = []}) => {
  const mountRef = useRef(null);
  const rendererInstance = useRef(null);
  
  useEffect(() => {
    if (mountRef.current && !rendererInstance.current) {
      rendererInstance.current = new Renderer(mountRef.current, onReady, pages);
    }
    
    return () => {
      if (rendererInstance.current) {
        rendererInstance.current.destroy && rendererInstance.current.destroy();
        rendererInstance.current = null;
      }
    };
  }, []);
  
  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default RendererComponent;