import React from 'react';
import { useTranslation } from 'next-i18next'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { ContactUs, ContacusEnum } from '@constants/contactus'
import { useRouter } from 'next/router'
import styles from './index.module.css';

function ContactusComp() {
  const { t} = useTranslation('common')
  const router: any = useRouter()

  const handleContactClick = (contactInfo: any) => {
    const { value, label } = contactInfo

    if(label === ContacusEnum.WHATSAPP) {
      window.open('https://wa.me/8613124932180', '_bank')
      return
    }
    if(label === ContacusEnum.FACEBOOK) {
      window.open('https://www.facebook.com/profile.php?id=100035082511602', '_bank')
      return
    }

    if(label === ContacusEnum.INSTAGRAM) {
      window.open('https://www.instagram.com/xyhardware_manufactory', '_bank')
      return
    }

    if(label === ContacusEnum.TIKTOK) {
      window.open('https://www.tiktok.com/@xyglasshardwarefactory', '_bank')
      return
    }
    console.log({ value, label });
    router.push('contact')
  }

  return (
    <div className="row justify-content-center mb-5 pb-3">
      <div className="col-lg-12">
        <div className="text-center pt-5 mt-5 mb-5">
          <h1 className="font-weight-light h3">
            <strong>{t('home_contact_us.text_connect')}</strong>
          </h1>
        </div>
        <div className="sectionWrapper d-flex justify-content-center flex-wrap">
          {
            ContactUs.map((item, index) => {
              return (
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement='top'
                  key={item.label + index}
                  overlay={
                    <Popover >
                      <Popover.Header as="h3" className={`${styles.popoverHeader}`}>{`Follow us on ${item.label}`}</Popover.Header>
                    </Popover>
                  }
                >
                  <div
                    className="iconbox iconmedium rounded-circle  text-white mr-1"
                    onClick={() => { handleContactClick(item) }}
                  >
                    {item.icon()}
                  </div>
                </OverlayTrigger>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ContactusComp;
