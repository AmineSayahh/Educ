// import React, { Component } from 'react';

// import axios from 'axios';

// import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
// from 'reactstrap';
// import CIcon from '@coreui/icons-react'

// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CLink,
//   CCol,
//   CContainer,
//   CForm,
//   CInput,
//   CInputGroup,
//   CInputGroupPrepend,
//   CInputGroupText,
//   CRow
// } from '@coreui/react';

// let prev  = 0;
// let next  = 0;
// let last  = 0;

// class MesMatieresEtudiant extends Component {
//     constructor() {
//         super();
//         this.state = {
//           matiere: [],
//           currentPage: 1,
//           todosPerPage: 6,
     
//         };
      
//         this.handleClick = this.handleClick.bind(this);
        
//         this.handleLastClick = this.handleLastClick.bind(this);
    
//         this.handleFirstClick = this.handleFirstClick.bind(this);
    
//       }
      
     
     
//       componentDidMount(){
//         this.getusers();
//     }
    
//     getusers(){
//         axios.get(`http://localhost:8000/Matiere/getAllgetAllMatieres/${localStorage.getItem('idUseer')}/${localStorage.getItem('idGoupe')}`).then((res=>{
//             this.setState({matiere:res.data.data})
//             console.log('matiere',this.state.matiere)
//         }))

//     }
//     // HandleclickDelete =(_id)=>{
//     //     axios.delete("http://localhost:8000/Matiere/deleteOne/60521d4dc1975b2bb8659b19")
//     //     console.log('_id ',_id)
//     //    this.getusers();
//     // }
 
//     // UpdateUser(id) {
//     //     localStorage.setItem("idPerson", id);
//     //     console.log("idPerson ", localStorage.getItem("idPerson"));
//     //     window.location.href = "/update";
//     //   }

//       handleClick(event) {

//         event.preventDefault();
    
//         this.setState({
//           currentPage: Number(event.target.id)
//       });
//       }
//       handleLastClick(event) {
//         event.preventDefault();
//         this.setState({
//           currentPage:last
//         });
//       }
//       handleFirstClick(event) {
    
//         event.preventDefault();
    
//         this.setState({
//           currentPage:1
//         });
//       }
//       getE(id){
//         localStorage.setItem('idE',id)
//         console.log('idE',localStorage.getItem('idE'))
//               }
//   render() {
//     let {matiere, currentPage, todosPerPage} = this.state;

//     // Logic for displaying current todos

//     let indexOfLastTodo = currentPage * todosPerPage;

//     let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//  console.log("indexoflast",indexOfLastTodo);
//  console.log("indexfirst",indexOfFirstTodo)
//  console.log("persss",matiere)
//  let currentTodos =matiere.slice(indexOfFirstTodo, indexOfLastTodo);

//     prev = currentPage > 0 ? (currentPage - 1) : 0;

//     last = Math.ceil(matiere.length / todosPerPage);

//     next = (last === currentPage) ? currentPage : currentPage + 1;



//     // Logic for displaying page numbers

//     let pageNumbers = [];

//     for (let i = 1; i <= last; i++) {
//       pageNumbers.push(i);
//     }

//     return (
     
             
      
//  <div className="animated fadeIn">
//         <Row>         
//           <Col xs="12" lg="12">
        
//             <Card>
//               <CardHeader>
//                 <i className="fa fa-align-justify"></i> 
//                 Liste des Matiéres
//               </CardHeader>
//               <CardBody>
//                 <Table responsive striped>
//                   <thead>
//                   <tr>
//                   {/* <th>id </th> */}
//                     <th>Nom </th>
//                     {/* <th>nombre_d_heure_enseignée</th> */}
//                     <th>nombre_d_heure</th>
       
//                     <th> Access </th>
//                   </tr>
//                   </thead>
//                         <tbody>
//                             {
//                                  currentTodos.map((item,index) =>{
//                                     return(
              
//                                       <tr 
//                                       key={index}>
//                                         {/* <td>{item._id}</td>  */}
//                                       <td>{item.nomMatiere}</td>       
//                                       {/* <td>{item.nombre_d_heure_enseignée}</td> */}
//                                       <td>{item.nombre_d_heure}</td> 
                                

                                   
//                                      <td>
//                                      <CLink to="/matiereEtudiants">
//                 <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
//                 <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={()=>this.getE(item._id)}  /> 
//                  {/* type="submit"  onClick={()=>{this.envoyer2()}} */}    
//             </CCol>
//             </CLink>                 
//                                      </td>
//                                     </tr>
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
//             </Card>
          
//           </Col>
            
//         </Row>  
//       </div>

//     );
//   }
// }

// export default MesMatieresEtudiant;





import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CSwitch,
  CLink
} from  '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'



// const [activeIndex] = useState(1)
const MesMatieresEtudiant = ()=> {

  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)
  const [personnes, setPersonnes] = React.useState([])
   
    useEffect(()=>{
      getusers()
    },[])
 
  
 
  const getusers=()=>{
            axios.get(`http://localhost:8000/Matiere/getAllgetAllMatieres/${localStorage.getItem('idUseer')}/${localStorage.getItem('idGoupe')}`).then((res=>{
                // this.setState({matiere:res.data.data})
                // console.log('matiere',this.state.matiere)
                setPersonnes(res.data.data)
            }))
    
       }
   
  
         
            const getE=(id)=>{
                   localStorage.setItem('idE',id)
                     console.log('idE',localStorage.getItem('idE'))
                           }
  return (
    <>

    <CRow style={{"flex-direction": "row"}}>
    {
      personnes.map((item,index)=>(
        <CCol xs="12" sm="6" md="4">
          <CCard color="warning" className="text-white">
                   <CCardHeader>
                   <CLink to="/matiereEtudiants">
          <h5 style={{ "color":"white"}}   onClick={()=>getE(item._id)}>{item.nomMatiere}</h5>      
          </CLink>
                </CCardHeader>
                   <CCardBody>
                   <tbody>
        
         <tr key={index}>
           {/* Nom: */}
{/*          
          <h6 style={{ "color":"red"}}>{item.nomMatiere}</h6>        */}
       
          Nombre des heures:
                                    <h6>{item.nombre_d_heure}</h6> 
                                    {/* <img src={`http://localhost:8000/getfile/${item.photo}`} style={{"height":"300px", "width":"500px"}} download/> */}
                                    <td>
                                     
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                 {/* <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true"  */}
               {/* />  */}
                  {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
             </CCol>
                                                             </td>
  
      </tr>
      
      
      
      </tbody>
                  </CCardBody>
                </CCard>
              </CCol>
       
      
              )   )  }
              </CRow>
              </>
  )
}

export default MesMatieresEtudiant 






