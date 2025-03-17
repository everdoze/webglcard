import React, {useState} from 'react';

import style from './style.scss';
import {lighten} from 'utils/lighten';

const Tag = ({color = '#918955', text = 'Tag'}) => {
  const [bg, setColor] = useState(color);
  
  const _setColor = (e, clr) => {
    e.stopPropagation();
    setColor(clr);
  }
  
  return (<div
    onMouseLeave={(e) => _setColor(e, color)}
    onMouseEnter={(e) => _setColor(e, lighten(color, 30))}
    className={style.tag} style={{background: bg}}>
    {text}
  </div>)
};

export default Tag;