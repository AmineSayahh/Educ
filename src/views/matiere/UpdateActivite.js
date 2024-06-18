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


class UpdateActivite extends Component {
  constructor(){
    super()
    this.state={
      nom:"",DateDeCreation:"",URLActivite:"",Files:null
    }
  this.getAct()}
  

    getAct(){
      axios.get(`http://localhost:8000/Activites/getOne/${localStorage.getItem('idActivite')}`).then((res)=>{
        console.log('resAct',res)
        this.setState({nom:res.data.data.nom,URLActivite:res.data.data.URLActivite})
      })
    }
envoyer(){

  const fd1 = new FormData();
  fd1.append('nom',this.state.nom)
  fd1.append('URLActivite',this.state.URLActivite)
  fd1.append('Files',this.state.Files,this.state.Files.name)



  axios.put(`http://localhost:8000/Activites/updateByID/${localStorage.getItem('idActivite')}`,fd1)
       
    
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaaUpdate',res)
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
                  <p className="text-muted">Ajouter une Activite</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Date de creation" autoComplete="DateDeCreation" onChange={event=>this.setState({DateDeCreation:event.target.value})}></CInput>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Titre" autoComplete="DateDeCreation" defaultValue={this.state.nom} onChange={event=>this.setState({nom:event.target.value})}></CInput>
                  </CInputGroup>
 
      
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="URL d'activite" autoComplete="URLActivite" defaultValue={this.state.URLActivite} onChange={event=>this.setState({URLActivite:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup  className="mb-3">  
                  
                   <CInputGroupPrepend><label for="Télécharger Un Fichier">Télécharger un fichier : </label> <br/>
                 
            <input type="file" placeholder="Télécharger un fichier"    onChange={event=>this.setState({Files:event.target.files[0]})} />
            </CInputGroupPrepend>  
             </CInputGroup >
        

            <CLink to="/dashboard">
                  <CButton color="success" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter Activité</CButton>
                  </CLink>

                  
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
export default UpdateActivite
