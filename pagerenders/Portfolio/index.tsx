import React, { useMemo } from 'react';
import Image from 'next/image';

import portfolio1 from '@assets/images/portfolio/portfolio-1.jpg';
import portfolio2 from '@assets/images/portfolio/portfolio-2.jpg';
import portfolio3 from '@assets/images/portfolio/portfolio-3.jpg';
import portfolio4 from '@assets/images/portfolio/portfolio-4.jpg';
import portfolio5 from '@assets/images/portfolio/portfolio-5.jpg';
import portfolio6 from '@assets/images/portfolio/portfolio-6.jpg';
import portfolio7 from '@assets/images/portfolio/portfolio-7.jpg';
import portfolio8 from '@assets/images/portfolio/portfolio-8.jpg';
import portfolio9 from '@assets/images/portfolio/portfolio-9.jpg';
import portfolio10 from '@assets/images/portfolio/portfolio-10.jpg';
import portfolio11 from '@assets/images/portfolio/portfolio-11.jpg';
import portfolio12 from '@assets/images/portfolio/portfolio-12.jpg';


const Home = () => {
  const Portfolios = useMemo(() => {
    
    return [
      {
        src: portfolio1,
        title: 'Glass Door Handle',
        desc: 'Glass Door Handle',
        path: '/product#handle'
      },
      {
        src: portfolio2,
        title: 'Shower Hinges',
        desc: 'Shower Hinges',
        path: '/product#shower-hinge'
      },
      {
        src: portfolio3,
        title: 'Pipe Connector',
        desc: 'Pipe Connector',
        path: '/product#glass-connection'
      },
      {
        src: portfolio4,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio5,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio6,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio7,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio8,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio9,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio10,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio11,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
      {
        src: portfolio12,
        title: 'Door Knobs',
        desc: 'Door Knobs',
        path: '/product#handle'
      },
    ]
  }, [])
  return (
    <section className='sectionWrapper'>
        <div className="row">
          {
            Portfolios.map(item => {
              return (
                <div className='col-lg-4 d-flex justify-content-center hotProductWrapper default-margin-top' key={item.desc}>
                  <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                    <Image className="card-img" src={item.src} alt={item.title} />
                    {/* <div className="d-flex align-items-center text-center">
                      <div className="card-body">
                        <h3 className="card-title">{item.title}</h3>
                      </div>
                    </div> */}
                  </div>
                </div>
              )
            })
          }
        </div>
    </section>
  )
};

export default Home;
