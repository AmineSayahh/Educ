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


class AjoutEnseignant  extends Component {
  constructor(){
    super()
    this.state={
        nom:"",prenom:"",email:"",motdepasse:"",long:""
        
    }}

  componentDidMount(){
        this.getusers();
    };
getusers(){
 axios.get(`http://localhost:4000/api/enseignants`)
  .then((res=>{
      this.setState({personnes:res.data})
      console.log('personnes',this.state.personnes)
      this.setState({long:res.data.data.length}) 
     
        }))}
envoyer(){
console.log('clicked')

  const fd = new FormData();
  
  fd.append('nom',this.state.nom)
  fd.append('prenom',this.state.prenom)
  fd.append('email',this.state.email)
  // fd.append('password',this.state.password)
  fd.append('statut',this.state.statut)  
  fd.append('motdepasse',this.state.statut)  

    // const data2 ={nom:this.state.nom,
    //   prenom:this.state.prenom,email:this.state.email,password:this.state.password,statut:this.state.statut
    // }
  
  
  
  axios.post(`http://localhost:8000/Enseignant/addEnseignant/${localStorage.getItem('idUser')}`,fd)
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
        if(this.state.long != res.data.data.lenght){
          console.log(res.data.data.password)
          const mot=res.data.data.password
          // alert(`Compte enseignant est créé et son mot de passe est : ${res.data.password}`)
      alert('Enseignant est créé et son mot de passe est :'+ '  '+mot)
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
                  <h1>Enseignant</h1>
                  <p className="text-muted">Ajouter un enseignant</p>
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
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={event=>this.setState({password:event.target.value})}></CInput>
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cilCheck" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="statut" autoComplete="statut" onChange={event=>this.setState({statut:event.target.value})}></CInput>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" placeholder="mot de passe" autoComplete="statut" onChange={event=>this.setState({statut:event.target.value})}></CInput>
                </CInputGroup>
                 
            {/* <CLink to="/MesEnseignantsOutAff"> */}
                  <CButton color="btn btn-light" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter un enseignant</CButton>
                  {/* <CButton color="primary" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter </CButton> */}

                  {/* </CLink> */}
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
export default AjoutEnseignant