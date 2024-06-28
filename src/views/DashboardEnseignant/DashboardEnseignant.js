import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem,
  CInput,
  CSubheader,
  CForm,
  CFormGroup,
  CLabel,
  CHeaderNavLink,
  CHeaderNavItem,
  CTextarea,
  CInputFile,
  CImg,
  CLink,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { DocsLink } from 'src/reusable'
import axios from 'axios'
const slides = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]
// const [activeIndex] = useState(1)
class Dashboard extends Component {
  state = {
    personnes: [],
    title: "",
    description: "",
  };

  componentDidMount() {
    this.getUsers();
  }

  envoyer() {
    console.log('title', this.state.title);
    console.log('description', this.state.description);

    const token = localStorage.getItem('token');
    const payload = {
      title: this.state.title,
      description: this.state.description
    };

    axios.post('http://localhost:4500/api/posts', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('data', res);
        if (res.status === 200) {
          alert('Publication est ajoutée');
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUsers() {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:4500/api/getPosts/${localStorage.getItem("userId")}`  , {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.setState({ personnes: res.data });
      console.log('personnes', this.state.personnes);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <CRow>
          <CCol xxxxs="0.000000000000000000000000000000000000000000000000000000000000001" xxxxl="0.000000000000000000000000000000000000000000000000000000000000001">
            <CCard>
              {/* <CCardHeader>
          T3ALLEM MAANA
         </CCardHeader> */}
              <CCardBody>
                <CCarousel animate autoSlide={1800}>
                  <CCarouselIndicators />
                  <CCarouselInner>
                    <CCarouselItem>
                      <CImg
                        src={'avatars/photo1.jpg'}
                        className="d-block w-100"
                        alt="slide 1"
                        style={{ "height": "300px", "width": "200px" }}
                      />
                      {/* <CCarouselCaption><h4>Slide 1</h4><p>Slide 1</p></CCarouselCaption> */}
                    </CCarouselItem>
                    <CCarouselItem>

                      <CImg
                        src={'avatars/photo2.jpg'}
                        className="d-block w-100"
                        alt="slide 2"
                        style={{ "height": "300px", "width": "200px" }}
                      />

                      {/* <img className="d-block w-100" src={slides[1]} alt="slide 2"/> */}
                      {/* <CCarouselCaption><h4>Slide 2</h4><p>Slide 2</p></CCarouselCaption> */}
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImg
                        src={'avatars/photo3.jpg'}
                        className="d-block w-100"
                        alt="slide 3"
                        style={{ "height": "300px", "width": "200px" }}
                      />
                      {/* <img className="d-block w-100" src={slides[2]} alt="slide 3"/> */}
                      {/* <CCarouselCaption><h4>Slide 3</h4><p>Slide 3</p></CCarouselCaption> */}
                    </CCarouselItem>
                  </CCarouselInner>
                  <CCarouselControl direction="prev" />
                  <CCarouselControl direction="next" />
                </CCarousel>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CCardHeader>
          <h4>Publications Administratives</h4>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="company">Titre</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="company" placeholder="Titre" onChange={event => this.setState({ title: event.target.value })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="description">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="description" placeholder="Quoi de neuf ?" onChange={event => this.setState({ description: event.target.value })} />
              </CCol>
            </CFormGroup>
          </CForm>
          <CRow>
            <CCol className="text-center mt-3">
              <CButton color="btn btn-light" block onClick={() => { this.envoyer() }}>
                Ajouter Publication
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
        {this.state.personnes.map((item, index) => (
          <CRow key={index}>
            <CCol>
              <CCard>
                <CCardHeader>
                  <div style={{ float: "right" }}>
                    <CLink to="/matiere/UpdateActivite">
                      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
                          onClick={evt => this.handleClickEdit(evt, item._id)} />
                      </CCol>
                    </CLink>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                        onClick={evt => this.HandleclickDelete(evt, item._id)} />
                    </CCol>
                  </div>
                  <h4>Publication Administratives</h4>
                </CCardHeader>
                <CCardBody>
                  <CJumbotron fluid>
                    <CContainer fluid>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                      <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </CContainer>
                  </CJumbotron>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ))}
      </>
    );
  }
}
export default Dashboard;

// import React, { Component } from 'react';
// import axios from 'axios';
// import {
//    CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CSubheader,
//   CForm,
//   CFormGroup,
//   CLabel,
//   CHeaderNavLink,
//   CHeaderNavItem,
//   CTextarea,
//   CInputFile,
//   CLink,
//   CInputGroupPrepend,
//   CInputGroup,
//   CInputGroupText,
//   CInput
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table }
// from 'reactstrap';
// let prev  = 0;
// let next  = 0;
// let last  = 0;

// class Dashboard  extends Component {

//     constructor() {
//       super();
//       this.state = {
//         personnes: [],
//         currentPage: 1,
//         todosPerPage: 6,

//       DateDeCreation:"",
//       Contenu:"",
//       Files:null,
//       };

//       this.handleClick = this.handleClick.bind(this);

//       this.handleLastClick = this.handleLastClick.bind(this);

//       this.handleFirstClick = this.handleFirstClick.bind(this);


//     }


//     componentDidMount(){
//       this.getusers();
//   }

//   refreshPage() {
//     window.location.reload(false);
//   }
//     envoyer()
//     {
//       const fd1 = new FormData();
//       fd1.append('Contenu',this.state.Contenu)
//       fd1.append('DateDeCreation',this.state.DateDeCreation)
//       fd1.append('Files',this.state.Files,this.state.Files.name)






//       axios.put("http://localhost:8000/PublicationAdministratif/addPublicationAdministratif",fd1)


//         .then(res=>{
//             console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
//           //  window.location.href='/sidebar'
//         })
//         .catch((err)=>{
//             console.log(err)
//         })


//     }
//     getusers(){
//       axios.get("http://localhost:8000/PublicationAdministratif/getAll").then((res=>{
//           this.setState({personnes:res.data.data})
//           console.log('personnes',this.state.personnes)
//       }))

//   }
//   HandleclickDelete=(_id)=>{
//       axios.delete("http://localhost:8000/Etudiant/deleteOne/607acbc003e35411149c96bc	")
//       console.log('_id ',_id)
//      this.getusers();
//   }

//   UpdateUser(id) {
//       localStorage.setItem("idPerson", id);
//       console.log("idPerson ", localStorage.getItem("idPerson"));
//       window.location.href = "/update";
//     }

//     handleClick(event) {

//       event.preventDefault();

//       this.setState({
//         currentPage: Number(event.target.id)
//     });
//     }
//     handleLastClick(event) {
//       event.preventDefault();
//       this.setState({
//         currentPage:last
//       });
//     }
//     handleFirstClick(event) {

//       event.preventDefault();

//       this.setState({
//         currentPage:1
//       });
//     }


//     render() {
//       let {personnes, currentPage, todosPerPage} = this.state;

//     // Logic for displaying current todos

//     let indexOfLastTodo = currentPage * todosPerPage;

//     let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//  console.log("indexoflast",indexOfLastTodo);
//  console.log("indexfirst",indexOfFirstTodo)
//  console.log("persss",personnes)
//  let currentTodos =personnes.slice(indexOfFirstTodo, indexOfLastTodo);

//     prev = currentPage > 0 ? (currentPage - 1) : 0;

//     last = Math.ceil(personnes.length / todosPerPage);

//     next = (last === currentPage) ? currentPage : currentPage + 1;



//     // Logic for displaying page numbers

//     let pageNumbers = [];

//     for (let i = 1; i <= last; i++) {
//       pageNumbers.push(i);
//     }
//     return (

//         <CCard>

//               <CardHeader>
//                 <i className="fa fa-align-justify"></i>
//             Publications Administratives
//               </CardHeader>
//               <CardBody>
//                 <Table responsive striped>
//                   <thead>
//                   <tr>
//                   <th> Publications Administratives</th>

//                     {/* <th> Access </th> */}
//                   </tr>
//                   </thead>
//                         <tbody>
//                             {
//                                  currentTodos.map((item,index) =>{
//                                     return(

//                                       <tr
//                                       key={index}>
//                                           <p>{item.Contenu}</p>
//                                           <p>{item.DateDeCreation}</p>
//                                           <p>{item.Files}</p>

//                                             {/* <td>

//                 <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
//                 <CIcon name="cilCheck"active block shape="pill" color="info" aria-pressed="true"
//                onClick = {evt => this.handleClickEdit(evt,item._id)}/>

//             </CCol>
//                                      </td> */}

//                                       {/* <td>
//                 <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
//                onClick = {evt => this.HandleclickDelete(evt,item._id)}/>

//             </CCol>
//                                      </td> */}

//                                      {/* <td>
//                                      <CLink to="/MesEnseignants/MesEnseignants">
//                 <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" />
//                  type="submit"  onClick={()=>{this.envoyer2()}}
//             </CCol>
//             </CLink>
//                                      </td> */}

//                                     </tr>
//                     //                           <td>
//                     //                           <CLink to="/Dashboard">
//                     //      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                     //      <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" />
//                     //       {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
//                     //  </CCol>
//                     //  </CLink>
//                     //                           </td>
//                                     );

//                                   })
//                             }

//                         </tbody>

//                 </Table>
//                 <nav>
//      <Pagination>

//       <PaginationItem>
//         { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
//           <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
//         }
//       </PaginationItem>
//       <PaginationItem>
//         { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
//           <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
//         }
//       </PaginationItem>
//       {
//         pageNumbers.map((number,i) =>
//           <Pagination key= {i}>
//             <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
//               <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
//                 {number}
//               </PaginationLink>
//             </PaginationItem>
//           </Pagination>
//         )}

//       <PaginationItem>
//         {
//           currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
//             <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
//         }
//       </PaginationItem>

//       <PaginationItem>
//         {
//           currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
//             <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
//         }
//       </PaginationItem>
//     </Pagination>
//   </nav>

//                </CardBody>
//                <CCardHeader> Publications :
//          <CCardBody>

//             <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
//             <CFormGroup row>
//                   <CCol md="3">
//                     <CLabel htmlFor="textarea-input">Ecrivez ...</CLabel>
//                   </CCol>
//                   <CCol xs="12" md="9">
//                     <CTextarea
//                       name="textarea-input"
//                       id="textarea-input"
//                       rows="9"
//                       placeholder="Content..." onChange={event=>this.setState({Contenu:event.target.value})}
//                     />
//                   </CCol>
//                 </CFormGroup>

//                  <CFormGroup row>
//                   <CLabel col md="3" htmlFor="file-input">Ajouter des fichier à votre publication</CLabel>
//                   <CCol xs="12" md="9">
//                     <CInputFile id="file-input" name="File-input" onChange={event=>this.setState({Files:event.target.files[0]})} />
//                   </CCol>
//                 </CFormGroup>
//             </CForm>

//             <CRow className="align-items-center">
//           <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
//           <CButton color="success" block type="submit" onClick={()=>{this.envoyer()}}>Ajouter Publication </CButton>
//             </CCol>
//             </CRow>

//         </CCardBody>
//         </CCardHeader>

//         </CCard>

//     )
// }}
// export default Dashboard
// // import React, { lazy } from 'react'
// // import {
// //   CBadge,
// //   CButton,
// //   CButtonGroup,
// //   CCard,
// //   CCardBody,
// //   CCardFooter,
// //   CCardHeader,
// //   CCol,
// //   CProgress,
// //   CRow,
// //   CCallout,



// //   CSubheader,
// //   CForm,
// //   CFormGroup,
// //   CLabel,
// //   CHeaderNavLink,
// //   CHeaderNavItem,
// //   CTextarea,
// //   CInputFile,
// // } from '@coreui/react'


// // import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table }
// // from 'reactstrap';
// // import CIcon from '@coreui/icons-react'

// // import MainChartExample from '../charts/MainChartExample.js'

// // const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// // const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

// // const Dashboard = () => {
// //   return (
// //     <>
// //       <WidgetsDropdown />
// //       <CCard>
// //         <CCardBody>
// //           <CRow>
// //             <CCol sm="5">
// //               <h4 id="traffic" className="card-title mb-0">Traffic</h4>
// //               <div className="small text-muted">November 2017</div>
// //             </CCol>
// //             <CCol sm="7" className="d-none d-md-block">
// //               <CButton color="primary" className="float-right">
// //                 <CIcon name="cil-cloud-download"/>
// //               </CButton>
// //               <CButtonGroup className="float-right mr-3">
// //                 {
// //                   ['Day', 'Month', 'Year'].map(value => (
// //                     <CButton
// //                       color="outline-secondary"
// //                       key={value}
// //                       className="mx-0"
// //                       active={value === 'Month'}
// //                     >
// //                       {value}
// //                     </CButton>
// //                   ))
// //                 }
// //               </CButtonGroup>
// //             </CCol>
// //           </CRow>
// //           <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
// //         </CCardBody>
// //         <CCardFooter>
// //           <CRow className="text-center">
// //             <CCol md sm="12" className="mb-sm-2 mb-0">
// //               <div className="text-muted">Visits</div>
// //               <strong>29.703 Users (40%)</strong>
// //               <CProgress
// //                 className="progress-xs mt-2"
// //                 precision={1}
// //                 color="success"
// //                 value={40}
// //               />
// //             </CCol>
// //             <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
// //               <div className="text-muted">Unique</div>
// //               <strong>24.093 Users (20%)</strong>
// //               <CProgress
// //                 className="progress-xs mt-2"
// //                 precision={1}
// //                 color="info"
// //                 value={40}
// //               />
// //             </CCol>
// //             <CCol md sm="12" className="mb-sm-2 mb-0">
// //               <div className="text-muted">Pageviews</div>
// //               <strong>78.706 Views (60%)</strong>
// //               <CProgress
// //                 className="progress-xs mt-2"
// //                 precision={1}
// //                 color="warning"
// //                 value={40}
// //               />
// //             </CCol>
// //             <CCol md sm="12" className="mb-sm-2 mb-0">
// //               <div className="text-muted">New Users</div>
// //               <strong>22.123 Users (80%)</strong>
// //               <CProgress
// //                 className="progress-xs mt-2"
// //                 precision={1}
// //                 color="danger"
// //                 value={40}
// //               />
// //             </CCol>
// //             <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
// //               <div className="text-muted">Bounce Rate</div>
// //               <strong>Average Rate (40.15%)</strong>
// //               <CProgress
// //                 className="progress-xs mt-2"
// //                 precision={1}
// //                 value={40}
// //               />
// //             </CCol>
// //           </CRow>
// //         </CCardFooter>
// //       </CCard>

// //       <WidgetsBrand withCharts/>

// //       <CRow>
// //         <CCol>
// //           <CCard>
// //             <CCardHeader>
// //               Traffic {' & '} Sales
// //             </CCardHeader>
// //             <CCardBody>
// //               <CRow>
// //                 <CCol xs="12" md="6" xl="6">

// //                   <CRow>
// //                     <CCol sm="6">
// //                       <CCallout color="info">
// //                         <small className="text-muted">New Clients</small>
// //                         <br />
// //                         <strong className="h4">9,123</strong>
// //                       </CCallout>
// //                     </CCol>
// //                     <CCol sm="6">
// //                       <CCallout color="danger">
// //                         <small className="text-muted">Recurring Clients</small>
// //                         <br />
// //                         <strong className="h4">22,643</strong>
// //                       </CCallout>
// //                     </CCol>
// //                   </CRow>

// //                   <hr className="mt-0" />

// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                         Monday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="34" />
// //                       <CProgress className="progress-xs" color="danger" value="78" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Tuesday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="56" />
// //                       <CProgress className="progress-xs" color="danger" value="94" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Wednesday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="12" />
// //                       <CProgress className="progress-xs" color="danger" value="67" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Thursday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="43" />
// //                       <CProgress className="progress-xs" color="danger" value="91" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Friday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="22" />
// //                       <CProgress className="progress-xs" color="danger" value="73" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Saturday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="53" />
// //                       <CProgress className="progress-xs" color="danger" value="82" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-prepend">
// //                       <span className="progress-group-text">
// //                       Sunday
// //                       </span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="info" value="9" />
// //                       <CProgress className="progress-xs" color="danger" value="69" />
// //                     </div>
// //                   </div>
// //                   <div className="legend text-center">
// //                     <small>
// //                       <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
// //                       New clients
// //                       &nbsp;
// //                       <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
// //                       Recurring clients
// //                     </small>
// //                   </div>
// //                 </CCol>

// //                 <CCol xs="12" md="6" xl="6">

// //                   <CRow>
// //                     <CCol sm="6">
// //                       <CCallout color="warning">
// //                         <small className="text-muted">Pageviews</small>
// //                         <br />
// //                         <strong className="h4">78,623</strong>
// //                       </CCallout>
// //                     </CCol>
// //                     <CCol sm="6">
// //                       <CCallout color="success">
// //                         <small className="text-muted">Organic</small>
// //                         <br />
// //                         <strong className="h4">49,123</strong>
// //                       </CCallout>
// //                     </CCol>
// //                   </CRow>

// //                   <hr className="mt-0" />

// //                   <div className="progress-group mb-4">
// //                     <div className="progress-group-header">
// //                       <CIcon className="progress-group-icon" name="cil-user" />
// //                       <span className="title">Male</span>
// //                       <span className="ml-auto font-weight-bold">43%</span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="warning" value="43" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group mb-5">
// //                     <div className="progress-group-header">
// //                       <CIcon className="progress-group-icon" name="cil-user-female" />
// //                       <span className="title">Female</span>
// //                       <span className="ml-auto font-weight-bold">37%</span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="warning" value="37" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group">
// //                     <div className="progress-group-header">
// //                       <CIcon className="progress-group-icon" name="cil-globe-alt" />
// //                       <span className="title">Organic Search</span>
// //                       <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="success" value="56" />
// //                     </div>
// //                   </div>


// //                   <div className="progress-group">
// //                     <div className="progress-group-header">
// //                       <CIcon name="cib-facebook" className="progress-group-icon" />
// //                       <span className="title">Facebook</span>
// //                       <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="success" value="15" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group">
// //                     <div className="progress-group-header">
// //                       <CIcon name="cib-twitter" className="progress-group-icon" />
// //                       <span className="title">Twitter</span>
// //                       <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="success" value="11" />
// //                     </div>
// //                   </div>
// //                   <div className="progress-group">
// //                     <div className="progress-group-header">
// //                       <CIcon name="cib-linkedin" className="progress-group-icon" />
// //                       <span className="title">LinkedIn</span>
// //                       <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
// //                     </div>
// //                     <div className="progress-group-bars">
// //                       <CProgress className="progress-xs" color="success" value="8" />
// //                     </div>
// //                   </div>
// //                   <div className="divider text-center">
// //                     <CButton color="link" size="sm" className="text-muted">
// //                       <CIcon name="cil-options" />
// //                     </CButton>
// //                   </div>

// //                 </CCol>
// //               </CRow>

// //               <br />

// //               <table className="table table-hover table-outline mb-0 d-none d-sm-table">
// //                 <thead className="thead-light">
// //                   <tr>
// //                     <th className="text-center"><CIcon name="cil-people" /></th>
// //                     <th>User</th>
// //                     <th className="text-center">Country</th>
// //                     <th>Usage</th>
// //                     <th className="text-center">Payment Method</th>
// //                     <th>Activity</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-success"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Yiorgos Avraamu</div>
// //                       <div className="small text-muted">
// //                         <span>New</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-us" title="us" id="us" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>50%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="success" value="50" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-cc-mastercard" />
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>10 sec ago</strong>
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-danger"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Avram Tarasios</div>
// //                       <div className="small text-muted">

// //                         <span>Recurring</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-br" title="br" id="br" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>10%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="info" value="10" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-cc-visa" />
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>5 minutes ago</strong>
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-warning"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Quintin Ed</div>
// //                       <div className="small text-muted">
// //                         <span>New</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-in" title="in" id="in" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>74%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="warning" value="74" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-stripe" />
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>1 hour ago</strong>
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-secondary"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Enéas Kwadwo</div>
// //                       <div className="small text-muted">
// //                         <span>New</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-fr" title="fr" id="fr" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>98%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="danger" value="98" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-paypal" />
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>Last month</strong>
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-success"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Agapetus Tadeáš</div>
// //                       <div className="small text-muted">
// //                         <span>New</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-es" title="es" id="es" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>22%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="info" value="22" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-google-pay"/>
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>Last week</strong>
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     <td className="text-center">
// //                       <div className="c-avatar">
// //                         <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
// //                         <span className="c-avatar-status bg-danger"></span>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <div>Friderik Dávid</div>
// //                       <div className="small text-muted">
// //                         <span>New</span> | Registered: Jan 1, 2015
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cif-pl" title="pl" id="pl" />
// //                     </td>
// //                     <td>
// //                       <div className="clearfix">
// //                         <div className="float-left">
// //                           <strong>43%</strong>
// //                         </div>
// //                         <div className="float-right">
// //                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
// //                         </div>
// //                       </div>
// //                       <CProgress className="progress-xs" color="success" value="43" />
// //                     </td>
// //                     <td className="text-center">
// //                       <CIcon height={25} name="cib-cc-amex" />
// //                     </td>
// //                     <td>
// //                       <div className="small text-muted">Last login</div>
// //                       <strong>Yesterday</strong>
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               </table>

// //             </CCardBody>
// //           </CCard>
// //         </CCol>
// //       </CRow>
// //     </>
// //   )
// // }
// // <div>
// // <CCard>

// //       <CardHeader>
// //         <i className="fa fa-align-justify"></i>
// //     Publications Administratives
// //       </CardHeader>
// //       <CardBody>
// //         <Table responsive striped>
// //           <thead>
// //           <tr>
// //           <th> Publications Administratives</th>

// //             {/* <th> Access </th> */}
// //           </tr>
// //           </thead>
// //                 <tbody>
// //                     {
// //                          currentTodos.map((item,index) =>{
// //                             return(

// //                               <tr
// //                               key={index}>
// //                                   <p>{item.Contenu}</p>
// //                                   <p>{item.DateDeCreation}</p>
// //                                   <p>{item.Files}</p>

// //                                     {/* <td>

// //         <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
// //         <CIcon name="cilCheck"active block shape="pill" color="info" aria-pressed="true"
// //        onClick = {evt => this.handleClickEdit(evt,item._id)}/>

// //     </CCol>
// //                              </td> */}

// //                               {/* <td>
// //         <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
// //         <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
// //        onClick = {evt => this.HandleclickDelete(evt,item._id)}/>

// //     </CCol>
// //                              </td> */}

// //                              {/* <td>
// //                              <CLink to="/MesEnseignants/MesEnseignants">
// //         <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
// //         <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" />
// //          type="submit"  onClick={()=>{this.envoyer2()}}
// //     </CCol>
// //     </CLink>
// //                              </td> */}

// //                             </tr>
// //             //                           <td>
// //             //                           <CLink to="/Dashboard">
// //             //      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
// //             //      <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" />
// //             //       {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
// //             //  </CCol>
// //             //  </CLink>
// //             //                           </td>
// //                             );

// //                           })
// //                     }

// //                 </tbody>

// //         </Table>
// //         <nav>
// // <Pagination>

// // <PaginationItem>
// // { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
// //   <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
// // }
// // </PaginationItem>
// // <PaginationItem>
// // { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
// //   <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
// // }
// // </PaginationItem>
// // {
// // pageNumbers.map((number,i) =>
// //   <Pagination key= {i}>
// //     <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
// //       <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
// //         {number}
// //       </PaginationLink>
// //     </PaginationItem>
// //   </Pagination>
// // )}

// // <PaginationItem>
// // {
// //   currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
// //     <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
// // }
// // </PaginationItem>

// // <PaginationItem>
// // {
// //   currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
// //     <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
// // }
// // </PaginationItem>
// // </Pagination>
// // </nav>

// //        </CardBody>
// //        <CCardHeader> Publications :
// //  <CCardBody>

// //     <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
// //     <CFormGroup row>
// //           <CCol md="3">
// //             <CLabel htmlFor="textarea-input">Ecrivez ...</CLabel>
// //           </CCol>
// //           <CCol xs="12" md="9">
// //             <CTextarea
// //               name="textarea-input"
// //               id="textarea-input"
// //               rows="9"
// //               placeholder="Content..." onChange={event=>this.setState({Contenu:event.target.value})}
// //             />
// //           </CCol>
// //         </CFormGroup>
// //         {/* <CInputGroup className="mb-3">
// //             <CInputGroupPrepend>
// //               <CInputGroupText>
// //                 <CIcon name="cil-user" />
// //               </CInputGroupText>
// //             </CInputGroupPrepend>
// //             <CInput type="text" placeholder="Date de creation" autoComplete="DateDeCreation" onChange={event=>this.setState({DateDeCreation:event.target.value})}></CInput>
// //           </CInputGroup> */}
// //         {/* <CInputGroup  className="mb-3">

// //           <CInputGroupPrepend><label for="Télécharger Un Fichier">Télécharger un fichier : .. </label>

// //    <input type="file" placeholder="Télécharger un fichier"    onChange={event=>this.setState({Files:event.target.files[0]})} />
// //    </CInputGroupPrepend>
// //     </CInputGroup > */}
// //          <CFormGroup row>
// //           <CLabel col md="3" htmlFor="file-input">Ajouter des fichier à votre publication</CLabel>
// //           <CCol xs="12" md="9">
// //             <CInputFile id="file-input" name="File-input" onChange={event=>this.setState({Files:event.target.files[0]})} />
// //           </CCol>
// //         </CFormGroup>
// //     </CForm>

// //     <CRow className="align-items-center">
// //   <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
// //   <CButton color="success" block type="submit" onClick={()=>{this.envoyer()}}>Ajouter Publication </CButton>
// //     </CCol>
// //     </CRow>

// // </CCardBody>
// // </CCardHeader>

// // </CCard>
// // </div>

// // export default Dashboard
