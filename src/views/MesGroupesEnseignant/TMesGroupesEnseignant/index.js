

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
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CButton,CCol,CLink
} from '@coreui/react';

import swal from 'sweetalert'

let prev  = 0;
let next  = 0;
let last  = 0;

class MesGroupesEnseignant extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
      componentDidMount(){
        this.getusers();
    }
    // geMesGroupesEnseignant
    getusers(){
      console.log('idEEEEE',localStorage.getItem('idUserr'));
        axios.get(`http://localhost:8000/Groupe/getAll/${localStorage.getItem('idUserr')}`).then((res=>{
                       console.log('personnes',res.data)

        
        this.setState({personnes:res.data.data})
        }))

    }
    
    // getAllEnseignantsParGroupe(){
    //   axios.get("http://localhost:8000/Enseignant/getAll").then((res=>{
    //       this.setState({personnes:res.data.data})
    //       console.log('personnes',this.state.personnes)
    //   }))
    // }
    // getAllmatieresEnseignants
    getmatieres(){   
         axios.get("http://localhost:8000/Enseignant/getAll").then((res=>{
          this.setState({personnes:res.data.data})
          console.log('personnes',this.state.personnes)
      }))

  }
//   getETD(){   
//     axios.get("http://localhost:8000/Etudiant/getAll").then((res=>{
//      this.setState({personnes:res.data.data})
//      console.log('personnes',this.state.personnes)
//  }))

// }

   /* deleteItem(evt,id){
      console.log('idddddd',id);
      evt.preventDefault()
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://localhost:5000/Groupe/deleteOne/607960430fa231074059ef1d')
          .then(data => {
            console.log("remooooove", data);
            this.getAllUsers();
          })
          swal("deleted successfuly!", {
            icon: "success",
          });
        } else {
          swal("Your file is safe!");
        }
      });

    }*/
    UpdateUser(id) {
        localStorage.setItem("idPerson", id);
        console.log("idPerson ", localStorage.getItem("idPerson"));
        window.location.href = "/update";
      }

      handleClick(event) {

        event.preventDefault();
    
        this.setState({
          currentPage: Number(event.target.id)
      });
      }
      handleLastClick(event) {
        event.preventDefault();
        this.setState({
          currentPage:last
        });
      }
      handleFirstClick(event) {
    
        event.preventDefault();
    
        this.setState({
          currentPage:1
        });
      }
      listMat(id){
        localStorage.setItem('idGRP',id)
        console.log('idddddGRP',localStorage.getItem('idGRP'));

      }
      // listETD(id){
      //   localStorage.setItem('idGRP',id)
      //   console.log('idddddGRP',localStorage.getItem('idGRP'));

      // }
  render() {
    let {personnes, currentPage, todosPerPage} = this.state;

    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
 console.log("indexoflast",indexOfLastTodo);
 console.log("indexfirst",indexOfFirstTodo)
 console.log("persss",personnes)
 let currentTodos =personnes.slice(indexOfFirstTodo, indexOfLastTodo);

    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(personnes.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;



    // Logic for displaying page numbers

    let pageNumbers = [];

    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

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
                  {/* <th>id</th> */}
                    <th>Nom </th>
                    <th>Abbreviation</th>
                   
                    <th>Liste des Matieres</th>
                    {/* <th>Liste des Enseignants</th> */}
                    <th>Liste des Etudiants</th>

             
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                        {/* <td>{item._id}</td> */}
                                      <td>{item.NomDeGroupe}</td>       
                                      <td>{item.Abbreviation}</td>

                                      <td>
                                     <CLink to="/MesMatieresEnseignant/TMesMatieresEnseignant">
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true" onClick = {()=>this.listMat(item._id)} />
            </CCol>
                    </CLink>
                                     </td>
                                     {/* getAllEnseignantsParGroupe */}
                                     {/* <td>
                                     <CLink to="/MesEnseignants/MesEnseignants"> 
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"
          />
            </CCol>
                    </CLink>
                                     </td> */}
                                     <td>
                                     <CLink to="/MesEtudiantsEnseignant/TMesEtudiantsEnseignant">
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true" /*onClick = {()=>this.listETD(item._id)}*/ />
            </CCol>
                    </CLink>
                                     </td>
                                 
            

                                   

                                    </tr>
                                    );
              
                                  })
                            }
                  
                        </tbody>
                                            
                </Table>
                <nav>
     <Pagination>

      <PaginationItem>
        { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
          <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
        }
      </PaginationItem>
      <PaginationItem>
        { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
          <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
        }
      </PaginationItem>
      {
        pageNumbers.map((number,i) =>
          <Pagination key= {i}>
            <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
              <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                {number}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        )}

      <PaginationItem>
        {
          currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
            <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
        }
      </PaginationItem>

      <PaginationItem>
        {
          currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
            <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
        }
      </PaginationItem>
    </Pagination>
  </nav>

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