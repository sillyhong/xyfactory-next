import { useCallback, useMemo, useState } from 'react'
import ProductMenu from './components/ProductMenu'
import ProductItemList from './components/ProductItemList'
import ProductItemInfo from './components/ProductItemInfo'


/* 产品详情页 左边是 menu， 右面是栏目展示的产品 */
function ProductDetail({ id }: any) {
    const [producItemDetailShow, setProducItemDetailShow] = useState(false)
    const [selectedProductItem, setSelectedProductItem] = useState({})

    /* 点击产品 */
    const handleProductItemClick = useCallback((productItem: any) => {
        if (!producItemDetailShow) {
            setProducItemDetailShow(true)
            setSelectedProductItem(productItem)
        }
    }, [producItemDetailShow])

    /* 点击菜单栏 */
    const handleMenuClick = useCallback(()=>{
        setProducItemDetailShow(false)
        setSelectedProductItem({})
    }, [])

    const renderProductDetail = useMemo(() => {
        if (producItemDetailShow) {
            return (
                <div className="col-lg-9">
                <ProductItemInfo productItem={selectedProductItem} id={id}/>
            </div>
            )
            
        }
        return (
            <div className="col-lg-9">
                <ProductItemList id={id} handleProductItemClick={handleProductItemClick} />
            </div>
        )
    }, [producItemDetailShow, id, handleProductItemClick, selectedProductItem])

    return (
        <>
            <div className='row d-flex flex-row-reverse sectionWrapper product-detail-wrapper'>
                {renderProductDetail}
                <div className="col-lg-3 row">
                    <ProductMenu handleMenuClick={handleMenuClick}/>
                </div>
            </div>
        </>

    )

}

export default ProductDetail


