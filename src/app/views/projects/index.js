import React, {useState} from 'react';

import Tag from 'app/components/tag';
import FrLogo from 'app/components/logos/fr-logo';
import FppLogo from 'app/components/logos/fpp-logo';
import GlobusLogo from 'app/components/logos/globus-logo';
import EfesLogo from 'app/components/logos/efes-logo';
import IkeaLogo from 'app/components/logos/ikea-logo';

import css from './style.scss';

const ProjectPanel = ({logo, style, tags, logoStyle, ...props}) => {
  const LogoComponent = logo;
  return (<div className={css.projectPanel} style={style}>
    <LogoComponent style={logoStyle} {...props}/>
    <div className={css.tags}>
      {tags.map((tag) => <Tag {...tag}/>)}
    </div>
  </div>)
};

const Projects = () => {
  const [panels, setPanels] = useState([
    {
      logo: FrLogo,
      width: 210, height: 50,
      style: {left: '30%', top: '30%'},
      logoStyle: {margin: '6px 0 12px 4px'},
      tags: [
        {text: 'Frontend Developer', color: '#32b2b280'},
        {text: 'Team Lead', color: '#45CE5D80'},
        {text: 'JavaScript', color: '#FFD87280'}
      ]
    },
    {
      logo: FppLogo,
      width: 260, height: 70,
      style:{bottom: '30%', right: '30%'},
      tags: [
        {text: 'Frontend Developer', color: '#32b2b280'},
        {text: 'JavaScript', color: '#FFD87280'},
        {text: 'Python', color: '#FF72727F'}
      ]
    },
    {
      logo: GlobusLogo,
      width: 240, height: 60,
      style:{bottom: '15%', right: '40%'},
      logoStyle: {margin: '6px 0 12px 0'},
      tags: [
        {text: 'Fullstack Developer', color: 'rgba(178,50,148,0.5)'},
        {text: 'JavaScript', color: '#FFD87280'},
        {text: 'ABAP', color: '#FFB69A7F'}
      ]
    },
    {
      logo: EfesLogo,
      width: 200, height: 40,
      style: {top: '30%', right: '30%'},
      logoStyle: {margin: '6px 0 12px 0'},
      tags: [
        {text: 'Backend Developer', color: '#3250B27F'},
        {text: 'ABAP', color: '#FFB69A7F'}
      ]
    },
    {
      logo: IkeaLogo,
      width: 200, height: 40,
      style: {left: '20%', bottom: '20%'},
      logoStyle: {margin: '6px 0 12px 0'},
      tags: [
        {text: 'Fullstack Developer', color: '#B232677F'},
        {text: 'JavaScript', color: '#FFD87280'},
        {text: 'ABAP', color: '#FFB69A7F'}
      ]
    }
  ]);
  
  return (<div>
    {panels.map(p => (<ProjectPanel {...p}/>))}
  </div>)
};

export default Projects;