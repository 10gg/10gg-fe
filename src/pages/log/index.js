import styles from '../index.css';
import {
  Layout,
  Row,
  Col,
  Slider,
  Button,
  Tabs,
  Modal,
  List
} from 'antd';
import moment from 'moment';
import {connect} from 'dva';
import Panel from '../../components/panel'

const {Header, Content, Footer} = Layout;

const TabPane = Tabs.TabPane

function formatRange(nowtime, val) {
  const now = moment(nowtime)
  return now
    .subtract(120 - val, 'm')
    .format('YYYY-MM-DD HH:mm:ss');
}

export default connect(({logs}) => logs)(function (props) {
  const {
    location: {
      query: {
        ring_time
      }
    },
    dispatch,
    startTime,
    endTime,
    isLoading,
    session_id,
    tidb,
    tikv,
    pd,
    tips,
    isTiping
  } = props;
  const date = moment(ring_time, "YYYY-MM-DD HH:mm:ss");
  console.log(props)

  if (!startTime || !endTime) {
    dispatch({
      type: 'logs/setPayload',
      payload: {
        startTime: formatRange(date, 0),
        endTime: formatRange(date, 120),
        ring_time: date.format("YYYY-MM-DD HH:mm:ss")
      }
    })
  }

  return (
    <div>
      <Header>
        <div className={styles.logo}>10gg</div>
      </Header>
      <Content style={{
        padding: '0 50px',
        marginTop: '40px'
      }}>
        <div
          style={{
          background: '#fff',
          padding: 24,
          minHeight: 280
        }}>
          <h2>详细日志</h2>
          <Row gutter={5} type="flex" align="middle">
            <Col>
              日志操作:
            </Col>
            <Col>
              <Button
                onClick={() => {
                dispatch({type: 'logs/pullLog'})
              }}
                loading={isLoading}>拉取日志</Button>
            </Col>
            <Col>
              <Button
                disabled={!isTiping}
                onClick={() => Modal.info({
                content: !tips ? '无' : tips.map(tip => <p>{tip}</p>),
                title: 'Tips',
                width: "1000px"
              })}>Tips</Button>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={6}>
            <Col span={12}>
              <Slider
                range
                step={1}
                defaultValue={[0, 120]}
                max={120}
                min={0}
                tipFormatter={null}
                onChange={([s, e]) => dispatch({
                type: 'logs/setPayload',
                payload: {
                  startTime: formatRange(date, s),
                  endTime: formatRange(date, e),
                  range: [s, e]
                }
              })}/>
            </Col>
            <Col style={{
              textAlign: 'center'
            }} span={12}>日志范围: {startTime}
              - {endTime}</Col>
          </Row>
          {!session_id
            ? '请拉取日志'
            : <Row>
              <Tabs type="card">
                <TabPane key="tidb" tab="tidb">
                  <Tabs>
                    {tidb.map((e, i) => <TabPane tab={e.name} key={i}>
                      <Panel type="tidb" filters={['file_name', 'content', 'tag']} name={e.name}/>
                    </TabPane>)}
                  </Tabs>
                </TabPane>
                <TabPane key="tikv" tab="tikv">
                  <Tabs>
                    {tikv.map((e, i) => <TabPane tab={e.name} key={i}>
                      <Panel
                        filters={['file_name', 'content', 'region', 'store']}
                        type="tikv"
                        name={e.name}/>
                    </TabPane>)}
                  </Tabs>
                </TabPane>

                <TabPane key="pd" tab="pd">
                  <Tabs>
                    {pd.map((e, i) => <TabPane tab={e.name} key={i}>
                      <Panel
                        type="pd"
                        filters={['file_name', 'content', 'region', 'tag']}
                        name={e.name}/>
                    </TabPane>)}
                  </Tabs>
                </TabPane>
              </Tabs>
            </Row>
}
        </div>
      </Content>
      <Footer style={{
        textAlign: 'center'
      }}></Footer>
    </div>
  );
})
