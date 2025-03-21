import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app';
import 'styles/global.css';
import 'normalize.css';

const container = document.getElementById("root");

if (container) {
  document.fonts.ready.then(() => {
    const root = ReactDOM.createRoot(container);
    root.render(<App/>);
  });
}
