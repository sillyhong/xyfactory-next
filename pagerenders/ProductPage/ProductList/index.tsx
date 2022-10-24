import { useMemo} from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { ProductInfos } from '../../../constants/productInfo'


function ProductList() {
  const { t } = useTranslation('common')

    const currentProductInfos  = useMemo(()=>{
        return ProductInfos(t)
    }, [t])

    const productIds = useMemo(()=>{
        return Object.keys(ProductInfos(t))
    }, [t])

    const router = useRouter()
    const hanndleProductItemClick = (id: string) => {
        // const productItem 
        router.push(`/product#${id}`)

    }

    return (
        <section
            className='pt-4 pb-5 sectionWrapper'
            data-aos="fade-up"
        >
            <div className="row">
                {
                    // Object.values(ProductInfos).flat().map((item, index) => {
                    productIds.map((id, index) => {
                        //@ts-ignore
                        const item = currentProductInfos[id]?.[0]
                        console.log('item123', item);

                        return (
                            <div className='col-lg-3 hotProductWrapper' key={item.desc + index} onClick={() => { hanndleProductItemClick(id) }}>
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


