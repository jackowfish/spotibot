import requests
import json
import pprint

#insert groupMe Token
gm_token = 'cqIRkGeAfRFZCcQyCM5WPTl2ImHj8SRY45ozCrlV'
gm_url = 'https://api.groupme.com/v3'
#insert spotify client ID
SPOTIFY_CLIENT_ID = '56153466382340898b836bdbf32f22c7'
# Insert Playlist ID
playlist_id = '1PgtDtgBBQDZVZREDac2H0Fgby6P06dtFz7gSj2A1hKPUSP5Gbni6LDzR3fB4ZSwR'
# Insert Bearer Auth Token
auth_token = ''
# Insert GroupMe Group ID (can use the getGroups function to find this)
group_id = ''
pp = pprint.PrettyPrinter(indent=2)

def getGroups():
    response = requests.get(
        f"{gm_url}/groups", 
        params = {
            'token': gm_token,
            'per_page': 500
        }
    )
    response = response.json()
    response = response.get('response')
    group_dict = {}
    for group in response:
        group_dict.update({group.get('name') : group.get('id')})
    pp.pprint(group_dict)
#     return group_dict

def getMessages(message_dict, group_id, last_msg_id = None, run = False):
    response = requests.get(
        f"{gm_url}/groups/{group_id}/messages", 
        params = {
            'uris':[]
        }
    )
    try:
        response = response.json()
    except ValueError:  # includes simplejson.decoder.JSONDecodeError
        return None
    if response.get('meta').get('code') == 304:
        return None
    if response:
        response = response.get('response').get('messages')
        before_id = ''
        for message in response:
            if message.get('text') and message.get('text').find('open.spotify.com/track/') != -1:
                message_dict.update({message.get('id') : message.get('text')})
            before_id = message.get('id')
        run = True
        if run == True and before_id == None:
            return None
        else:
            return getMessages(message_dict, group_id, before_id)
    else:
        return None
    # return response


def addSongsToPlaylist(playlist_id, id_list):
    for songs in chunker(id_list, 10):
        pp.pprint(addSongsWithAuth(auth_token, playlist_id, songs))

def addSongsWithAuth(auth_token, playlist_id, songs):
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {
      'Authorization': f"Bearer {auth_token}"
    }
    params = {
        'uris':songs
    }
    response = requests.request("POST", url, headers=headers, params=params)
    return response

def getIDs(message_dict):
    ids = []
    for link in message_dict.values():
        id = link.split('/')[-1]
        id = id.split('?')[0]
        id = id.split(' ')[0]
        id = id.split('\n')[0]
        id = f"spotify:track:{id}"
        ids.append(id)
    return ids

def chunker(seq, size):
    return (seq[pos:pos + size] for pos in range(0, len(seq), size))

# Run main and insert group ID to add songs to playlist
def main(group_id):
    message_dict = {}
    getMessages(message_dict, group_id)
    song_ids = getIDs(message_dict)
    addSongsToPlaylist(playlist_id, song_ids)