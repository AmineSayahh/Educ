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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

class AjoutEnseignant extends Component {
  constructor() {
    super();
    this.state = {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      groupes: [], // To store the list of groupes
      selectedGroupes: [], // To store the selected groupes and their specialities
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:4500/api/findAllGroupe', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.setState({ groupes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchSpecialities(groupeId) {
    const token = localStorage.getItem("token");
    return axios.get(`http://localhost:4500/api/specialites/${groupeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  async handleCheckboxChange(groupeId) {
    const isSelected = this.state.selectedGroupes.some(group => group.groupeId === groupeId);
    let newSelectedGroupes;

    if (isSelected) {
      newSelectedGroupes = this.state.selectedGroupes.filter(group => group.groupeId !== groupeId);
    } else {
      const specialities = await this.fetchSpecialities(groupeId);
      newSelectedGroupes = [...this.state.selectedGroupes, { groupeId, specialities, selectedSpecialities: [] }];
    }

    this.setState({ selectedGroupes: newSelectedGroupes });
  }

  handleSpecialityChange(groupeId, specialityId) {
    const newSelectedGroupes = this.state.selectedGroupes.map(group => {
      if (group.groupeId === groupeId) {
        const isSelected = group.selectedSpecialities.includes(specialityId);
        return {
          ...group,
          selectedSpecialities: isSelected
            ? group.selectedSpecialities.filter(id => id !== specialityId)
            : [...group.selectedSpecialities, specialityId]
        };
      }
      return group;
    });

    this.setState({ selectedGroupes: newSelectedGroupes });
  }

  envoyer() {
    const data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      enseigne: this.state.selectedGroupes.map(group => ({
        GroupeEns: group.groupeId,
        specialite: group.selectedSpecialities
      })),
      repeat_password: this.state.password
    };

    axios.post('http://localhost:4500/api/enseignants', data)
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
          selectedGroupes: [],
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

                    <div className="mb-3">
                      <h5>Groupes</h5>
                      {this.state.groupes.map(groupe => (
                        <div key={groupe._id}>
                          <input
                            type="checkbox"
                            id={groupe._id}
                            value={groupe._id}
                            onChange={() => this.handleCheckboxChange(groupe._id)}
                          />
                          <label htmlFor={groupe._id}>{groupe.NomDeGroupe}</label>
                          {this.state.selectedGroupes.some(group => group.groupeId === groupe._id) && (
                            <div style={{ marginLeft: "20px" }}>
                              {this.state.selectedGroupes.find(group => group.groupeId === groupe._id).specialities.map(speciality => (
                                <div key={speciality._id}>
                                  <input
                                    type="checkbox"
                                    id={speciality._id}
                                    value={speciality._id}
                                    onChange={() => this.handleSpecialityChange(groupe._id, speciality._id)}
                                  />
                                  <label htmlFor={speciality._id}>{speciality.nom}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

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
    );
  }
}

export default AjoutEnseignant;
