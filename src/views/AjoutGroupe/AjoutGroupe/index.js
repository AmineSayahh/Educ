
import React, { Component } from 'react';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLink,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
const fields = ['name','registered', 'role', 'status']
class  AjoutGroupe extends Component {
    constructor(){
      super()
      this.state={
          NomDeGroupe:"",Abbreviation:"",
          
      }}
   
  envoyer(){
    const data ={NomDeGroupe:this.state.NomDeGroupe, Abbreviation:this.state.Abbreviation}
  

    
    axios.post("http://localhost:4500/creation",data)
         
      
      .then(res=>{
          console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
        //  window.location.href='/sidebar'
      })
      .catch((err)=>{
          console.log(err)
      })
  
  
  }
  

render() {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Nouveau Groupe</h1>
                  <p className="text-muted">Ajouter Un Groupe</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nom " autoComplete="Nom" onChange={event=>this.setState({NomDeGroupe:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Abbreviation" autoComplete="Abbreviation" onChange={event=>this.setState({Abbreviation:event.target.value})}></CInput>
                  </CInputGroup> <br/>
                  <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                      <CInputGroupText>
                  <CLink to="/MesMatieres/TMatieres">
                  <CButton color="success" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter </CButton>
                  </CLink>
                
                  </CInputGroupText>
                    </CInputGroupPrepend>
                    </CInputGroup>
                  </CForm>
                  
              </CCardBody>
          
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
}
export default AjoutGroupe