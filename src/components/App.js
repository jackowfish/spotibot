import {Button, Image, Container, Col, Row} from 'react-bootstrap';
import './App.css'
import logo from '../images/Spotibot.png'
import {GroupMeLogin, useGroups, useMessages} from '../hooks/GroupMe'
import {SpotifyLogin, useSpotifyToken} from '../hooks/Spotify'
import GroupPicker from './GroupPicker'
import PlaylistMaker from './PlaylistMaker.js'
import Cookies from 'universal-cookie';
import React from 'react';

function App() {
  let url = window.location.href;
  let accessToken = '';
  let code = '';
  let cookies = new Cookies();

  if(url.includes('access_token') && !url.includes('refresh_token')) {
    cookies.remove('GMAccessToken');
    accessToken = url.split('=')[1];
    cookies.set('GMAccessToken', accessToken, { path: '/' });
  }
  if(url.includes('code') && cookies.get('SpotifyCode') == null) {
    cookies.remove('SpotifyCode');
    code = url.split('=')[1];
    cookies.set('SpotifyCode', code, { path: '/' });
  }

  const groups = useGroups(cookies.get('GMAccessToken'));
  // const uid = useUID(cookies.get('SpotifyCode'))
  const [groupID, setGroupID] = React.useState(null); // the lifted state
  const messageInfo = useMessages(cookies.get('GMAccessToken'), groupID);
  const messages = messageInfo[0];
  const loading = messageInfo[1];
  const [spotifyLinks, setSpotifyLinks] = React.useState(null);
  const [spotifyPlaylistMade, setSpotifyPlaylistMade]  = React.useState(null);
  const spotifyAuth = useSpotifyToken(cookies.get('spotifyCode'));
  // console.log(encodeURIComponent('http://localhost:3000'));
  // console.log({spotifyAuth});

  const groupIDSender = (id) => { 
    setGroupID(id);
  };


  const playlistMadeSender = (bool) => {
    setSpotifyPlaylistMade(bool);
  }


  let gmButtonText = !cookies.get('GMAccessToken') ? 'GroupMe Login' : 'GroupMe Logged In!'
  let spotifyButtonText = !cookies.get('SpotifyCode') ? 'Spotify Login' : 'Spotify Logged In!'

  if(cookies.get('SpotifyCode') && cookies.get('GMAccessToken') && spotifyLinks == null && !loading) {
    console.log('GM Access Token:');
    console.log(cookies.get('GMAccessToken'));
    console.log('Spotify Access Code:');
    console.log(cookies.get('SpotifyCode'));
    // if(messages === null) {
    if (messages !== null && spotifyPlaylistMade === false) {
      let messageTexts = [];
      for(let i = 0; i < messages.length; i++) {
        for(let j = 0; j < messages[i].length; j++) {
          messageTexts.push(messages[i][j].text)
        }
      }
      const result = messageTexts.filter(word => word.includes('open.spotify.com/track/'));
      setSpotifyLinks(result)
      setSpotifyPlaylistMade(true);
    } 
    return (
      <GroupPicker groups={groups} groupIDSender={groupIDSender} playlistMadeSender={playlistMadeSender}/>
    );
    // }
  } else if(!cookies.get('SpotifyCode') || !cookies.get('GMAccessToken')) {
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
            <Button variant="info" size="lg" block style={{width: '30vh', opacity: 0.9}} onClick={() => {GroupMeLogin()}}>
              {gmButtonText}
            </Button>
           </Row>
           <Row style={{justifyContent:'center', paddingTop:'20px'}}>
            <Button variant="success" size="lg" block style={{width: '30vh', opacity: 0.9}} onClick={() => {SpotifyLogin()}}>
              {spotifyButtonText}
            </Button>
           </Row>
        </Col>
        <Col md={4}>
        </Col>
        </Container>
      </div>
    );
  } else {
    if(loading) {
      return (
        <GroupPicker groups={groups} groupIDSender={groupIDSender} playlistMadeSender={playlistMadeSender} loading={true}/>
      );
    } else {
      return (
        <PlaylistMaker/>
        // Build Spotify Playlist Manager
      );
    }
  }
}

export default App;
