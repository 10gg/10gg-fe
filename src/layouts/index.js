import styles from './index.css';
import { Layout } from 'antd';

function BasicLayout(props) {
  return (
    <Layout>
      { props.children }
    </Layout>
  );
}

export default BasicLayout;
