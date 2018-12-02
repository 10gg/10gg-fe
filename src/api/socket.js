import {message} from 'antd';

export function queryInfo(msg) {
    return new Promise((res) => {
        const ws = new WebSocket('ws://127.0.0.1:19092/api/log/pull');

        ws.onopen = ((evt) => {

            ws.send(JSON.stringify(msg))

            ws.onmessage = ({data}) => {
                res(data);
            };
        })
    })
}

export function queryList(callback) {
        const ws = new WebSocket('ws://127.0.0.1:19092/api/metrics/ring');

        ws.onopen = ((evt) => {
            ws.send("")
            ws.onmessage = ({data}) => {
                console.log(data);
                callback(JSON.parse(data));
            };
        })
}
