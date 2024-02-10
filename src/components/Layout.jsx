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
    width: '100%',
    minHeight: '100%', // Set minimum height to 100% of viewport height
    margin: '0px',
    padding: '0px',
    background: colorBgContainer,
  }}
>
  {isLoggedIn ? (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md" // Set breakpoint for responsive behavior
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      style={{
        overflow: 'auto',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1, // Ensure the sidebar remains above other content
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        '-ms-overflow-style': 'none', // Hide scrollbar in IE and Edge
      }}
    >
      <img
        className="rounded-full mx-auto h-10 w-auto sm:h-10 md:h-12 lg:h-14 my-4 text-center object-center"
        src={logo}
        alt='logo'
      />
      <MenuList />
    </Sider>
  ) : null}
  <Layout
    style={{
      width: '100%',
      minHeight: '100vh', // Set minimum height to 100% of viewport height
      margin: '0px',
      padding: '0px',
      background: colorBgContainer,
    }}
  >
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        zIndex: 0, // Ensure the header remains behind the sidebar
      }}
    >
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
    </Header>
    <Content
      style={{
        margin: '24px 14px',
        padding: '20px',
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