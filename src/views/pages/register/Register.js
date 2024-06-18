
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


class Register  extends Component {
  constructor(){
    super()
    this.state={
        nom:"",prenom:"",email:"",mdp:"",photo:null,role:"",statut:"",
        
    }}
validate (){
    let isError = false;
    const errors = {
        emailErr:'',
        passwordErr:'',
    }
    const rgex1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //mdp
   
    if((this.state.mdp ==='')||(this.state.mdp.length>50)||!rgex1.test(this.state.mdp)){
    isError=true;
    errors.passwordErr='veuillez verifier votre mdp '
    }
const regex2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //email
if((this.state.email ==='')||(this.state.email.length>50)||!regex2.test(this.state.email)) {
    isError=true;
    errors.emailErr = 'veuillez verifier votre email';
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
if(!err ){
  const fd1 = new FormData();
  
  fd1.append('nom',this.state.nom)
  fd1.append('prenom',this.state.prenom)
  fd1.append('email',this.state.email)
  fd1.append('mdp',this.state.mdp)
  fd1.append('photo',this.state.photo,this.state.photo.name)

  
  
  axios.post("http://localhost:8000/User/addUser",fd1)
       
    
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
      //  window.location.href='/sidebar'
    })
    .catch((err)=>{
        console.log(err)
    })
}
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
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nom" autoComplete="Nom" onChange={event=>this.setState({nom:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Prenom" autoComplete="Prenom" onChange={event=>this.setState({prenom:event.target.value})}></CInput>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email"onChange={event=>this.setState({email:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={event=>this.setState({mdp:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup  className="mb-3">   <CInputGroupPrepend><label for="Télécharger Une Photo">Photo:   </label><br />
            <input type="file" placeholder="Photo"   onChange={event=>this.setState({photo:event.target.files[0]})} />
            </CInputGroupPrepend>   </CInputGroup >
            <CLink to="/">
                  <CButton color="success" block type="submit"  onClick={()=>{this.envoyer()}}>Create Account</CButton>
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
export default Register
