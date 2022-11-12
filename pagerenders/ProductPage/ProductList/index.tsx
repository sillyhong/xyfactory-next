import { useMemo} from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { ProductInfos } from '../../../constants/productInfo'


function ProductList() {
  const { t } = useTranslation('common')

    const showFirstFromAll = useMemo(()=>{
        /* 只展示每个系列的第一项 */
        const showProducts: any = []
        const currentProductInfos: any = ProductInfos(t)
        const productKeys = Object.keys(currentProductInfos)
        productKeys.forEach(key=>{
            const firstProduct = currentProductInfos[key]?.[0]
            if(firstProduct && !showProducts.includes(firstProduct))
            showProducts.push(firstProduct)
        })
        return showProducts
    }, [t])

    const router = useRouter()
    const hanndleProductItemClick = (path: string) => {
        router.push(path)

    }
    return (
        <section
            className='pt-4 pb-5 sectionWrapper'
            data-aos="fade-up"
        >
            <div className="row">
                {
                    showFirstFromAll.map((item: any, index: string) => {
                        return (
                            <div className='col-lg-3 hotProductWrapper hvr-grow' key={item.desc + index} onClick={() => { hanndleProductItemClick(item.path) }}>
                                <div className={`card overlay overlay-black align-items-center text-white shadow-sm border-0`}>
                                    <Image className="card-img" src={item.src} alt={item.desc} />
                                    <div className="card-img mt-5 d-flex align-items-center text-center">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary ">{item.desc}</h5>
                                           <Button variant="primary" className='btn-round'>{t('home_about_us.text_view_more')}</Button>
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


