import { useCallback, useMemo, useState } from 'react'
import ProductMenu from './components/ProductMenu'
import ProductItemList from './components/ProductItemList'
import ProductItemInfo from './components/ProductItemInfo'



function ProductDetail({ id }: any) {
    const [producItemDetailShow, setProducItemDetailShow] = useState(false)
    const [selectedProductItem, setSelectedProductItem] = useState({})

    const handleProductItemClick = useCallback((productItem: any) => {
        if (!producItemDetailShow) {
            setProducItemDetailShow(true)
            setSelectedProductItem(productItem)
        }
    }, [producItemDetailShow])

    const handleMenuClick = useCallback(()=>{
        setProducItemDetailShow(false)
        setSelectedProductItem({})
    }, [])

    const renderProductDetail = useMemo(() => {

        if (producItemDetailShow) {
        console.log('renderProductDetail', selectedProductItem);
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
                <div className="col-lg-3">
                    <ProductMenu handleMenuClick={handleMenuClick}/>
                </div>
            </div>
        </>

    )

}

export default ProductDetail


