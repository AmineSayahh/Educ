import React, { Component } from 'react'
import axios from "axios" ;
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'



 class LoginSuperAdmin extends Component {
  constructor(props) {
    super(props )
    this.state = {
  
        email: '',
        mdp: '',
       
}
}
LoginSuperAdmin(event) {
    
axios.post("http://localhost:8000/User/authuser",{

email:this.state.email,
mdp:this.state.mdp

}).then((res) => {
  console.log('status',res.data.status)
if(res.data.status==='success'){
  if(res.data.data.user.__t==="SuperAdmin"){
    localStorage.setItem("USER_ROLE", res.data.data.user.__t);
    localStorage.setItem("idUsseer",res.data.data.user._id);
    window.location.href="#/HomeSuper"
  }

  else{
    
    this.setState({msg:"email or password in valid"})
  }
}
else{
alert('verifier vos coordonnées')
}
  
  console.log(res);
})
}
// .then((res) =>{
//   if (res.data.err){
//     setErreurMsg(res.data.err)

//   }else{
//     localStorage.setItem("token",res.data.token);
//     userLoginSuperAdmin(res.data.admin);
//   }
//   if (res.data.admin.role===ADMIN){
//     window.location.href="/";
//   }

// })
// .catch ((err)=>
// console.log (err)
// )
   


  render() {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Connexion</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="email" autoComplete="email" 
                       onChange={event => this.setState({ email: event.target.value })}  />
                    </CInputGroup>
                  
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Mot de passe" autoComplete="current-mdp" 
                       onChange={event => this.setState({ mdp: event.target.value })} />
                    </CInputGroup>
                    <CRow>
                    </CRow>
                    {/* <CLink to="/dashboard"> */}
                    <CCol col="2" className="text-center mt-3">
              <CButton type="submit" id="" name="" value="Envoyer"   
               onClick={(event) => this.LoginSuperAdmin(event)} shape="square" color="light">
                <CIcon name="cil-lightbulb" />CONNEXION
              </CButton>
            </CCol>
                    {/* </CLink> */}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      
    </div>

  )
}
}
export default LoginSuperAdmin
