import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import SectionHeader from '@components/SectionHeader';
import factory from '@assets/images/aboutus/factory.jpg'
import { useRouter } from 'next/router';
function Aboutus() {
  const router  = useRouter()
  const handleViewMoreClick  = () => {
    router.push('/about')
  }
  const renderDesc = () => {
    return (
      <div>
        <strong>Xiangying Glass Hardware Factory </strong>is 15 years factory with a focus on customer service, satisfaction and impeccable workmanship. We have advanced production equipment and a number of skillfull technical workers and we can offer you with the high quality products with competitive price.
        <br />
        <br />
        We have a lot experience to export all over the world, especially in Canada, Netherlands and Australia.
        <br />
        <br />
        We welcome all enquiries regarding Glass and Aluminium for Domestic, Architectural and Commercial applications.
     If you are insterested in our product, pls feel free to contact us.
      </div>
    )
  }
  return (
    <>
      <section
        className='pt-4 pb-5 sectionWrapper'
        data-aos="fade-up"
      >
       <SectionHeader title='About Us'/>
        <div className="row">
          <div className="col-lg-6">
              <Image src={factory} alt='factory'/>
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center">
            {renderDesc()}
            <Button variant='primary' className="btn-round mt-3" onClick={handleViewMoreClick}>View More</Button>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Aboutus;
