
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
    default: return 'btn btn-light'
  }
}
const fields = ['name','registered', 'role', 'status']
class  NGroupe  extends Component {
    constructor(){
      super()
      this.state={
          NomDeGroupe:"",Abbreviation:"",long:""
          
      }}
   
      componentDidMount(){
        
        this.getusers();
    }
    
    getusers(){
        axios.get(`http://localhost:8000/Groupe/getAll/${localStorage.getItem('idUser')}`).then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnes',this.state.personnes)
            console.log('eeerrrtttzzzzaaaaa',res)
            this.setState({long:res.data.data.length}) 
                   
        }))

    }
      validate (){
        let isError = false;
        const errors = {
          NomDeGroupeErr:'',
          AbbreviationErr:'',
          FilesErr:''
        }
        // const rgex1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //nom
       
        if((this.state.NomDeGroupe ==='')||(this.state.NomDeGroupe.length>50)){
        isError=true;
        errors.NomDeGroupeErr='veuillez verifier votre nom '
        }
        // const rgex3=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //URLActivite
       
        if((this.state.Abbreviation ==='')||(this.state.Abbreviation.length>50)){
        isError=true;
        errors.AbbreviationErr='veuillez verifier votre URLActivite '
        }
    // const regex2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //Files
    // if((this.state.Files ==='')) {
    //     isError=true;
    //     errors.FilesErr = 'veuillez verifier votre Files';
    // }
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
    const data ={NomDeGroupe:this.state.NomDeGroupe, Abbreviation:this.state.Abbreviation}
  
    
  
  
    
    axios.post(`http://localhost:4500/api/creation`,data)

      
      .then((res)=>{
          console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
          localStorage.setItem("idG",res.data.data._id)
            if(this.state.long != res.data.data.lenght){
                alert('Groupe est créé')
                      }
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
                  <h1> Groupe</h1>
                  <p className="text-muted">Ajouter un groupe</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText> 
                        <CIcon name="cil-puzzle" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nom " autoComplete="Nom" onChange={event=>this.setState({NomDeGroupe:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.NomDeGroupeErr}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-puzzle" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Abbreviation" autoComplete="Abbreviation" onChange={event=>this.setState({Abbreviation:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.AbbreviationErr}
                    </div>
                  </CInputGroup> <br/>
                  <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                      <CInputGroupText>
                  <CLink to="/MesMatieres/TMatieres">
                  <CButton color="btn btn-light" block type="submit"  onClick={()=>{this.envoyer()}} >Ajouter </CButton>
                  
      
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
export default NGroupe
