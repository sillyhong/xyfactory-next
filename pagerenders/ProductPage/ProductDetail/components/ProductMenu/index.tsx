import { useRouter } from 'next/router';
import ListGroup from 'react-bootstrap/ListGroup';
import { ProductCategories } from '../../../../../constants/index';

function ProductMenu({handleMenuClick}: any) {

  const router = useRouter();
  const asPath = router?.asPath || ''
    
    const handleItemClick = (path: string) => {
        router.push(path)
        handleMenuClick && handleMenuClick()
    }
    

    return (
        <div className='col-lg-12'>
            <h5 className="h5 mb-4 d-flex justify-content-center fw-bold">Products Category</h5>
            <ListGroup>
                {
                    ProductCategories.map((item)=>{
                        return (
                            <ListGroup.Item style={{transition: 'all 0.5s'}} variant="primary" key={item.path}  active={asPath.includes(item.key)} onClick={()=>{handleItemClick(item.path)}}>
                            {item.label}
                        </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
    </div>

  );
}

export default ProductMenu;
