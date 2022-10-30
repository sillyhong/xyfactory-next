import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next'
import { ContactUs  } from '@constants/contactus';
import { useRouter } from 'next/router'
import { ProductCategories  } from '@constants/index';
import styles from './index.module.css';

function FooterComp() {
  const { t} = useTranslation('common')
  const router: any = useRouter()

  
  const getCurrentYear = new Date().getFullYear();
  
  const handleContactClick = useCallback(()=>{
    router.push('contact')
  }, [router])

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
                Anchor Bootstrap UI Kit,
                <a target="_blank" href="https://www.xyglassaccessories.com/" rel="noreferrer">
                  @xyglassaccessories
                </a>
              </small>
            </div>
            <div className="col-6 col-md">
              <h5 className="mb-4 text-white">{t('nav.nav_contact_us')}</h5>
              <ul className="list-unstyled text-small">
                {ContactUs.map((item, index) => {
                  return (
                    <li onClick={handleContactClick} key={item.label + index} className="contactus-iconbox iconbox d-flex align-items-center">
                      <span className='icon'>
                      {item.icon()}
                      </span>
                      <a className="text-muted" href="#">
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5 className="mb-4 text-white">{t('home_footer.product_categories')}</h5>
              <ul className="list-unstyled text-small">
                {ProductCategories(t).map((item, index) => {
                  return (
                    <li key={item.label + index}>
                      <a className="text-muted" href={item.path}>
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComp;
