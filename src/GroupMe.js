const GROUPME_CLIENT = 'Nf3qXOSjWPCO7vncXGeu8s5OD0ga2bjzBEdNAw16VuYK4vwt';
const GROUPME_URL = 'https://api.groupme.com/v3'

let GroupMeLogin = () => {
    window.location.href = "https://oauth.groupme.com/oauth/authorize?client_id=" + GROUPME_CLIENT;
}

export default GroupMeLogin;