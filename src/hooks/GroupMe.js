import { useRef, useState, useEffect } from 'react';
const GROUPME_CLIENT = 'Nf3qXOSjWPCO7vncXGeu8s5OD0ga2bjzBEdNAw16VuYK4vwt';
const GROUPME_URL = 'https://api.groupme.com/v3'

export const GroupMeLogin = () => {
    window.location.href = "https://oauth.groupme.com/oauth/authorize?client_id=" + GROUPME_CLIENT;
}

const getGroups = async (accessToken) => {
    return fetch(GROUPME_URL + '/groups?token=' + accessToken + '&omit=memberships&per_page=300', {
        method: 'GET',
        mode: 'cors'
    }).then(response => response.json()).then(data => {
        return data;
    });
};

export const useGroups = (accessToken) => {
    const [groups, setGroups] = useState(null);
    const loaded = useRef(false);
    useEffect(() => {
        if (!loaded.current) {
        const getAndSetGroups = async () => {
                const fetchedGroups = await getGroups(accessToken);
                setGroups(fetchedGroups);
                // Commented out so daycards reload when requested.
                // loaded.current = true;
            }
            getAndSetGroups();
        }
    }, [accessToken])
    return groups;
}

const getMessages = async (accessToken, groupID, afterID = null, messages = []) => {
    let idParam = afterID ? '&after_id=' + afterID : '';
    return fetch(GROUPME_URL + '/groups/' + groupID + '/messages?token=' + accessToken + '&limit=100' + idParam, {
        method: 'GET',
        mode: 'cors'
    }).then(response => response.json()).then(data => {
        if(data.response !== undefined && data.meta.code === 200 && data.response.messages.length === 100) {
            afterID = data.response.messages[99].id;
            messages.push(data.response.messages);
            return getMessages(accessToken, groupID, afterID, messages);
        }
        return messages;
    });
};

export const useMessages = (accessToken, groupID) => {
    const [messages, setMessages] = useState(null);
    const loaded = useRef(false);
    useEffect(() => {
        if (!loaded.current) {
        const getAndSetMessages = async () => {
                const fetchedMessages = await getMessages(accessToken, groupID);
                setMessages(fetchedMessages);
                // Commented out so daycards reload when requested.
                // loaded.current = true;
            }
            getAndSetMessages();
        }
    }, [groupID])
    return messages;
}
 

export default GroupMeLogin
