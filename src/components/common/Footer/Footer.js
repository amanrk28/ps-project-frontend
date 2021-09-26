import React from 'react';
import { Link } from 'react-router-dom';
import logoMain from 'common/images/logoMain.png';
import { COMPANY_NAME } from 'utils/utils';
import './Footer.scss';

const Footer = () => (
  <div className="footer__wrapper">
    <div className="logo">
      <Link to="/">
        <img src={logoMain} alt={COMPANY_NAME} />
      </Link>
    </div>
    <div className="contributors">
      <p className="contributors__title">Contributors : </p>
      <div>
        <p className="contributors__names">Abhishek Kumar Yadav</p>
        <p className="contributors__names">Aman Khemka</p>
        <p className="contributors__names">Amose S</p>
        <p className="contributors__names">Anirudh B S</p>
      </div>
    </div>
  </div>
);

export default Footer;
