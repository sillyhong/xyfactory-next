import React from 'react';
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { advantages } from '@constants/aboutus'
import aboutusEn from '@assets/images/aboutus/aboutus-en.jpg';
import factory from '@assets/images/aboutus/factory.jpg';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';




const AboutUs = () => {
  const { t} = useTranslation('common')

  const renderDesc = () => {
    return (
      <div dangerouslySetInnerHTML={{__html: t('about_us.text_homepage_about_us')}}></div>
    )
  }
  return (
    <div>
      <div className='col-lg-12 aboutus-wrapper'>
        <Image src={aboutusEn} alt={t('nav.nav_contact_us')} />
      </div>
      <section className="m-5" >
        {/* profile */}
        <div className='row'>
          <div className="description col-lg-6">
            <SectionHeader title={t('about_us.text_company_profile')} showDesc={false} showSperator={false} titleClass="justify-content-start" />
            {renderDesc()}
          </div>
          <div className='col-lg-6 hvr-grow'>
            <Image className='mt-3 ' src={factory} alt="aboutus"/>
          </div>
        </div>
        {/* advantage */}
        <div className="row mt-5">
          {/* <div className="col-md-8"> */}
         {
           advantages.map((item: any)=>{
            const { title, desc, IconComp} = item
              return (
                <div className='col-ms-3 d-flex flex-column justify-content-start align-items-center col-lg-3 mt-5'key={title}> 
                  <div className='d-flex justify-content-center align-items-center' style={{width: '64px', height: '64px', backgroundColor: 'var(--bs-gray-300)', borderRadius: '50%'}}>
                    <IconComp size={42} style={{color: 'var(--bs-primary)'}}/>
                  </div>
                  <h4 className='mt-5 mb-4 text-primary text-center'>{title}</h4>
                  <div className='text-center'>{desc}</div>
                </div>
              )
          })
         }
          {/* </div> */}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
