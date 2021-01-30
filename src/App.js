import {Button, Image, Container, Col, Row} from 'react-bootstrap';
import './App.css'
import logo from './images/Spotibot.png'
import {GroupMeLogin, getGroupMeGroups} from './GroupMe.js'
import {SpotifyLogin} from './Spotify.js'
import Cookies from 'universal-cookie';

function App() {
  let url = window.location.href;
  let accessToken = '';
  let code = '';
  let cookies = new Cookies();
  if(url.includes('access_token')) {
    accessToken = url.split('=')[1]
    cookies.set('GMAccessToken', accessToken, { path: '/' });
  }
  if(url.includes('code')) {
    code = url.split('=')[1]
    cookies.set('SpotifyCode', code, { path: '/' });
  }
  console.log('GM Access Token:');
  console.log(cookies.get('GMAccessToken'));
  console.log('Spotify Access Code:');
  console.log(cookies.get('SpotifyCode'));
  if(cookies.get('GMAccessToken') !== undefined) {
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
          <Button variant="info" size="lg" block style={{width: '30vh'}} onClick={() => {GroupMeLogin()}}>
            GroupMe Login
          </Button>
         </Row>
         <Row style={{justifyContent:'center', paddingTop:'20px'}}>
          <Button variant="success" size="lg" block style={{width: '30vh'}} onClick={() => {SpotifyLogin()}}>
            Spotify Login
          </Button>
         </Row>
      </Col>
      <Col md={4}>
      </Col>
      </Container>
    </div>
  );
}

export default App;
