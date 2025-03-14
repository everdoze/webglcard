import React from 'react';

import Github from 'app/components/icons/github';
import Linkedin from 'app/components/icons/linkedin';
import Telegram from 'app/components/icons/telegram';

import style from './style.scss';

const SocialNetworksPanel = () => {
  return  (<div className={style.socialPanel}>
    <a className={style.icon} href={'https://github.com/everdoze'} target={"_blank"}>
      <Github fill={'#ade0e0'}/>
    </a>
    <a className={style.icon} href={'https://www.linkedin.com/in/andrey-aulov-71224121a/'} target={"_blank"}>
      <Linkedin fill={'#ade0e0'}/>
    </a>
    <a className={style.icon} href={'https://t.me/everdoze'} target={"_blank"}>
      <Telegram fill={'#ade0e0'}/>
    </a>
  </div>)
};

export default SocialNetworksPanel;