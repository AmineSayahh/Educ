

// import React, { useState,useEffect } from 'react';
// import axios from 'axios'
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CRow,
//   CCollapse,
//   CFade,
//   CSwitch,
//   CLink
// } from  '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { DocsLink } from 'src/reusable'



// // const [activeIndex] = useState(1)
// const MesGroupesEnseignant = ()=> {

//   const [collapsed, setCollapsed] = React.useState(true)
//   const [showCard, setShowCard] = React.useState(true)
//   const [personnes, setPersonnes] = React.useState([])


//     //     // geMesGroupesEnseignant
//     //     getusers(){
//     //       console.log('idEEEEE',localStorage.getItem('idUserr'));
//     //         axios.get(`http://localhost:8000/Groupe/getAll/${localStorage.getItem('idUserr')}`).then((res=>{
//     //                        console.log('personnes',res.data)


//     //         this.setState({personnes:res.data.data})
//     //         }))

//     //     }
//     useEffect(()=>{
//       getusers()
//     },[])
//     const getusers=()=>{
//       axios.get(`http://localhost:8000/Groupe/getAll/${localStorage.getItem('idUserr')}`).then((res=>{
//                              console.log('personnes',res.data)
//     }))

//   }



//   const getR=(id)=>{
//      localStorage.setItem('idMat',id)
//      console.log('idMat',localStorage.getItem('idMat'))
//            }
//   return (
//     <>

//     <CRow style={{"flex-direction": "row"}}>
//     {
//       personnes.map((item,index)=>(
//         <CCol xs="12" sm="6" md="4">
//           <CCard color="info" className="text-white">
//                    <CCardHeader>
//                    <h5 style={{ "color":"white"}}>{item.Abbreviation}</h5>

//           <h6 style={{ "color":"white"}}>{item.nom}</h6>


//                       </CCardHeader>
//                    <CCardBody>
//                    <tbody>

//          <tr key={index}>
//            {/* Nom: */}
// {/*          
//           <h6 style={{ "color":"red"}}>{item.nomMatiere}</h6>        */}

//                                     {/* <img src={`http://localhost:8000/getfile/${item.photo}`} style={{"height":"300px", "width":"500px"}} download/> */}
//                                     <td>
//                                       <CLink to="/MesGroupesEnseignant/TMesGroupesEnseignant">
//                                      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true" onClick = {()=>this.listMat(item._id)} />
//             </CCol>
//                      </CLink>
//                                       </td>

//                                      <td>
//                                      <CLink to="/MesEnseignants/MesEnseignants"> 
//                                      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"
//          />
//             </CCol>
//                      </CLink>
//                                      </td>
//                                       <td>
//                                       <CLink to="/MesEtudiantsEnseignant/TMesEtudiantsEnseignant">
//                                       <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true" /*onClick = {()=>this.listETD(item._id)}*//>
//              </CCol>
//                      </CLink>
//                                       </td>


//       </tr>



//       </tbody>
//                   </CCardBody>
//                 </CCard>
//               </CCol>


//               )   )  }
//               </CRow>
//               </>
//   )
// }

// export default MesGroupesEnseignant


import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { CLink, CCol } from '@coreui/react';

class MesGroupesEnseignant extends Component {
  constructor() {
    super();
    this.state = {
      groupes: [],
      currentPage: 1,
      todosPerPage: 6,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  componentDidMount() {
    this.getGroupes();
  }

  getGroupes() {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:4500/api/findAllGroupe`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log('API response:', res.data);
      if (res.data && Array.isArray(res.data)) {
        this.setState({ groupes: res.data }, () => {
          console.log('Updated state:', this.state.groupes);
        });
      } else {
        console.error('Unexpected response format:', res.data);
      }
    }).catch((err) => {
      console.error('Error fetching groupes:', err);
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ currentPage: Number(event.target.id) });
  }

  handleLastClick(event) {
    event.preventDefault();
//this.setState({ currentPage: last });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({ currentPage: 1 });
  }

  listMat(id) {
    localStorage.setItem('idGRP', id);
    console.log('idGRP', localStorage.getItem('idGRP'));
  }

  render() {
    let { groupes, currentPage, todosPerPage } = this.state;
    console.log('Rendering groupes:', groupes);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                Liste des Groupes
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Abbreviation</th>
                      <th>Liste des Matieres</th>
                      <th>Liste des Etudiants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupes?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.NomDeGroupe}</td>
                        <td>{item.Abbreviation}</td>
                        <td>
                          <CLink to="/MesMatieresEnseignant/TMesMatieresEnseignant">
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={() => this.listMat(item._id)} />
                            </CCol>
                          </CLink>
                        </td>
                        <td>
                          <CLink to="/MesEtudiantsEnseignant/TMesEtudiantsEnseignant">
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" />
                            </CCol>
                          </CLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MesGroupesEnseignant;













/* import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CLink
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['Nom','Abbreviation', 'Niveau', 'Action']

const MesGroupesEnseignant = () => {
  return (
    <>
    


      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
         Tous de Groupes 
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CLink to="/Login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Ajouter un Groupe</CButton>
                    </CLink>
    </>
  )
}

export default MesGroupesEnseignant


 */