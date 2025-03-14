import React, {useState} from 'react';

import style from './style.scss';
import Browser from 'assets/browser.png';
import Computer from 'assets/computer.png';
import Interactions from 'assets/interactions.png';

const AboutMe = ({onClose, shown}) => {
  const handleClose = (e) => {
    onClose(e);
  };
  
  return <div className={`${style.baseWrapper}`}>
    <div className={`${style.pageBody} ${!shown ? style.hide : ''}`}>
      <div className={style.cross} onClick={handleClose}/>
      <h1>Hi, my name is Andrew</h1>
      <div className={style.grid}>
        <div className={`${style.text} ${style.left}`}>I'm highly skilled Software Developer with wide experience in frontend and backend development.</div>
        <div className={style.imageContainer}><img src={Computer} className={style.image}></img></div>
      </div>
      <div className={`${style.grid} ${style.alt}`}>
        <div className={style.imageContainer}><img src={Browser} className={style.image}></img></div>
        <div className={`${style.text} ${style.right}`}>
          I maintain exceptional development quality from conception through distribution and possess a great concern to code readability and maintainability.
        </div>
      </div>
      <div className={style.grid}>
        <div className={`${style.text} ${style.left}`}>I work alongside clients and colleagues through all stages of development to produce exceptional final products.</div>
        <div className={style.imageContainer}><img src={Interactions} className={style.image}></img></div>
      </div>
    </div>
  </div>
};


export default AboutMe;
