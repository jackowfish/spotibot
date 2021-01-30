const SPOTIFY_CLIENT = '56153466382340898b836bdbf32f22c7';
const REDIRECT_URI = 'http://localhost:3000'

export let SpotifyLogin = () => {
    let scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
    window.location.href = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
}

export default SpotifyLogin;