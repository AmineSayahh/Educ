import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
// import React, { Component } from "react";
// import { Layout, Menu, Row, Breadcrumb, Affix } from "antd";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";

// import TheSider from "./TheSider";
// import TheContent from "./TheContent";
// import TheHeader from "./TheHeader";

// const { Header, Sider, Content } = Layout;

// class TheLayout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapsed: false,
//       contentmargin: 200,
//     };
   
//   }

//   toggle = () => {
//     console.log(this.state);
//     this.setState({
//       collapsed: !this.state.collapsed,
//       contentmargin: this.state.collapsed ? 200 : 80,
//     });
//   };

//   render() {
//     return (
//       <Layout style={{ height: "100vh" }}>
//         <TheHeader />

//         <Layout style={{ marginTop: 60 }}>
//           <Sider
//             width={200}
//             className="site-layout-background"
//             style={{ position: "fixed", height: "100%" }}
//             trigger={null}
//             collapsible
//             collapsed={this.state.collapsed}
//           >
//             <TheSider/>
//           </Sider>
//           <Layout>
//             <Content
//               className="site-layout-background"
//               style={{
//                 paddingTop : 0,
//                 paddingLeft : 10,
//                 paddingRight : 10,
//                 marginLeft: this.state.contentmargin,
//               }}
//             >
//               <Affix
//                 offsetTop={60}
//                 onChange={(affixed) => console.log(affixed)}
//                 style={{ zIndex: 999 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     paddingTop: "10px",
//                     paddingBottom: "10px",
//                     background: "#FAFAFA",
//                   }}
//                 >
//                   {!this.state.collapsed ? (
//                     <MenuFoldOutlined
//                       style={{ fontSize: "20px" }}
//                       onClick={() => this.toggle()}
//                     />
//                   ) : (
//                     <MenuUnfoldOutlined
//                       style={{ fontSize: "20px" }}
//                       onClick={() => this.toggle()}
//                     />
//                   )}

//                 </div>
//               </Affix>

//               <TheContent /> 
//             </Content>
//           </Layout>
//         </Layout>
//       </Layout>
//     );
//   }
// }

// export default TheLayout;