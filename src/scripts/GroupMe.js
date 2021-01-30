const GROUPME_CLIENT = 'Nf3qXOSjWPCO7vncXGeu8s5OD0ga2bjzBEdNAw16VuYK4vwt';
const GROUPME_URL = 'https://api.groupme.com/v3'

export let GroupMeLogin = () => {
    window.location.href = "https://oauth.groupme.com/oauth/authorize?client_id=" + GROUPME_CLIENT;
}

export let getGroupMeGroups = async (accessToken) => {
    let groups = [];
    fetch(GROUPME_URL + '/groups?token=' + accessToken, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {groups = data.response; console.log(data.response)});
    return groups;
}

export default GroupMeLogin
