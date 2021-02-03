import {Button, ListGroup, Spinner, Image, Container, Col, Row, Jumbotron, Dropdown} from 'react-bootstrap';
import './PlaylistMaker.css';
import {useUID} from '../hooks/Spotify.js'
import logo from '../images/Spotibot.png';

let PlaylistMaker = (UIDsender = () => {}) => {
  return (
    <div className="App">
    <Container fluid style={{height: '100vh', display: 'flex'}}>
      <Col md={4}>
      </Col>
      <Col md={4} style={{justifyContent:'center'}}>
        <Row style={{justifyContent:'center'}}>
          <div>
              <Image style={{flex:1, height: '50vh', width: undefined}} src={logo}/>
          </div>
        </Row>
        <Row style={{justifyContent:'center', paddingTop:'15px'}}>
          <Button variant="dark"> Click here to get UID! </Button>
        </Row>
      </Col>
      <Col md={4}>
      </Col>
      </Container>
    </div>
  );
}
  

export default PlaylistMaker;
