import React, { Component } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardHeader,
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


class AjoutAdministrateur  extends Component {
  constructor(){
    super()
    this.state={
        nom:"",email:"",mdp:"",long:""
        
    }}

  componentDidMount(){
        this.getusers();
    };
getusers(){
 axios.get("http://localhost:8000/Administration/getAll")
  .then((res=>{
      this.setState({personnes:res.data.data})
      console.log('personnes',this.state.personnes)
      this.setState({long:res.data.data.length}) 
     
        }))}
        validate (){
          let isError = false;
          const errors = {
              emailErr:'',
              nomErr:'',
          }
         
          if((this.state.nom ==='')){
          isError=true;
          errors.nomErr='veuillez verifier votre nom '
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
console.log('clicked')

  const fd = new FormData();
  
  fd.append('nom',this.state.nom)
  // fd.append('prenom',this.state.prenom)
  fd.append('email',this.state.email)
  // fd.append('mdp',this.state.mdp)
  // fd.append('statut',this.state.statut)
  
    // const data2 ={nom:this.state.nom,
    //   prenom:this.state.prenom,email:this.state.email,mdp:this.state.mdp,statut:this.state.statut
    // }
  
  
  
  axios.post("http://localhost:8000/Administration/addAdministration/",fd)
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
        console.log(res.data.data.mdp)
        const mot = res.data.data.mdp
        if(this.state.long != res.data.data.lenght){
      alert('Administrateur est créé et son mot de passe est : ' + ' ' +mot)
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
                  <h1>Administration</h1>
                  <p className="text-muted">Ajouter un Administrateur</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nom" autoComplete="Nom" onChange={event=>this.setState({nom:event.target.value})}></CInput>

                      <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nomErr}
                    </div>
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
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.emailErr}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Mot de passe" autoComplete="new-password" onChange={event=>this.setState({mdp:event.target.value})}></CInput>
                  </CInputGroup> 
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cilCheck" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="statut" autoComplete="statut" onChange={event=>this.setState({statut:event.target.value})}></CInput>
                  </CInputGroup> */}
                  
            {/* <CLink to="/MesEnseignantsOutAff"> */}
                  {/* <CButton color="success" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter Administrateur</CButton> */}
                  {/* </CLink> */}
                   {/* <CRow>
        <CCardHeader> <CCardBody> */}
         <CCol col="2" className="text-center mt-3">
              <CButton color="btn btn-light"  block type="submit" onClick={()=>{this.envoyer()}}>
              Ajouter un Administrateur              </CButton>
            </CCol>
            {/* </CCardBody>
        </CCardHeader>
        </CRow> */}
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
export default AjoutAdministrateur