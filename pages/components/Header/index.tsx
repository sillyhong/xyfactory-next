import React from 'react';
import style from './index.module.css';

const Header = () => {
  return (
    <div
      className={`topnavnavbar' 'navbar-expand-lg' 'navbar-dark' 'bg-primary' ${style.navigatorMargin}`}
    >
      <div className="jumbotron jumbotron-lg jumbotron-fluid mb-0 pb-3 bg-primary position-relative">
        <div className="container-fluid text-white h-100">
          <div className="d-lg-flex align-items-center justify-content-between text-center pl-lg-5">
            <div className="col pt-4 pb-4">
              <h1 className="display-3">
                Build something <strong>nice</strong> & easy
              </h1>
              <h5 className="font-weight-light mb-4">
                With this FREE Bootstrap 4.1.3<strong> UI Kit</strong> &{' '}
                <strong>
                  <i className="fab fa-sass fa-2x text-info"></i>
                </strong>
              </h5>
              <a href="#" className="btn btn-lg btn-outline-white btn-round">
                Learn more
              </a>
            </div>
            <div className="col align-self-bottom align-items-right text-right h-max-380 h-xl-560 position-relative z-index-1">
              <img
                src="http://placeimg.com/640/480"
                className="rounded img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <svg
        className={style.svgStyle}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1440 126"
        xmlSpace="preserve"
      >
        <path
          className={style.pathStyle}
          d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"
        />
      </svg>
    </div>
  );
};

export default Header;
