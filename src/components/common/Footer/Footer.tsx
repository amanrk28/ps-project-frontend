import React from 'react';
import { Link } from 'react-router-dom';
import LOGO_MAIN from 'utils/utils';
import { COMPANY_NAME } from 'utils/utils';
import './Footer.scss';

const Footer = () => (
  <footer className="footer__wrapper">
    <div className="logo">
      <Link to="/">
        <img src={LOGO_MAIN} alt={COMPANY_NAME} />
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
  </footer>
);

export default Footer;
