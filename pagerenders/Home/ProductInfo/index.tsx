import { useMemo } from 'react';
import Image from 'next/image';
import SectionHeader from '@components/SectionHeader';
import hot1 from '@assets/images/hot/hot-1.jpg';
import hot2 from '@assets/images/hot/hot-2.jpg';
import hot3 from '@assets/images/hot/hot-3.jpg';
import hot4 from '@assets/images/hot/hot-4.jpg';


function ProductInfo() {
  const hotProducts = useMemo(() => {
    return [
      {
        src: hot1,
        title: 'Glass Door Handle',
        desc: 'Glass Door Handle',
        path: '/product#handle',
      },
      {
        src: hot2,
        title: 'Shower Hinges',
        desc: 'Shower Hinges',
        path: '/product#shower-hinge'

      },
      {
        src: hot3,
        title: 'Pipe Connector',
        desc: 'Pipe Connector',
        path: '/product#glass-connection'
      },
      {
        src: hot4,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
    ]
  }, [])

  return (
    <>
      <section
        className='pt-4 pb-5 sectionWrapper'
        data-aos="fade-up"
      >
       <SectionHeader title='Product Categories'/>
        <div className="row">
          {
            hotProducts.map((item, index) => {
              return (
                <div className='col-lg-3 d-flex justify-content-center hotProductWrapper' key={item.desc + index}>
                  <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                    <Image className="card-img" src={item.src} alt={item.title} />
                    <div className=" d-flex align-items-center text-center">
                      <div className="card-body">
                        <h3 className='card-title customCardTitle'>{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      
    </>
  );
}

export default ProductInfo;
