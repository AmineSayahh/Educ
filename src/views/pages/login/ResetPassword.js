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
import image from './aa.jpg'


 class ResetPassword extends Component {
  constructor(props) {
    super(props )
    this.state = {
  
        password: '',
       
}
}
ResetPassword(event) {
    
axios.post("http://localhost:8000/User/ResetPassword",{

newPass:this.state.password,
resetLink:localStorage.getItem('token')


}).then((res) => {
console.log('reesssREset',res.data);

})
}
// .then((res) =>{
//   if (res.data.err){
//     setErreurMsg(res.data.err)

//   }else{
//     localStorage.setItem("token",res.data.token);
//     userResetPassword(res.data.admin);
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
      <div 
      style={{  
      backgroundImage: `url(${image})` , 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
    className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Entrer un nouveau mot de passe</h1>
                    <br/>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Mot de passe" autoComplete="email" 
                       onChange={event => this.setState({ password: event.target.value })}  />
                    </CInputGroup>
                    <CRow>
                    </CRow>
                          <CCol col="2" className="text-center mt-3">
                          <CLink to="/Login"> 
              <CButton type="submit" id="" name="" value="Envoyer"   
               onClick={(event) => this.ResetPassword(event)} shape="square" color="warning">
                <CIcon name="cil-lightbulb" />Réinitialiser mon mot de passe
              </CButton>
              </CLink>
            </CCol>
                    {/* <CLink to="/dashboard"> */}
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
export default ResetPassword
