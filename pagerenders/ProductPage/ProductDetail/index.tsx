import { useCallback, useEffect, useMemo, useState } from 'react'
import ProductMenu from './components/ProductMenu'
import ProductItemList from './components/ProductItemList'
import ProductItemInfo from './components/ProductItemInfo'
import { useRouter } from 'next/router'
import { ProductInfos } from '../../../constants/productInfo'
import { useTranslation } from 'next-i18next'



/* 产品详情页 左边是 menu， 右面是栏目展示的产品 */
function ProductDetail({ productCateGory, id }: any) {
    const [producItemDetailShow, setProducItemDetailShow] = useState(false)
    const [selectedProductItem, setSelectedProductItem] = useState({})
    const router: any = useRouter()
    const { t } = useTranslation('common')



    useEffect(() => {
        if (id) {
            const productInfos: any = ProductInfos(t)
            const productsByCateGory = productInfos[productCateGory]
            if (productsByCateGory.length) {
                const product = productsByCateGory.find((item: any) => item.id === id)

                setSelectedProductItem(product)
                setProducItemDetailShow(true)

            }
        }

    }, [id, productCateGory, t])


    /* 点击产品 */
    const handleProductItemClick = useCallback((productItem: any) => {
        if (!producItemDetailShow) {
            setProducItemDetailShow(true)
            setSelectedProductItem(productItem)
            router.push(`/${router.locale}${productItem.path}`)
        }
    }, [producItemDetailShow, router])

    /* 点击菜单栏 */
    const handleMenuClick = useCallback(() => {
        setProducItemDetailShow(false)
        setSelectedProductItem({})
    }, [])

    const renderProductDetail = useMemo(() => {
        if (producItemDetailShow) {
            return (
                <div className="col-lg-9">
                    <ProductItemInfo productItem={selectedProductItem} productCateGory={productCateGory} />
                </div>
            )

        }
        return (
            <div className="col-lg-9">
                <ProductItemList productCateGory={productCateGory} handleProductItemClick={handleProductItemClick} />
            </div>
        )
    }, [producItemDetailShow, productCateGory, handleProductItemClick, selectedProductItem])

    return (
        <>
            <div className='row d-flex flex-row-reverse sectionWrapper product-detail-wrapper'>
                {renderProductDetail}
                <div className="col-lg-3 row">
                    <ProductMenu handleMenuClick={handleMenuClick} />
                </div>
            </div>
        </>

    )

}

export default ProductDetail


