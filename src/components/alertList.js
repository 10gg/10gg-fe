import { List, Avatar, Icon, Button, Row, Col } from 'antd';

const infos = [
    {text: '这是一条报警信息', link: 'log?ring_time="2018-12-01%2015:09:45"'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'},
    {text: '这是一条报警信息', link: '#'}
]

function AlertList({infos}) {


    return (
    <List>
      {
        infos.map((info, i) => (
        <List.Item key={i}>
            <Row style={{width: '100%'}} type="flex" align="middle">
                <Col><Icon type="alert" theme="twoTone" twoToneColor="#eb2f96"/></Col>
                <Col style={{flex: 1, padding: '0 2rem'}}>{info.text}</Col>
                <Col><Button href={info.link}>Go</Button></Col>
            </Row>
        </List.Item>
        )
        )
      }
    </List>
    )
}

export default AlertList;