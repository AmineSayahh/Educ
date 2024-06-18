
import React, { Component } from 'react';
import axios from 'axios';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  CRow,
  CDropdown,
CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'


class AjoutEtudiant  extends Component {
  constructor(){
   
    super()
    this.state={
        nom:"",prenom:"",email:"",mdp:"",photo:null,role:"",statut:"",matricule:"",
        specialité:"", groupes:[]     ,nomG:''
    }
  }

componentDidMount(){
 this.getgroupes()
}

selectidGR(id,nomg){

  localStorage.setItem('idG',id)
  this.setState({nomG:nomg})
  console.log('idddddd',localStorage.getItem("idG"))

}

getgroupes(){
  axios.get(`http://localhost:8000/Groupe/getAll/${localStorage.getItem('idUser')}`).then((res => {
   

  
    console.log('groupesssssssssssssssssss',res.data.data)
    console.log('iddddddddddddddd',res.data.data._id)
    this.setState({groupes:res.data.data})
 
}

  ))
}
getusers(){
  axios.get(`http://localhost:8000/Etudiant/getAll/${localStorage.getItem('idUser')}`)
   .then((res=>{
       this.setState({personnes:res.data.data})
       console.log('personnes',this.state.personnes)
       this.setState({long:res.data.data.length})
      
         }))}  
validate (){
    let isError = false;
    const errors = {
        emailErr:'',
        passwordErr:'',
        nomErr:'',
        prenomErr:'',
        matriculeErr:'',
        specialitéErr:'',
    }
  
const regex2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //email
if((this.state.email ==='')||(this.state.email.length>50)||!regex2.test(this.state.email)) {
    isError=true;
    errors.emailErr = 'veuillez verifier votre email';
    
}
if((this.state.nom ==='')) {
  isError=true;
  errors.nomErr = 'veuillez verifier votre nom';}
  if((this.state.prenom ==='')) {
    isError=true;
    errors.prenomErr = 'veuillez verifier votre prenom';}
    if((this.state.matricule ==='')) {
      isError=true;
      errors.matriculeErr = 'veuillez verifier votre matricule';}
        if((this.state.specialité ==='')) {
          isError=true;
          errors.specialitéErr = 'veuillez verifier votre specialité';}
     
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
  // fd1.append('mdp',this.state.mdp)
  fd1.append('matricule',this.state.matricule)
  fd1.append('specialité',this.state.specialité)
  fd1.append('photo',this.state.photo,this.state.photo.name)

  
  axios.post(`http://localhost:8000/Etudiant/addEtudiant/${localStorage.getItem('idUser')}/${localStorage.getItem('idG')}`,fd1)
       
    
    .then(res=>{
        console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
        localStorage.setItem("idG",res.data.data._id)
        alert(`Compte étudiant est créé et son mot de passe est : ${res.data.password}`)
        // this.clear();
                    window.location.reload()

      //  window.location.href='/sidebar'
    })
    .catch((err)=>{
        console.log(err)
    })
}
}
clear = () =>{
  console.log('in clearrrrrrrrrrrrrrrrrrrrrrr')
  this.setState({
    nom: ""//simply you can clear Templatecode
  });
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
             



                   <h1> Etudiant </h1>
                  <p className="text-muted">Ajouter Etudiant</p>
                  <label for="pet-select">Choisir un groupe:</label>
                  <br/>

                  {/* <select name="Groupes"  >
                    <option value="">Liste des Groupes</option>
                    {this.state.groupes.map((groupe,index) => (
                        <div onClick={()=> this.selectidGR(groupe._id)}>
                      <option  >{groupe.NomDeGroupe} </option>
                      </div>
     
                           ))}
                  </select>  */}


<CDropdown className="m-1 btn-group" >
              <CDropdownToggle color="btn btn-light">
              Liste des Groupes
                            </CDropdownToggle>
              <CDropdownMenu >
              <CDropdownItem disabled>Liste des Groupes</CDropdownItem>
                    {this.state.groupes.map((groupe,index) => (
                        <div onClick={()=> this.selectidGR(groupe._id,groupe.NomDeGroupe)}>
                      <CDropdownItem>{groupe.NomDeGroupe} </CDropdownItem>
                      

                      </div>
                      ))}
                
              </CDropdownMenu>
            </CDropdown>
            <div>{this.state.nomG}</div>
            <br/>
<br/>


                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      {/* <FontAwesomeIcon icon={faUser} /> */}
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
                
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.prenomErr}
                    </div>
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
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={event=>this.setState({mdp:event.target.value})}></CInput>
                    
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordErr}
                    </div>
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                   
                      {/* <FontAwesomeIcon class="fab fa-markdown" /> */}
                      
                            <CIcon name="cil-pencil"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Matricule" autoComplete="Matricule" onChange={event=>this.setState({matricule:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.matriculeErr}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-star" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Specialite" autoComplete="Specialite" onChange={event=>this.setState({specialité:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.specialitéErr}
                    </div>
                  </CInputGroup>
                  <CInputGroup  className="mb-3">  
                   <CInputGroupPrepend><label for="Télécharger Une Photo">Photo:   </label><br />
            <input type="file" placeholder="Photo"   onChange={event=>this.setState({photo:event.target.files[0]})} />
            </CInputGroupPrepend>   </CInputGroup >
            {/* <CLink to="/"> */}
                  <CButton color="btn btn-light" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter un étudiant</CButton>
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
export default AjoutEtudiant
