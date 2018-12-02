import {queryInfo} from '../api/socket'
import {getFilter, getTip} from '../api/api'
import {data as mock} from '../assets/mockLogs';

export default {
    namespace: 'logs',
    state: {
        ring_time: null,
        startTime: null,
        endTime: null,
        session_id: null,
        tidb: [],
        tikv: [],
        pd: [],
        filter: {
            tidb: {},
            tikv: {},
            pd: {},
        },
        tips: [],
        isLoading: false,
        isTiping: false,
    },
    reducers: {
        setPayload(state, {payload}) {
            return {...state, ...payload}
        },
        setFilter(state, {payload: {type, key, value, name}}) {
            let filter = state.filter;
            if(!filter[type][name]) {filter[type][name] = {name}}
            filter[type][name][key] = value;
            return {...state, filter: {...filter}}
        }
    },
    effects: {
        *pullLog(_, {call, put, select}) {
            yield put({type: 'setPayload', payload: {isLoading: true}})
            let ring_time = yield select(({logs: {ring_time}}) => ring_time);
            let data = yield queryInfo({ring_time})
            let {session_id, logs: {tidb, tikv, pd}} = data
            yield put({type: 'setPayload', payload: {isLoading: false, session_id, tidb, tikv, pd}})
            yield put({type: 'getTip'})
        },
        *getTip(_, {call, put, select}) {
            let session_id = yield select(({logs: {session_id}}) => session_id);
            let {data: tips} = yield getTip(session_id);
            yield put({type: 'setPayload', payload: {tips, isTiping: true}})
        }
    }
}


