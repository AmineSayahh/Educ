import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
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
  CCol,
  CSelect,
  CFormGroup,
  CLabel
} from '@coreui/react';

class MesEnseignantsOutAff extends Component {
  constructor() {
    super();
    this.state = {
      personnes: [],
      currentPage: 1,
      todosPerPage: 6,
      modal: false,
      selectedEnseignant: {
        _id: '',
        nom: '',
        prenom: '',
        email: '',
        enseigne: [] // This will store the groups and their specialities
      },
      groupes: [],
      specialites: {} // This will store the specialities for each group
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openUpdateModal = this.openUpdateModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.fetchSpecialites = this.fetchSpecialites.bind(this); // Bind fetchSpecialites function
  }

  componentDidMount() {
    this.getusers();
    this.fetchGroupes();
  }

  getusers() {
    axios.get(`http://localhost:4500/api/FindEns/${localStorage.getItem("idG")}`)
      .then(res => {
        console.log('Enseignants:', res.data);
        this.setState({ personnes: res.data });
      })
      .catch(err => {
        console.error('Error fetching enseignants:', err);
      });
  }

  fetchGroupes() {
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

  fetchSpecialites(groupeId) {
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

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Math.ceil(this.state.personnes.length / this.state.todosPerPage)
    });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  handleDelete(id) {
    axios.delete(`http://localhost:4500/api/deleteens/${id}`)
      .then(res => {
        console.log('Enseignant deleted successfully');
        this.getusers();
      })
      .catch(err => {
        console.error('Error deleting enseignant:', err);
      });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  openUpdateModal(enseignant) {
    const groupesPromises = enseignant.enseigne.map(item =>
      this.fetchSpecialites(item.GroupeEns)
    );

    Promise.all(groupesPromises).then(groupesSpecialites => {
      const specialites = groupesSpecialites.reduce((acc, specialiteList, idx) => {
        const groupeId = enseignant.enseigne[idx].GroupeEns;
        acc[groupeId] = specialiteList;
        return acc;
      }, {});

      this.setState({
        selectedEnseignant: enseignant,
        specialites
      }, () => {
        this.toggle();
      });
    });
  }

  handleUpdate() {
    const { _id, nom, prenom, email, enseigne } = this.state.selectedEnseignant;

    axios.put(`http://localhost:4500/api/modifierens/${_id}`, {
      nom,
      prenom,
      email,
      enseigne
    })
      .then(res => {
        console.log('Enseignant updated successfully');
        this.toggle();
        this.getusers();
      })
      .catch(err => {
        console.error('Error updating enseignant:', err);
      });
  }

  handleGroupChange(groupeId) {
    this.setState(prevState => {
      const enseigne = [...prevState.selectedEnseignant.enseigne];
      const groupeIndex = enseigne.findIndex(e => e.GroupeEns === groupeId);

      if (groupeIndex > -1) {
        enseigne.splice(groupeIndex, 1);
      } else {
        enseigne.push({ GroupeEns: groupeId, specialite: [] });
      }

      return {
        selectedEnseignant: {
          ...prevState.selectedEnseignant,
          enseigne
        }
      };
    });
  }

  handleSpecialiteChange(groupeId, specialiteId) {
    this.setState(prevState => {
      const enseigne = [...prevState.selectedEnseignant.enseigne];
      const groupeIndex = enseigne.findIndex(e => e.GroupeEns === groupeId);

      if (groupeIndex > -1) {
        const specialiteIndex = enseigne[groupeIndex].specialite.findIndex(s => s._id === specialiteId);
        if (specialiteIndex > -1) {
          enseigne[groupeIndex].specialite.splice(specialiteIndex, 1);
        } else {
          enseigne[groupeIndex].specialite.push({ _id: specialiteId });
        }
      }

      return {
        selectedEnseignant: {
          ...prevState.selectedEnseignant,
          enseigne
        }
      };
    });
  }

  render() {
    const { personnes, currentPage, todosPerPage, modal, selectedEnseignant, groupes, specialites } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = personnes.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(personnes.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                Liste des Enseignants
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTodos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.email}</td>
                        <td>
                          <CButton color="info" onClick={() => this.openUpdateModal(item)}>
                            Modifier
                          </CButton>
                        </td>
                        <td>
                          <CButton color="danger" onClick={() => this.handleDelete(item._id)}>
                            Supprimer
                          </CButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink onClick={this.handleFirstClick}>&lt;&lt;</PaginationLink>
                    </PaginationItem>
                    {pageNumbers.map(number => (
                      <PaginationItem key={number} active={currentPage === number}>
                        <PaginationLink id={number} onClick={this.handleClick}>
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink onClick={this.handleLastClick}>&gt;&gt;</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modifier Enseignant</ModalHeader>
          <ModalBody>
            <CFormGroup>
              <CLabel>Nom</CLabel>
              <CInput
                type="text"
                value={selectedEnseignant.nom}
                onChange={e => this.setState(prevState => ({
                  selectedEnseignant: {
                    ...prevState.selectedEnseignant,
                    nom: e.target.value
                  }
                }))}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel>Prénom</CLabel>
              <CInput
                type="text"
                value={selectedEnseignant.prenom}
                onChange={e => this.setState(prevState => ({
                  selectedEnseignant: {
                    ...prevState.selectedEnseignant,
                    prenom: e.target.value
                  }
                }))}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel>Email</CLabel>
              <CInput
                type="email"
                value={selectedEnseignant.email}
                onChange={e => this.setState(prevState => ({
                  selectedEnseignant: {
                    ...prevState.selectedEnseignant,
                    email: e.target.value
                  }
                }))}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel>Groupes et Spécialités</CLabel>
              {groupes.map(groupe => (
                <div key={groupe._id}>
                  <CFormGroup check>
                    <CLabel check>
                      <input
                        type="checkbox"
                        checked={selectedEnseignant.enseigne.some(e => e.GroupeEns === groupe._id)}
                        onChange={() => this.handleGroupChange(groupe._id)}
                      />{' '}
                      {groupe.nom}
                    </CLabel>
                  </CFormGroup>
                  {selectedEnseignant.enseigne.some(e => e.GroupeEns === groupe._id) && (
                    <div style={{ marginLeft: '20px' }}>
                      {specialites[groupe._id] && specialites[groupe._id].map(specialite => (
                        <CFormGroup check key={specialite._id}>
                          <CLabel check>
                            <input
                              type="checkbox"
                              checked={selectedEnseignant.enseigne.find(e => e.GroupeEns === groupe._id).specialite.some(s => s._id === specialite._id)}
                              onChange={() => this.handleSpecialiteChange(groupe._id, specialite._id)}
                            />{' '}
                            {specialite.nom}
                          </CLabel>
                        </CFormGroup>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CFormGroup>
          </ModalBody>
          <ModalFooter>
            <CButton color="primary" onClick={this.handleUpdate}>Enregistrer</CButton>
            <CButton color="secondary" onClick={this.toggle}>Annuler</CButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MesEnseignantsOutAff;
