import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import Image from 'next/image';
import SectionHeader from '@components/SectionHeader';
import { ProductInfos } from '../../../constants/productInfo'
import { useMemo } from 'react';


function ProductInfo() {
  const { t } = useTranslation('common')
  const router = useRouter();

  const hotProducts = useMemo(() => {
    const productInfos = ProductInfos(t)
    const homeHotProducts: any[] = []
    Object.values(productInfos).forEach((item: any) => {
      return item.forEach((subItem: any) => {
        if (subItem?.homeHot === true && !homeHotProducts.includes(subItem)) {
          homeHotProducts.push(subItem)
        }
      })

    })
    return homeHotProducts;
  }, [t])

  const handleItemClick = (item: any) => {
    router.push(item.path)
  }

  return (
    <>
      <section
        className='pt-4 pb-5 sectionWrapper'
        data-aos="fade-up"
      >
        <SectionHeader title={t('home_hot_product.sub_title')} />
        <div className="row">
          {
            hotProducts.map(item => {
              return (
                <div className='col-lg-3 d-flex justify-content-center hotProductWrapper hvr-grow' key={item.desc} onClick={() => { handleItemClick(item) }}>
                  <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                    <Image className="card-img" src={item.src} alt={item.title} />
                    <div className="d-flex align-items-center text-center">
                      <div className="card-body">
                        <h3 className="card-title">{item.title}</h3>
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
