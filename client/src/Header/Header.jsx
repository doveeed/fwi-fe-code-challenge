import React from 'react';

import './Header.scss';
import { ReactComponent as CloudColor } from './cloud-color.svg';
import { ReactComponent as CloudEffects } from './cloud-effects.svg';
import CreatePlayerButton from './CreatePlayerButton';

const Header = () => (
  <header id="main-header" className="header">
    <div className="logo">
      <CloudColor className="logo__color" />
      <CloudEffects className="logo__effects" />
    </div>
    <h1 className="header__title">FWI Poker Challenge</h1>
    <CreatePlayerButton />
  </header>
);

export default Header;
