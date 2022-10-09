import React from 'react';
import Image from 'next/image'
import aboutusEn from '@assets/images/aboutus/aboutus-en.jpg';
import factory from '@assets/images/aboutus/factory.jpg';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';




const AboutUs = () => {

  const renderDesc = () => {
    return (
      <article className={styles.article}>
        Xiangying Glass Hardware Factory is 15 years factory with a focus on customer service, satisfaction and impeccable workmanship. We have advanced production equipment and a number of skillfull technical workers and we can offer you with the high quality products with competitive price.
        <br />
        <br />
        We have a lot experience to export all over the world, especially in US and Canada.
        <br />
        <br />
        We welcome all enquiries regarding Glass and Aluminium for Domestic, Architectural and Commercial applications.
        If you are insterested in our product, pls feel free to contact us.
      </article>
    )
  }
  return (
    <div>
      <div className='col-lg-12 aboutus-wrapper'>
        <Image src={aboutusEn} alt='aboutus' />
      </div>
      <section className="sectionWrapper default-margin-top" >
        <div className='row'>
          <div className="description col-lg-6">
            <SectionHeader title='Company Profile' showDesc={false} showSperator={false} titleClass="justify-content-start" />
            {renderDesc()}
          </div>
          <div className='col-lg-6'>
            <Image src={factory} alt="aboutus" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
