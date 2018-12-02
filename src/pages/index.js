import styles from './index.css';
import { Layout } from 'antd';
import AlertList from '../components/alertList';
import {queryList} from '../api/socket';

const { Header, Content, Footer } = Layout;


export default class Index extends React.Component {
  componentDidMount() {
    queryList((list) => this.setState({list}))
  }

  state = {list: []}

  render() {
    let {list} = this.state;

    return (
      <div>
        <Header><div className={styles.logo}>10gg</div></Header>
        <Content style={{ padding: '0 50px', marginTop: '40px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h2>报警列表</h2>
            <AlertList infos={list}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </div>
    );
  }
}
