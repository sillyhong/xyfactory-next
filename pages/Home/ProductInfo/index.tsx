// import Card from 'react-bootstrap/Card';
import styles from './index.module.css';
import Image from 'next/image';
import hot1 from '../../../assets/images/hot/hot1.jpg';
import hot2 from '../../../assets/images/hot/hot2.jpg';
import hot3 from '../../../assets/images/hot/hot3.jpg';
import hot4 from '../../../assets/images/hot/hot4.jpg';
import { useMemo } from 'react';


function ProductInfo() {
  const hotProducts = useMemo(() => {
    return [
      {
        src: hot1,
        title: 'Glass Door Handle',
        desc: 'Glass Door Handle'
      },
      {
        src: hot2,
        title: 'Shower Hinges',
        desc: 'Shower Hinges'
      },
      {
        src: hot3,
        title: 'Pipe Connector',
        desc: 'Pipe Connector'
      },
      {
        src: hot4,
        title: 'Single-hole Door Handle',
        desc: 'Single-hole Door Handle'
      },
    ]
  }, [])

  return (
    <>
      <section
        className={`pt-4 pb-5 ${styles.sectionWrapper}`}
        data-aos="fade-up"
      >
        <h2 className="h2 mb-4 d-flex justify-content-center fw-bold">Hot Products</h2>
        <h4 className="h4 mb-4 d-flex justify-content-center fw-normal">Xianying Hardware</h4>
        <div className="row">
          {
            hotProducts.map(item => {
              return (
                <div className={`col-lg-3 d-flex justify-content-center ${styles.hotProductWrapper}`} key={item.desc}>
                  <div className={`card overlay overlay-black  align-items-center text-white shadow-sm border-0 ${styles.cardWrapper}`}>
                    <Image className="card-img" src={item.src} alt={item.title} />
                    <div className="card-img-overlay d-flex align-items-center text-center">
                      <div className="card-body">
                        {/* <h3 className="card-title">{item.title}</h3> */}
                        {/* <p className="card-text text-muted">
                          {item.desc}
                        </p> */}
                        {/* <a href="#" className="btn btn-info btn-round">
              Do anything
            </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          {/* <div className="col-lg-6">
            <div className="card bg-dark overlay overlay-black text-white shadow-sm border-0">
            <Image  className="card-img" src={Logo} alt="Card image" />
              <div className="card-img-overlay d-flex align-items-center text-center">
                <div className="card-body">
                  <h3 className="card-title">Overlay center align</h3>
                  <p className="card-text text-muted">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-info btn-round">
                    Do anything
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card bg-dark overlay overlay-blue text-white shadow-sm border-0 mt-sm-4 mt-lg-0">
              <Image
                className="card-img"
                src={Logo}
                alt="Card image"
              />
              <div className="card-img-overlay d-flex align-items-center text-center">
                <div className="card-body">
                  <h3 className="card-title">Special title treatment</h3>
                  <p className="card-text">Perhaps you need a button</p>
                  <a href="#" className="btn btn-purple btn-round">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* <Card>
        <Card.Img variant="top" src="../../../assets/images/logo.png" />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card> */}
      {/* <br />
      <Card>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src="../../../assets/images/logo.png" />
      </Card> */}
    </>
  );
}

export default ProductInfo;
