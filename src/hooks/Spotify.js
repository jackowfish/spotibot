import { useRef, useState, useEffect } from 'react';
const SPOTIFY_CLIENT = '56153466382340898b836bdbf32f22c7';
const BASE_64 = 'NTYxNTM0NjYzODIzNDA4OThiODM2YmRiZjMyZjIyYzc6YzhiMzMxMWU2NmE5NDdhZTliY2QyN2NmZTEwZWU2OTI='
const REDIRECT_URI = 'http://localhost:3000';

export let SpotifyLogin = () => {
    let scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
    window.location.href = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
}

export let getSpotifyToken = (code) => {
    return fetch('https://accounts.spotify.com/api/token' +
    '?grant_type=authorization_code' +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&code=' + code, {
        headers: {
            'Authorization' : "Bearer " + BASE_64,
        },
    })
}

export const useSpotifyToken = (code) => {
    const [token, setToken] = useState(null);
    const loaded = useRef(false);
    useEffect(() => {
        if (!loaded.current && code !== null) {
        const getAndSetToken = async () => {
                const fetchedToken = await getSpotifyToken(code);
                setToken(fetchedToken);
                // Commented out so daycards reload when requested.
                loaded.current = true;
            }
            getAndSetToken();
        }
    }, [code])
    return token;
}

const getUID = async (accessCode) => {
    return fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        mode: 'cors'
    }).then(response => response.json()).then(data => {
        console.log(data);
        return data;
    });
};

export const useUID = (accessCode) => {
    const [uid, setUID] = useState(null);
    const loaded = useRef(false);
    useEffect(() => {
        if (!loaded.current) {
        const getAndSetUID = async () => {
                const fetchedUID = await getUID(accessCode);
                setUID(fetchedUID);
                // Commented out so daycards reload when requested.
                // loaded.current = true;
            }
            getAndSetUID();
        }
    }, [accessCode])
    return uid;
}
export default SpotifyLogin;