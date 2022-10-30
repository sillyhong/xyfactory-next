import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ContactUs } from '@constants/contactus';
import Image from 'next/image';



function Contactus() {
  const handleFormSubmit = (e: any) => {
    const form = e.currentTarget
    const { formBasicName, formBasicEmail, formBasicTel, formBasicMessage} = form
    e.preventDefault()
    console.log('handleFormSubmit', { formBasicName: formBasicName.value, formBasicEmail: formBasicEmail.value, formBasicTel: formBasicTel.value, formBasicMessage: formBasicMessage.value });
    // write info to file

  }

  const renderForm = () => {
    return (
      <Form onSubmit={handleFormSubmit} >

        <Form.Group className="mb-3 col-md-6" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="tesx" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
          <Form.Text className="text-muted d-block  mt-1">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3 col-md-6" controlId="formBasicTel">
          <Form.Label>Tel</Form.Label>
          <Form.Control required type="telephone" placeholder="Enter Tel" />
          <Form.Text className="text-muted  d-block  mt-1">
            We'll never share your Tel with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 col-md-6" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Message" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
  return (
    <>
      <div className="row m-3">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {ContactUs.map((item, index) => {
            const { label, connects, notShowInContactPage } = item || {}
            if (notShowInContactPage) return null
            return (
              <Accordion.Item eventKey={index + ''} key={item.label + index}>
                <Accordion.Header>{label}</Accordion.Header>
                <Accordion.Body>
                  <div className='justify-content-start'>

                    {
                      connects && connects.map((connect: any, connectIndex) => {
                        const { name, value, qrcode } = connect || {}
                        return (
                          <div key={'code' + connectIndex} className="col-md-6">
                            {name && <div className='fw-bold'>{name}</div>}
                            {value && <div className='fw-bold '>{value}</div>}
                            {qrcode && <Image src={qrcode} key={'code' + connectIndex} alt={label} />}
                          </div>
                        )
                      })
                    }
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>

      </div>
      <div className="row m-3">
        <h3 className='my-3'>Post your feedback
          <hr /></h3>

        {renderForm()}
      </div>
    </>


  );
}

export default Contactus;
