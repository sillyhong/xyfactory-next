import Image from 'next/image'
import { ProductInfos } from '../../../constants/productInfo'
import { ProductCategoriesKey } from '../../../constants/index'
import { useTranslation } from 'next-i18next'

/* 产品详情页 简介 */
function ProductDetail({ id }: any) {
  const { t } = useTranslation('common')

   // @ts-ignore
    const prodcutItem = useMemo(()=>{
        return ProductInfos(t)[id as ProductCategoriesKey]
    }, [id, t])

    return (
        <section
            className='pt-4 pb-5 sectionWrapper'
            data-aos="fade-up"
        >
            <div className="row">
                {
                    prodcutItem && prodcutItem.map((item: any, index: string) => {

                        return (
                            <div className='col-lg-3 hotProductWrapper hvr-grow' key={ 'product-profile'+ index}>
                                <div className={`card overlay overlay-black  align-items-center text-white shadow-sm border-0`}>
                                    <Image className="card-img" src={item.src} alt={item.desc} />
                                    <div className="card-img-overlay d-flex align-items-center text-center">
                                        <div className="card-body">
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

export default ProductDetail


