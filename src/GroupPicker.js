import {ListGroup, Image, Container, Col, Row} from 'react-bootstrap';
import './GroupPicker.css'
import logo from './images/Spotibot.png'
import {GroupMeLogin, getGroupMeGroups} from './scripts/GroupMe.js'
import {SpotifyLogin} from './scripts/Spotify.js'
import Cookies from 'universal-cookie';

function App() {
  let cookies = new Cookies();
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
        <Row style={{justifyContent:'center'}}>
          <h1>
            Pick a Group!
          </h1>
        </Row>
         <Row style={{justifyContent:'center', paddingTop:'15px'}}>
          <ListGroup as="ul">
            <ListGroup.Item as="li">
              Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item as="li">
              Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
         </Row>
      </Col>
      <Col md={4}>
      </Col>
      </Container>
    </div>
  );
}

export default App;
