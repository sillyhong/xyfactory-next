import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next'
import { ContactUs, ContacusEnum } from '@constants/contactus';
import { useRouter } from 'next/router'
import { ProductCategories } from '@constants/index';
import styles from './index.module.css';

function FooterComp() {
  const { t } = useTranslation('common')
  const router: any = useRouter()


  const getCurrentYear = new Date().getFullYear();

  const handleContactClick = useCallback((contactInfo: any) => {
    const { value, label } = contactInfo
    if(label == ContacusEnum.WHATSAPP) {
      window.open('https://wa.me/8613124932180', '_bank')
      return
    }
    if(label == ContacusEnum.FACEBOOK) {
      window.open('https://www.facebook.com/profile.php?id=100035082511602', '_bank')
      return
    }

    if(label == ContacusEnum.INSTAGRAM) {
      window.open('https://www.instagram.com/xyhardware_manufactory', '_bank')
      return
    }

    if(label == ContacusEnum.TIKTOK) {
      window.open('https://www.tiktok.com/@xyglasshardwarefactory', '_bank')
      return
    }
    console.log({ value, label });
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
            <div className="d-flex flex-column text-center justify-content-start col-md-4 mt-2">
              <h5 className="mb-4 text-white">{t('nav.nav_contact_us')}</h5>
              <ul className="list-unstyled text-small">
                {ContactUs.map((item, index) => {
                  return (
                    <li onClick={() => { handleContactClick(item) }} key={item.label + index} className="contactus-iconbox iconbox d-flex align-items-center">
                      <div className='w-100 text-center'>
                        <span className='icon'>
                          {item.icon()}
                        </span>
                        <a className="text-muted" href="#">
                          {item.label}
                        </a>
                      </div>

                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="d-flex flex-column text-center justify-content-start col-md-4">
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
            <div className="col-md-4 d-flex text-center justify-content-center">
              <i className="fas fa-copyright text-white"></i>
              <small className="d-block mt-3 text-muted">
                ©{getCurrentYear}
                Anchor Bootstrap UI Kit,
                <a target="_blank" href="https://www.xyglassaccessories.com/" rel="noreferrer">
                  @xyglassaccessories
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComp;
