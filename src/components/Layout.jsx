import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import MenuList from './MenuList.jsx';
import Navbar from './Navbar.jsx';
import logo from '../asset/logo.jpg';
import { useSelector } from 'react-redux';
import MobileBar from './MobileBar.jsx';
const { Header, Sider, Content } = Layout;


const AntDLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isLoggedIn } = useSelector((state) => {
    return state.auth
  });

  return (
    <Layout
    style={{
      width: '100%',
      height: '100%',
      margin: '0px',
      padding: '0px',
      background: colorBgContainer,
    }}>
    {isLoggedIn ?
      <Sider
        trigger={null}
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          '-ms-overflow-style': 'none', // Hide scrollbar in IE and Edge
        }}>
        <img
        className="rounded-full mx-auto h-10 w-auto sm:h-10 md:h-12 lg:h-14 my-4 text-center object-center"
        src={logo} 
        alt='logo'/>
        <MenuList />
      </Sider> : ''}
    <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Content
        style={{
          margin: '26px 16px',
          padding: '24px',
          Height: '100%',
          maxWidth: '100%',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflow: "initial"
        }}
        >
        {children}
      </Content>
    </Layout>
  </Layout>
  );
}

export default AntDLayout