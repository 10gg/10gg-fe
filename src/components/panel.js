import {connect} from 'dva';
import {
    Input,
    Row,
    Col,
    List,
    Slider,
    Button,
    Select
} from 'antd';
import moment from 'moment';
import LevelTag, {nameMap} from './levelTag'
const Option = Select.Option;

function formatRange(nowtime, val) {
    const now = moment(nowtime)
    return now
        .subtract(120 - val, 'm')
        .format('YYYY-MM-DD HH:mm:ss');
}

function inputGen(dispatch, key, type, name) {
    return (
        <span>
            {key}
            <Input
                onChange={({target: {
                    value
                }}) => {
                dispatch({
                    type: 'logs/setFilter',
                    payload: {
                        key,
                        type,
                        value,
                        name
                    }
                })
            }}/>
        </span>
    )
}

export default connect(({logs}) => logs)(function Panel(props) {
    const {
        dispatch,
        type,
        name,
        filters = [],
        filter,
        startTime,
        endTime
    } = props;

    return (
        <div>
            <h4>Log Filter</h4>
            <Row gutter={16}>
                {filters.map((f, i) => <Col key={i} span={6}>{inputGen(dispatch, f, type, name)}</Col>)}
            </Row>
            <br/>
            <Row>
                Log level
                <Select
                    mode="multiple"
                    style={{
                    width: '100%'
                }}
                    placeholder="Please select"
                    defaultValue={[
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                ]}
                    onChange={(v) => dispatch({
                    type: 'logs/setFilter',
                    payload: {
                        key: 'level',
                        type,
                        value: v,
                        name
                    }
                })}>
                    {nameMap.map((e, i) => <Option key={i} value={i}>{e}</Option>)}
                </Select>,
            </Row>
            <br/>
            <h4>Log List</h4>
            <List
                style={{
                    maxHeight: '200px',
                    overflow: 'scroll'
                }}
            >
                {!props[type].find(e => e.name == name)
                    ? <List.Item>暂无日志</List.Item>
                    : props[type].find(e => e.name == name).logs
                    .filter(log => {
                        let fil = {...filter[type][name]}
                        let ct = new RegExp(fil.content)
                        let time = moment(log.log_time)
                        let [start, end] = [moment(startTime), moment(endTime)]
                        let checkIf = (key) => !fil[key] || log[key] == fil[key];

                        if(!ct.test(log.content)) return false

                        if(!checkIf('store')) return false;
                        if(!checkIf('region')) return false;
                        if(!checkIf('file_name')) return false;


                        if(fil.tag) {
                            if(!log.tag) return false
                            for(let i of fil.tag.split(',')) {
                                if(!log.tag.includes(i)) return false
                            }
                        }

                        if(fil.level && fil.level.length) {
                            if(!fil.level.includes(+log['log_level'])) {
                                return false
                            }
                        }

                        if(time.isAfter(end) || time.isBefore(start)) {return false}

                        return true
                    })
                    .map((log, index) => <List.Item key={index}>
                        <Row
                            style={{
                            width: '100%',
                        }}>
                            <Col span={2}><LevelTag level={log['log_level']}/></Col>
                            <Col span={4}>{log['log_time']}</Col>
                            <Col span={18} style={{wordBreak: 'break-all'}}>{log['content']}</Col>
                        </Row>
                    </List.Item>)
}
            </List>
        </div>
    )
})