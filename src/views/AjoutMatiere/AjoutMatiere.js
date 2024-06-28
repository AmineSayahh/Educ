import React, { Component } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Select from 'react-select';

class AjouterMatiere extends Component {
  constructor() {
    super();
    this.state = {
      nomMatiere: '',
      selectedGroupes: [], // Change to an array for multi-select
      groupes: []
    };
  }

  componentDidMount() {
    this.getGroupes();
  }

  getGroupes() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4500/api/findAllGroupe`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const groupes = res.data.map(groupe => ({ value: groupe._id, label: groupe.NomDeGroupe }));
        this.setState({ groupes });
      })
      .catch(error => {
        console.error('Error fetching groupes:', error);
      });
  }

  envoyer() {
    const data = {
      nom: this.state.nomMatiere,
      groupeId: this.state.selectedGroupes.map(groupe => groupe.value) // Extract IDs from selected groups
    };

    axios
      .post(`http://localhost:4500/api/specialites`, data)
      .then(res => {
        alert('Matière créée');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { groupes } = this.state;

    return (
      <CContainer>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm>
              <h1>Matiere</h1>
              <p className="text-muted">Ajouter une matiere</p>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-list" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  placeholder="Nom"
                  autoComplete="Nom"
                  onChange={event => this.setState({ nomMatiere: event.target.value })}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>Groupes</CInputGroupText>
                </CInputGroupPrepend>
                <Select
                  isMulti
                  options={groupes}
                  onChange={selectedGroupes => this.setState({ selectedGroupes })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </CInputGroup>

              <CButton color="btn btn-light" block type="button" onClick={() => this.envoyer()}>
                Ajouter
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CContainer>
    );
  }
}

export default AjouterMatiere;
