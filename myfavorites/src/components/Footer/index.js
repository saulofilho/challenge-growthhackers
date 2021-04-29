import { Layout } from 'antd';

const { Footer } = Layout;

const styledFooter = { background: '#bae7ff', padding: '20px 0' };

const styleWrapper = {
  maxWidth: '900px',
  width: '100%',
  margin: '0 auto',
  height: '100%',
  padding: '0 20px',
};

export default function FooterWrapper() {
  return (
    <Footer style={styledFooter}>
      <div style={styleWrapper}>
        <p>Copyright © 2021 My Favorites, Inc. All rights reserved.</p>
      </div>
    </Footer>
  );
}
