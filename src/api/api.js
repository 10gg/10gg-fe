import axios from 'axios';

export function getTip(session_id) {
    return axios.get('/api/log/tips?session_id='+session_id)
}

export function getFilter(type, filter, session_id, [startTime, endTime]) {
    let msg = {};
    for(let k in filter) {
        if(filter[k]) {
            msg[k] = filter[k]
        }
    }

    msg['start_time'] = startTime

    msg['end_time'] = endTime

    msg['source'] = type

    return axios.post('/api/log?session_id='+session_id, msg)
} 