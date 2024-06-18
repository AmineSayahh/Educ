import React, { Component } from 'react';
import axios from 'axios';
import {
   CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSubheader,
  CForm,
  CFormGroup,
  CLabel,
  CHeaderNavLink,
  CHeaderNavItem,
  CTextarea,
  CInputFile,
  CLink,
  CInputGroupPrepend,
  CInputGroup,
  CInputGroupText,
  CInput,
  CJumbotron,
  CContainer
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';


class matiereEtudiants  extends Component {

    constructor() {
      super();
      this.state = {
        personnes: [],
      
      DateDeCreation:"",
      Contenu:"",
      Files:null,
      };
 

    }
 
    
    componentDidMount(){
      this.getusers();
  }
 
  refreshPage() {
    window.location.reload(false);
  }
  envoyer()
  {
    const fd1 = new FormData();
    fd1.append('Contenu',this.state.Contenu)
    fd1.append('DateDeCreation',this.state.DateDeCreation)
    fd1.append('Files',this.state.Files,this.state.Files.name)

  

  
  
    
    axios.put("http://localhost:8000/PublicationAdministratif/addPublicationAdministratif",fd1)
         
      
      .then(res=>{
          console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
        //  window.location.href='/sidebar'
      })
      .catch((err)=>{
          console.log(err)
      })
  
  
  }
  getusers(){
    axios.get("http://localhost:8000/PublicationAdministratif/getAll").then((res=>{
        this.setState({personnes:res.data.data})
        console.log('personnes',this.state.personnes)
    }))

}
  HandleclickDelete=(_id)=>{
      axios.delete("http://localhost:8000/Etudiant/deleteOne/607acbc003e35411149c96bc	")
      console.log('_id ',_id)
     this.getusers();
  }

  UpdateUser(id) {
      localStorage.setItem("idPerson", id);
      console.log("idPerson ", localStorage.getItem("idPerson"));
      window.location.href = "/update";
    }



    render() {
  
    return (
      <div>
         <CSubheader className="px-3 justify-content-between">
          {
           <div className="d-md-down-none mfe-2 c-subheader-nav"> 
              <CHeaderNavItem className="px-3" >
           <CHeaderNavLink to="/matiereEtudiants/ressourcesEtudiants">Ressources</CHeaderNavLink>
        </CHeaderNavItem>
            <CHeaderNavItem className="px-3" >
           <CHeaderNavLink to="matiereEtudiants/ActivitéEtudiants">Activités</CHeaderNavLink>
        </CHeaderNavItem>
           <CHeaderNavItem className="px-3" >
           <CHeaderNavLink to="/matiereEtudiants/reunionsEtudiants">Reunions</CHeaderNavLink>
        </CHeaderNavItem>
        {/* <CHeaderNavItem className="px-3" >
           <CHeaderNavLink to="/matiereEtudiants/reunionsEtudiants">Tests</CHeaderNavLink>
        </CHeaderNavItem> */}
          {/* <CRow className="align-items-center mt-3">
             <CCol col="2" className="text-center mt-3">
             <CLink to ="matiereEtudiants/ressources">
              <CButton shape="pill" color="danger"  >
                Les ressources 
              </CButton>
              </CLink>
              <CLink to = "matiereEtudiants/activites">
              <CButton shape="pill" color="danger">
                Les Activitès 
              </CButton>
              </CLink>
              <CLink to = "matiereEtudiants/reunion">
              <CButton shape="pill" color="danger">
                Les Réunions 
              </CButton>
              </CLink>
            </CCol>
          </CRow> */}
          </div>
          /* <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div> */}
      </CSubheader>
      {/* <CRow className="align-items-center mt-3">
             <CCol col="2" className="text-center mt-3">
             <CLink to ="matiereEtudiants/ressources">
              <CButton shape="pill" color="danger"  >
                Les ressources 
              </CButton>
              </CLink>
              <CLink to = "matiereEtudiants/activites">
              <CButton shape="pill" color="danger">
                Les Activitès 
              </CButton>
              </CLink>
              <CLink to = "matiereEtudiants/reunion">
              <CButton shape="pill" color="danger">
                Les Réunions 
              </CButton>
              </CLink>
            </CCol>
          </CRow> */}
          <br/>
        <div> 
        <>
        <CCardHeader>     <CCardHeader>
          <h4>Publications de la matiére</h4>
            </CCardHeader>
         <CCardBody>
         
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
                  <CCol md="3">
                  <CLabel htmlFor="company">Publiez</CLabel>
                  </CCol>
                  <CCol xs="1" md="9">
                  <CInput id="company" placeholder="Quoi de neuf ?" onChange={event=>this.setState({Contenu:event.target.value})}/>

                  </CCol>
                </CFormGroup>
            
                 <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">Ajouter des fichiers à votre publication</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="File-input" onChange={event=>this.setState({photo:event.target.files[0]})} />
                  </CCol>
                </CFormGroup>
            </CForm>

            {/* <CRow className="align-items-center">
          <CCol col="1" sm="1" md="1" xl className="mb-3 mb-xl-0">
          <CButton color="success" block type="submit" onClick={()=>{this.envoyer()}}>Ajouter Publication </CButton>
            </CCol>
            </CRow> */}
           
        </CCardBody>
        <CRow>
        <CCardHeader> <CCardBody>
         <CCol col="2" className="text-center mt-3">
              <CButton color="btn btn-light"  block type="submit" onClick={()=>{this.envoyer()}}>
              Ajouter Publication              </CButton>
            </CCol>
            </CCardBody>
        </CCardHeader>
        </CRow>
        </CCardHeader>
        <br/>
        <br/>
    {this.state.personnes.map((item,index)=>(
      <CRow>
        <CCol>
          
          <CCard>

            <CCardHeader>
          <h1>Publications </h1>
            </CCardHeader>
            <CCardBody>
              <CJumbotron fluid>
                <CContainer fluid>
                <tbody>
  
        <tr key={index}>
           
        
                                          <p>{item.Contenu}</p> 
                                          <p>{item.DateDeCreation}</p> 
                                          <p>{item.Files}</p> 
</tr>
    
  
   
  </tbody>
                </CContainer>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
       )   )  }
    </> 
        </div>
        </div>
    )
}}
export default matiereEtudiants;


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

// class matiereEtudiants  extends Component {

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
//       <div>
//          <CSubheader className="px-3 justify-content-between">
//           {
//            <div className="d-md-down-none mfe-2 c-subheader-nav"> 
//            <CHeaderNavItem className="px-3" >
//           <CHeaderNavLink to="/matiereEtudiants/ressourcesEtudiants">Ressources Etudiants</CHeaderNavLink>
//         </CHeaderNavItem>
//            <CHeaderNavItem className="px-3" >
//           <CHeaderNavLink to="matiereEtudiants/ActivitéEtudiants">Activités  Etudiants</CHeaderNavLink>
//         </CHeaderNavItem>
//            <CHeaderNavItem className="px-3" >
//           <CHeaderNavLink to="/matiereEtudiants/reunionsEtudiants">Reunions Etudiants</CHeaderNavLink>
//         </CHeaderNavItem>
//           {/* <CRow className="align-items-center mt-3">
//              <CCol col="2" className="text-center mt-3">
//              <CLink to ="matiereEtudiants/ressources">
//               <CButton shape="pill" color="danger"  >
//                 Les ressources 
//               </CButton>
//               </CLink>
//               <CLink to = "matiereEtudiants/activites">
//               <CButton shape="pill" color="danger">
//                 Les Activitès 
//               </CButton>
//               </CLink>
//               <CLink to = "matiereEtudiants/reunion">
//               <CButton shape="pill" color="danger">
//                 Les Réunions 
//               </CButton>
//               </CLink>
//             </CCol>
//           </CRow> */}
//           </div>
//           /* <div className="d-md-down-none mfe-2 c-subheader-nav">
//             <CLink className="c-subheader-nav-link"href="#">
//               <CIcon name="cil-speech" alt="Settings" />
//             </CLink>
//             <CLink 
//               className="c-subheader-nav-link" 
//               aria-current="page" 
//               to="/dashboard"
//             >
//               <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
//             </CLink>
//             <CLink className="c-subheader-nav-link" href="#">
//               <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
//             </CLink>
//           </div> */}
//       </CSubheader>
//       {/* <CRow className="align-items-center mt-3">
//              <CCol col="2" className="text-center mt-3">
//              <CLink to ="matiereEtudiants/ressources">
//               <CButton shape="pill" color="danger"  >
//                 Les ressources 
//               </CButton>
//               </CLink>
//               <CLink to = "matiereEtudiants/activites">
//               <CButton shape="pill" color="danger">
//                 Les Activitès 
//               </CButton>
//               </CLink>
//               <CLink to = "matiereEtudiants/reunion">
//               <CButton shape="pill" color="danger">
//                 Les Réunions 
//               </CButton>
//               </CLink>
//             </CCol>
//           </CRow> */}
//           <br/>
//         <div> 
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
//                     //                           <CLink to="/matiereEtudiants">
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
//                 {/* <CInputGroup className="mb-3">
//                     <CInputGroupPrepend>
//                       <CInputGroupText>
//                         <CIcon name="cil-user" />
//                       </CInputGroupText>
//                     </CInputGroupPrepend>
//                     <CInput type="text" placeholder="Date de creation" autoComplete="DateDeCreation" onChange={event=>this.setState({DateDeCreation:event.target.value})}></CInput>
//                   </CInputGroup> */}
//                 {/* <CInputGroup  className="mb-3">  
                  
//                   <CInputGroupPrepend><label for="Télécharger Un Fichier">Télécharger un fichier : .. </label>
                
//            <input type="file" placeholder="Télécharger un fichier"    onChange={event=>this.setState({Files:event.target.files[0]})} />
//            </CInputGroupPrepend>  
//             </CInputGroup > */}
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
//         </div>
//         </div>
//     )
// }}
// export default matiereEtudiants