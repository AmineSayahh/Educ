
import React, { Component } from 'react';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CLink,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


class AjoutActivite  extends Component {
  constructor(){
    super()
    this.state={
      nom:"",DateDeCreation:"",URLActivite:"",Files:null
    }}
    validate (){
      let isError = false;
      const errors = {
        nomErr:'',
       
        FilesErr:''
      }
      const rgex1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //nom
     
      if((this.state.nom ==='')||(this.state.nom.length>50)||!rgex1.test(this.state.nom)){
      isError=true;
      errors.nomErr='veuillez verifier votre nom '
      }
      const rgex3=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //URLActivite
     
     
  const regex2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //Files
  if((this.state.Files ==='')||(this.state.Files.length>50)||!regex2.test(this.state.Files)) {
      isError=true;
      errors.FilesErr = 'veuillez verifier votre Files';
  }
  if(isError){
      this.setState({
      ...this.state,
      ...errors
      })
  }
  return isError;
  
  }

envoyer(){

  let err = this.validate()
  const fd1 = new FormData();
  fd1.append('nom',this.state.nom)

  fd1.append('Files',this.state.Files,this.state.Files.name)

  

  

  
  axios.post(`http://localhost:8000/ReponseActivites/addReponseActivites/${localStorage.getItem('idUseer')}/${localStorage.getItem('idGoupe')}/${localStorage.getItem('idE')}/${localStorage.getItem('idREPETD')}`,fd1)
       
    
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
                     if (res.data.statut){
                alert("Réponse est ajoutée")
              }
     window.location.reload()
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
                  <h1> Activite</h1>
                  <p className="text-muted">Ajouter une Reponse Activite</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Titre" autoComplete="DateDeCreation" onChange={event=>this.setState({nom:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordErr}
                    </div>
                  </CInputGroup>
 
      
                  <CInputGroup  className="mb-3">  
                   <CInputGroupPrepend><label for="Télécharger Un Fichier">Files:   </label><br />
            <input type="file" placeholder="Télécharger un fichier"   onChange={event=>this.setState({Files:event.target.files[0]})} />
            </CInputGroupPrepend>  
             </CInputGroup >
             
          
                  <CButton color="primary" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter Activité</CButton>
                 
                  
                  
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
export default AjoutActivite
