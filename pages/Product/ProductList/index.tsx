import Image from 'next/image'
import { ProductInfos } from '../../constants/productInfo'


function ProductList() {
    return (
        <section
            className='pt-4 pb-5 sectionWrapper'
            data-aos="fade-up"
        >
            <div className="row">
                {
                    Object.values(ProductInfos).flat().map((item, index) => {

                        return (
                            <div className='col-lg-3 hotProductWrapper' key={item.desc + index}>
                                <div className={`card overlay overlay-black  align-items-center text-white shadow-sm border-0`}>
                                    <Image className="card-img" src={item.src} alt={item.desc} />
                                    <div className="card-img-overlay d-flex align-items-center text-center">
                                        <div className="card-body">
                                            {/* <h3 className="card-title">{item.title}</h3> */}
                                            {/* <p className="card-text text-muted">
                          {item.desc}
                        </p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default ProductList


