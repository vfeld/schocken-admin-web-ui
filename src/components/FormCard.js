import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';



const FormCard = (props) => {

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col />
          <Col>
            <Card style={{ width: '400px' }} >
              <Card.Header as='h3' >{props.title}</Card.Header>
              <Card.Body>
                {props.children}
              </Card.Body>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
};

export default FormCard;


