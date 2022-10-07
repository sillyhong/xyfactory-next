import { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import Carousel from '../../../../../components/Carousel'
import { ProductCategoriesLabel } from '../../../../../constants';



function ProductItemInfo({ productItem, id }: any) {
  const { srcArr, detail, desc } = productItem


  const renderTable = useMemo(() => {
    const values: any = Object.values(detail)
    return (
      <Table striped bordered hover variant="primary" className="product-info-table" style={{ marginTop: '36px', tableLayout: 'fixed' }}>
        <tbody>
          <tr >
            <td className='fw-bold' colSpan={2}>Product Information</td>
          </tr>
          {
            Object.keys(detail).map((item, index): any => {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{values[index]}</td>
                </tr>

              )
            })
          }

        </tbody>
      </Table>
    )
  }, [detail])

  return (
    <section
      className='pt-4 pb-5 sectionWrapper'
      data-aos="fade-up"
    >
      <div className="row ">
        <div className='col-lg-6 d-flex justify-content-center '>
          <Carousel carouselList={srcArr || []} />
        </div>
        <div className='col-lg-6 d-flex flex-column'>
          <div>{desc}</div>
          <div className="divider"></div>
          <div className="product-category">
            {/* @ts-ignore */}
            category: {ProductCategoriesLabel[`${id}`] || 'something go wrong'}
          </div>
        </div>

      </div>
      <div className="row">
        <div className='col-lg-6'>
          {renderTable}
        </div>
      </div>
    </section>
  );
}

export default ProductItemInfo


