import React, { Component } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CContainer,
  CForm,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class AjoutEnseignant extends Component {
  constructor() {
    super()
    this.state = {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      specialite: [], // Change to array for multiple specialties
      long: ""
    }
  }

  envoyer() {
    const data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      specialite: this.state.specialite,
      repeat_password: this.state.password
    };

    axios.post(`http://localhost:4500/api/enseignants`, data)
      .then(res => {
        console.log('Response:', res);
        if (res.data) {
          const mot = this.state.password;
          alert('Enseignant est créé et son mot de passe est : ' + mot);
        }
        // Clear form fields if needed
        this.setState({
          nom: "",
          prenom: "",
          email: "",
          password: "",
          specialite: []
        });
      })
      .catch(err => {
        console.log(err);
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
                    <h1>Enseignant</h1>
                    <p className="text-muted">Ajouter un enseignant</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Nom"
                        autoComplete="Nom"
                        value={this.state.nom}
                        onChange={event => this.setState({ nom: event.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Prenom"
                        autoComplete="Prenom"
                        value={this.state.prenom}
                        onChange={event => this.setState({ prenom: event.target.value })}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={event => this.setState({ email: event.target.value })}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cilCheck" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Spécialités (séparées par des virgules)"
                        autoComplete="specialite"
                        value={this.state.specialite}
                        onChange={event => this.setState({ specialite: event.target.value })}
                      />
                    </CInputGroup>

                    <CButton color="btn btn-light" block type="button" onClick={() => this.envoyer()}>
                      Ajouter un enseignant
                    </CButton>
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

export default AjoutEnseignant;
