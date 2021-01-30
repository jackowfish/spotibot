import {Button, Image, Container, Col, Row} from 'react-bootstrap';
import './App.css'
import logo from './images/Spotibot.png'
import {GroupMeLogin, getGroupMeGroups} from './GroupMe.js'

function App() {
  let url = window.location.href;
  let accessToken = '';
  if(url.includes('access_token')) {
    accessToken = url.split('=')[1]
  }
  if(accessToken !== '') {
    let data = getGroupMeGroups(accessToken);
    console.log(data);
  }
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
          <div >
          <Button variant="dark" size="lg" block style={{width: '30vh'}} onClick={() => {GroupMeLogin()}}>
            Start
          </Button>
          </div>
         </Row>
      </Col>
      <Col md={4}>
      </Col>
      </Container>
    </div>
  );
}

export default App;
