import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import SectionHeader from '@components/SectionHeader';
import { ProductInfos } from '../../../constants/productInfo'



function ProductInfo() {
  const { t } = useTranslation('common')

  const newProducts = useMemo(() => {
    const productInfos = ProductInfos(t)
    const homeNewProducts: any[] = []
    Object.values(productInfos).forEach((item: any) => {
      return item.forEach((subItem: any) => {
        if (subItem?.homeNew === true && !homeNewProducts.includes(subItem)) {
          homeNewProducts.push(subItem)
        }
      })

    })
    return homeNewProducts;
  }, [t])

  return (
    <>
      <section
        className='pt-4 pb-5 sectionWrapper'
        data-aos="fade-up"
      >
        <SectionHeader title={t('home_product_categories.sub_title')} />
        <div className="row">
          {
            newProducts.map((item, index) => {
              return (
                <div className='col-lg-3 d-flex justify-content-center hotProductWrapper hvr-pulse' key={item.desc + index}>
                  <div className='card overlay overlay-black  align-items-center text-white shadow-sm border-0'>
                    <Image className="card-img" src={item.src} alt={item.title} />
                    <div className=" d-flex align-items-center text-center">
                      <div className="card-body">
                        <h3 className='card-title customCardTitle'>{item.title}</h3>
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
