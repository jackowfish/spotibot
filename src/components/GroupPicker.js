import {Button, ListGroup, Spinner, Image, Container, Col, Row, Jumbotron, Dropdown} from 'react-bootstrap';
import './GroupPicker.css';
import logo from '../images/Spotibot.png';

let GroupPicker = ({groups, groupIDSender = () => {}, playlistMadeSender = () => {}, loading = false}) => {
  if(! groups) {
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
           <Jumbotron>
              <h1>Oops!</h1>
              <p>
                Looks like there aren't any groups you've joined! Join a group in GroupMe to access this app.
              </p>
              &nbsp;
              <p>
                <Button variant="dark"> Click here to return to retry! </Button>
              </p>
            </Jumbotron>
           </Row>
        </Col>
        <Col md={4}>
        </Col>
        </Container>
      </div>
    );
  }
  groups = groups.response;
  let groupArr = [];
  for(let i = 0; i < groups.length; i++) {
     groupArr.push([groups[i].id, groups[i].name])
  }
  groupArr.sort(function(a, b) {
    if(a[1] < b[1]) { return -1; }
    if(a[1] > b[1]) { return 1; }
    return 0;
  });

  // let handleGroupSelect = (id) => {
  //   groupIDSender(id);
  // }

  let GroupList = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          List Groups
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {groupArr.map(item => (
              <div>
                <Dropdown.Item onSelect={() => {
                  groupIDSender(item[0]);
                  playlistMadeSender(false);
                }} key={item[0]}>{item[1]}</Dropdown.Item>
              </div>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  if (!loading) {
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
              <GroupList/>
            </Row>
        </Col>
        <Col md={4}>
        </Col>
        </Container>
      </div>
    );
  } else {
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
          <Row style={{justifyContent:'center', paddingLeft:'15px'}}>
            <h1>
              Loading...
            </h1>
          </Row>
            <Row style={{justifyContent:'center', paddingTop:'15px'}}>
              <Spinner animation="border" variant="dark" />
            </Row>
        </Col>
        <Col md={4}>
        </Col>
        </Container>
      </div>
    );
  }
  
}
  

export default GroupPicker;
