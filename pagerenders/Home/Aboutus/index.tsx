import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import SectionHeader from '@components/SectionHeader';
import factory from '@assets/images/aboutus/factory.jpg'
function Aboutus() {
  const { t} = useTranslation('common')

  const router  = useRouter()
  const handleViewMoreClick  = () => {
    router.push('/about')
  }
  const renderDesc = () => {
    return (
       <div dangerouslySetInnerHTML={{__html: t('home_about_us.text_homepage_about_us')}}></div>
    )
  }
  return (
    <>
      <section
        className='pt-4 pb-5 sectionWrapper'
        data-aos="fade-up"
      >
       <SectionHeader title={t('home_sub_header.about_us')}/>
        <div className="row">
          <div className="col-lg-6">
              <Image src={factory} alt='factory' className='hvr-grow'/>
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
            {renderDesc()}
            <Button variant='primary' className="btn-round mt-3" onClick={handleViewMoreClick}>{t('home_about_us.text_view_more')}</Button>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Aboutus;
