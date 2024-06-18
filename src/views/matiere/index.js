
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


class matiere  extends Component {

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
    fd1.append('title',this.state.title)
    fd1.append('description',this.state.description)

  

  
  
    
    axios.post("http://localhost:4000/api/posts",fd1)
         
      
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
          <CHeaderNavLink to="/matiere/ressources">Ressources</CHeaderNavLink>
        </CHeaderNavItem>
           <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/matiere/activites">Activités</CHeaderNavLink>
        </CHeaderNavItem>

        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/matiere/AjoutActivite">Tests</CHeaderNavLink>
        </CHeaderNavItem> */}
          {/* <CRow className="align-items-center mt-3">
             <CCol col="2" className="text-center mt-3">
             <CLink to ="matiere/ressources">
              <CButton shape="pill" color="danger"  >
                Les ressources 
              </CButton>
              </CLink>
              <CLink to = "matiere/activites">
              <CButton shape="pill" color="danger">
                Les Activitès 
              </CButton>
              </CLink>
              <CLink to = "matiere/reunion">
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
             <CLink to ="matiere/ressources">
              <CButton shape="pill" color="danger"  >
                Les ressources 
              </CButton>
              </CLink>
              <CLink to = "matiere/activites">
              <CButton shape="pill" color="danger">
                Les Activitès 
              </CButton>
              </CLink>
              <CLink to = "matiere/reunion">
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
                  <CLabel htmlFor="company">Titre</CLabel>
                  </CCol>
                  <CCol xs="1" md="9">
                  <CInput id="company" placeholder="Titre" onChange={event=>this.setState({title:event.target.value})}/>

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
export default matiere