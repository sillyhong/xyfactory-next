import { useCallback, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import Image from 'next/image'
import { ProductInfos } from '../../../../../constants/productInfo'
import { ProductCategoriesKey } from '../../../../../constants/index'
import styles from './index.module.css'
import { useTranslation } from 'next-i18next'


function ProductItemList({ id, handleProductItemClick }: any) {
  const { t } = useTranslation('common')

  //ProductInfos(t) 会更新，但是通过 props 传参， 子组件不会更新
  //  子组件监听i8n变化？
   // @ts-ignore
    const prodcutItem: any = useMemo(()=>{
      console.log('ProductInfos(t)', ProductInfos(t)[id as ProductCategoriesKey])
      return ProductInfos(t)[id as ProductCategoriesKey]
    }, [id, t])

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
                            <div className='col-lg-3 d-flex justify-content-center hotProductWrapper hvr-grow' key={'productItem' + index} onClick={()=>{handleItemClick(item)}}>
                            <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                              <Image className="card-img" src={item.src} alt={item.desc} />
                              <div className=" d-flex align-items-center text-center">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                  <h3 className={`card-title  ${styles.customCardTitle}`}>{item.desc}</h3>
                                  <Button variant="primary" className="btn-round">{t('product.btn_detail')}</Button>
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


