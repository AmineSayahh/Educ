import React, { Component } from 'react';
import axios from 'axios';
import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
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
CFormGroup,CLabel,
  CDropdownDivider,CDropdown,CDropdownToggle,CDropdownMenu,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'


class ressourcesupdate extends Component {
    constructor() {
        super();
        this.state = {
          Titre:"",
          DateDeDepotDeCours:"",
          TypeDeCours:"",
          Contenu:"",
          // Files:null,

        };
  
        this.getRESS()
      }
      getRESS(){
        axios.get(`http://localhost:8000/EspaceDeCours/getOne/${localStorage.getItem('idEspace')}`).then((res)=>{
          console.log('resCours',res)
          this.setState({Titre:res.data.data.Titre,DateDeDepotDeCours:res.data.data.DateDeDepotDeCours,
            Contenu:res.data.data.Contenu,TypeDeCours:res.data.data.TypeDeCours})
        })
      }
 envoyer(){
      //  e.preventDefault() 
        const fd1 = new FormData();
        fd1.append('Titre',this.state.Titre)
        fd1.append('DateDeDepotDeCours',this.state.DateDeDepotDeCours)
        fd1.append('TypeDeCours',this.state.TypeDeCours)
        fd1.append('Contenu',this.state.Contenu)

        // fd1.append('Files',this.state.Files,this.state.Files.name)
      
        
        
        axios.post(`http://localhost:8000/EspaceDeCours/updateByID/${localStorage.getItem('idEspace')}`,fd1)
             
          
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
                        <h1> Activite</h1>
                        <p className="text-muted">Ajouter une Activite</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Titre" autoComplete="Titre" onChange={event=>this.setState({Titre:event.target.value})}></CInput>
                        </CInputGroup>

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
                          <CInput type="text" placeholder="TypeDeCours" autoComplete="TypeDeCours" onChange={event=>this.setState({TypeDeCours:event.target.value})}></CInput>
                        </CInputGroup>
       
            
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Contenu" autoComplete="Contenu" onChange={event=>this.setState({Contenu:event.target.value})}></CInput>
                        </CInputGroup>

                        {/* <CInputGroup  className="mb-3">  
                        
                         <CInputGroupPrepend><label for="Télécharger Un Fichier">Télécharger un fichier : .. </label>
                       
                  <input type="file" placeholder="Télécharger un fichier"    onChange={event=>this.setState({Files:event.target.files[0]})} />
                  </CInputGroupPrepend>  
                   </CInputGroup >
               */}
      <br/>
                  <CFormGroup className="mt-2">
        
                  <CButton color="success" block type="submit" onClick={()=>{this.envoyer()}}>Ajouter Activité</CButton>
                
                                    </CFormGroup>
                        
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

export default ressourcesupdate;
