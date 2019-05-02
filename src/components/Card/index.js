import React from 'react';

import cabifyLogo from '../../images/cabify-logo.svg';

const Card = ({ info }) => {
  const {
    fullName,
    jobDescription,
    prefix,
    phoneNumber,
    email,
    website,
    address
  } = info;

  return (
    <article className="businessCard col col6">
      <figure className="businessCard-badge">
        <a className="businessCard-badge-logo" href="http://www.cabify.com">
          <img src={cabifyLogo} alt="Cabify" />
        </a>
      </figure>
      <h1 className="title-main">Request your business card</h1>
      <div className="businessCard-cards">
        <div className="businessCard-cardBack" />
        <div className="businessCard-cardFront">
          <div>
            <p className="businessCard-cardFront-title">{fullName}</p>
            <p className="businessCard-cardFront-subtitle">{jobDescription}</p>
          </div>
          <div className="businessCard-cardFront-bottom">
            <p className="businessCard-icon-phone">
              {prefix} {phoneNumber}
            </p>
            <p className="businessCard-icon-email">{email}</p>
            <p className="businessCard-icon-website">{website}</p>
            <p className="businessCard-icon-address">{address}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
