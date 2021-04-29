import { Layout } from 'antd';
import './styles.css';

const { Footer } = Layout;

const styledFooter = { background: '#bae7ff', padding: '20px 0' };

export default function FooterWrapper() {
  return (
    <Footer style={styledFooter}>
      <div className="style-wrapper">
        <p>Copyright © 2021 My Favorites, Inc. All rights reserved.</p>
      </div>
    </Footer>
  );
}
