import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import MenuList from './MenuList.jsx';
import Navbar from './Navbar.jsx';
import logo from '../asset/logo.jpg';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;


const AntDLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isLoggedIn } = useSelector((state) => {
    return state.auth
  });

  return (
    <Layout
    style={{
      width: '100vw',
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
          margin: '24px 14px',
          padding: '20px',
          Height: '100%',
          maxWidth: '100%',
          borderRadius: borderRadiusLG,
          background: colorBgContainer,
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