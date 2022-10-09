import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { ContactUs } from '@constants/contactus'
import styles from './index.module.css';
import { truncate } from 'fs/promises';

function ContactusComp() {

  const handleContactClick  =(contactInfo: any) => {
    const {value, label} = contactInfo
    console.log({value, label});
    
  }

  return (
    <div className="row justify-content-center mb-5 pb-3">
      <div className="col-lg-12">
        <div className="text-center pt-5 mt-5 mb-5">
          <h1 className="font-weight-light h3">
            <strong>Connect with us</strong>
          </h1>
        </div>
        <div className="sectionWrapper d-flex justify-content-center flex-wrap">
          {
            ContactUs.map((item) => {
              return (
                <OverlayTrigger
                  trigger="hover"
                  key={item.label}
                  placement='top'
                  overlay={
                    <Popover >
                      <Popover.Header as="h3" className={`${styles.popoverHeader}`}>{`Follow us on ${item.label}`}</Popover.Header>
                    </Popover>
                  }
                >
                  <div
                    className="iconbox iconmedium rounded-circle  text-white mr-1"
                    onClick={() => {handleContactClick(item.label)}}
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
