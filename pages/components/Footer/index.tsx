import React from 'react';
import { ContactUs, ProductCategories } from './constants';
import styles from './index.module.css';

function FooterComp() {
  const getCurrentYear = new Date().getFullYear();

  return (
    <>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1440 126"
        className={styles.svgStyle}
        xmlSpace="preserve"
      >
        <path
          className="bg-black"
          d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"
        />
      </svg>
      <footer className="bg-black pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md mr-4">
              <i className="fas fa-copyright text-white"></i>
              <small className="d-block mt-3 text-muted">
                ©{getCurrentYear}
                Anchor Bootstrap UI Kit, by Sal{' '}
                <a target="_blank" href="https://www.wowthemes.net">
                  @wowthemesnet
                </a>
                . License MIT.
              </small>
            </div>
            <div className="col-6 col-md">
              <h5 className="mb-4 text-white">Contact Us</h5>
              <ul className="list-unstyled text-small">
                {ContactUs.map((item, index) => {
                  return (
                    <li key={item.label + index}>
                      <a className="text-muted" href="#">
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5 className="mb-4 text-white">Product Categories</h5>
              <ul className="list-unstyled text-small">
                {ProductCategories.map((item, index) => {
                  return (
                    <li key={item.label + index}>
                      <a className="text-muted" href="#">
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <div className="col-6 col-md">
              <h5 className="mb-4 text-white">Utilities</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Business
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Education
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Government
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Gaming
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5 className="mb-4 text-white">About</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Team
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Locations
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Terms
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComp;
