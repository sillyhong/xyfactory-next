import SectionHeader from '@/components/SectionHeader';
import { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import Carousel from '../../../../../components/Carousel'
import { ProductCategoriesLabel } from '../../../../../constants';



function ProductItemInfo({ productItem, id }: any) {
  const { srcArr, profile, detail = {}, desc } = productItem


  const renderProdileTable = useMemo(() => {
    const values: any = Object.values(profile)
    return (
      <Table striped bordered hover variant="primary" className="product-info-table" style={{ marginTop: '36px', tableLayout: 'fixed' }}>
        <tbody>
          <tr >
            {/* <td className='fw-bold' colSpan={2}>Product Information</td> */}
          </tr>
          {
            Object.keys(profile).map((item, index): any => {
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
  }, [profile])

  const renderDetailTable = useMemo(() => {
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
      <div className="row">
        <div className='col-lg-6 '>
          <Carousel carouselList={srcArr || []} />
        </div>
        <div className='col-lg-6 d-flex flex-column'>
          <div>{desc}</div>
          <div className="divider"></div>
          <div className="product-category">
            {/* @ts-ignore */}
            category: {ProductCategoriesLabel[`${id}`] || 'something go wrong'}
          </div>
          {renderProdileTable}
        </div>

      </div>
      <hr />
      <div className="row">
        <div className='col-lg-12'>
          <SectionHeader title="Description" titleClass='justify-content-start' showDesc={false} showSperator={false}/>
          {renderDetailTable}
        </div>
      </div>
    </section>
  );
}

export default ProductItemInfo


