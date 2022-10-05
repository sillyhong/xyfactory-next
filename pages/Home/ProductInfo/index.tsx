import Card from 'react-bootstrap/Card';
import styles from './index.module.css';

function ProductInfo() {
  return (
    <>
      <section
        className={`pt-4 pb-5 ${styles.sectionWrapper}`}
        data-aos="fade-up"
      >
        <h2 className="h2 mb-4 font-weight-bold">Hot Products</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="card bg-dark overlay overlay-black text-white shadow-sm border-0">
              <img
                className="card-img"
                src="http://placeimg.com/640/480"
                alt="Card image"
              />
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
              <img
                className="card-img"
                src="http://placeimg.com/640/480"
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
          </div>
        </div>
      </section>
      {/* <Card>
        <Card.Img variant="top" src="http://placeimg.com/640/480" />
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
        <Card.Img variant="bottom" src="http://placeimg.com/640/480" />
      </Card> */}
    </>
  );
}

export default ProductInfo;
