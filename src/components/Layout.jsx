// import React, { useState } from 'react';
// import { Layout, theme } from 'antd';
// import MenuList from './MenuList.jsx';
// import Navbar from './Navbar.jsx';
// import logo from '../asset/logo.jpg';
// import { useSelector } from 'react-redux';
// const { Header, Sider, Content } = Layout;


// const AntDLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(true);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const { isLoggedIn } = useSelector((state) => {
//     return state.auth
//   });

//   return (
//  <Layout
//       style={{
//         minWidth: '100vh',
//         minHeight: '100vh',
//         margin: '0px',
//         padding: '0px',
//         background: colorBgContainer,
//       }}>
//       {isLoggedIn ?
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
//           breakpoint="md" // Set breakpoint for responsive behavior
//           onBreakpoint={(broken) => {
//             setCollapsed(broken);
//           }}
//           style={{
//             overflow: 'auto',
//             position: "sticky",
//             left: 0,
//             top: 0,
//             bottom: 0,
//             scrollbarWidth: 'none', // Hide scrollbar in Firefox
//             '-ms-overflow-style': 'none', // Hide scrollbar in IE and Edge
//           }}>
//           <img
//             className="rounded-full mx-auto h-10 w-auto sm:h-10 md:h-12 lg:h-14 my-4 text-center object-center"
//             src={logo}
//             alt='logo' />
//           <MenuList />
//         </Sider> : ''}
//       <Layout
//         style={{
//           margin: '0px',
//           padding: '0px',
//           background: colorBgContainer,
//         }}>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 14px',
//             padding: '20px',
//             minHeight: '100vh',
//             minWidth: '100vh',
//             borderRadius: borderRadiusLG,
//             background: colorBgContainer,
//             overflow: "initial"
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default AntDLayout