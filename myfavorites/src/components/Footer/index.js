import { Layout } from 'antd';

const { Footer } = Layout;

const styledFooter = { background: '#bae7ff' };
const styleWrapper = {
  maxWidth: '900px',
  width: '100%',
  margin: '0 auto',
};

export default function FooterWrapper() {
  return (
    <Footer style={styledFooter}>
      <div style={styleWrapper}>
        <p>Footer</p>
      </div>
    </Footer>
  );
}
