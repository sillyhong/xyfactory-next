import { useCallback } from 'react'
import { Button } from 'react-bootstrap'
import Image from 'next/image'
import { ProductInfos } from '../../../../../constants/productInfo'
import { ProductCategoriesKey } from '../../../../../constants/index'
import styles from './index.module.css'


function ProductItemList({ id, handleProductItemClick }: any) {
   // @ts-ignore
    const prodcutItem = ProductInfos[id as ProductCategoriesKey]
    console.log('id', id, 'prodcutItem', prodcutItem)

    const handleItemClick = useCallback(
      (productItem: any) => {
        handleProductItemClick && handleProductItemClick(productItem)
      },
      [handleProductItemClick],
    )
    

    return (
        <section
            className='pt-4 pb-5'
            data-aos="fade-up"
        >
            <div className="row">
                {
                    prodcutItem && prodcutItem.map((item: any, index: string) => {
                        return (
                            <div className='col-lg-3 d-flex justify-content-center hotProductWrapper' key={item.desc + index}>
                            <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                              <Image className="card-img" src={item.src} alt={item.desc} />
                              <div className=" d-flex align-items-center text-center">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                  <h3 className={`card-title  ${styles.customCardTitle}`}>{item.desc}</h3>
                                  <Button variant="primary" className="btn-round" onClick={()=>{handleItemClick(item)}}>Details</Button>
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

export default ProductItemList


