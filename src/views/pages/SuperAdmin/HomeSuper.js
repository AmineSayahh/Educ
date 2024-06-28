import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import {
  Card, CardBody, CardHeader, Col, Row, Table
} from 'reactstrap';
import {
  CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CInput, CForm, CLink, CRow
} from '@coreui/react';

class HomeSuper extends Component {
  constructor() {
    super();
    this.state = {
      personnes: [],
      currentPage: 1,
      todosPerPage: 6,
      search: null,
      modalVisible: false,
      currentAdmin: { nom: '', prenom: '', email: '', password: '' },
      msg: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  }

  componentDidMount() {
    this.getusers();
  }

  getusers() {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4500/api/super-admin/consult", {
    }).then(res => {
      this.setState({ personnes: res.data });
      console.log('personnes', this.state.personnes);
    }).catch(err => {
      console.error(err);
    });
  }

  updateUser(id) {
    axios.get(`http://localhost:4500/api/super-admin/consult/${id}`).then(res => {
      this.setState({
        currentAdmin: res.data,
        modalVisible: true
      });
    }).catch(err => {
      console.error(err);
    });
  }

  handleDelete = (evt, id) => {
    evt.preventDefault();
    axios.delete(`http://localhost:4500/api/super-admin/delete/${id}`).then(res => {
      console.log('Deleted user ID:', id);
      this.getusers();
    }).catch(err => {
      console.error('Error deleting user:', err);
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
      // currentPage: last
    });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      currentAdmin: { ...prevState.currentAdmin, [name]: value }
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { currentAdmin } = this.state;
    try {
      console.log("current", currentAdmin);
      const res = await axios.put(`http://localhost:4500/api/super-admin/modifier/${currentAdmin._id}`, currentAdmin);
      console.log('Response:', res.data);
      if (res.data) {
        alert('Administrateur mis à jour avec succès.');
        this.setState({ modalVisible: false });
        this.getusers();
      } else {
        this.setState({ msg: "Failed to update the administrator." });
      }
    } catch (err) {
      console.error(err);
      this.setState({ msg: "An error occurred while updating the administrator." });
    }
  }

  render() {
    let { personnes, currentPage, todosPerPage, modalVisible, currentAdmin, msg } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h5>Liste des Administrateurs</h5>
              </CardHeader>
              <CardBody>
                <input type="text" placeholder="Search" onChange={(e) => this.searchSpace(e)} />
                <br /><br />
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>prenom</th>
                      <th>Email</th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      personnes?.filter((item) => {
                        if (this.state.search == null) {
                          return item;
                        } else if (item.nom.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return item;
                        }
                        return null;
                      }).map((item, index) => (
                        <tr key={index}>
                          <td>{item.nom}</td>
                          <td>{item.prenom}</td>
                          <td>{item.email}</td>
                          <td>
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cil-pencil" active block shape="pill" color="info" aria-pressed="true"
                                onClick={evt => this.updateUser(item._id)} />
                            </CCol>
                          </td>
                          <td>
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cil-trash" active block shape="pill" color="danger" aria-pressed="true"
                                onClick={evt => this.handleDelete(evt, item._id)} />
                            </CCol>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                <CLink to="/AjoutAdministrateur">
                  <CRow>
                    <CButton color="btn btn-light" block type="submit">
                      Ajouter un Administrateur
                    </CButton>
                  </CRow>
                </CLink>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CModal show={modalVisible} onClose={() => this.setState({ modalVisible: false })}>
          <CModalHeader closeButton>Modifier Administrateur</CModalHeader>
          <CForm onSubmit={this.handleSubmit}>
            <CModalBody>
              <CInput
                type="text"
                name="nom"
                placeholder="Nom"
                value={currentAdmin.nom}
                onChange={this.handleInputChange}
              />
              <CInput
                type="text"
                name="prenom"
                placeholder="Prenom"
                value={currentAdmin.prenom}
                onChange={this.handleInputChange}
              />
              <CInput
                type="email"
                name="email"
                placeholder="Email"
                value={currentAdmin.email}
                onChange={this.handleInputChange}
              />
              <CInput
                type="password"
                name="password"
                placeholder="Mot de passe"
                minLength={6}
                value={currentAdmin.password}
                onChange={this.handleInputChange}
              />
              {msg && <p style={{ color: 'red' }}>{msg}</p>}
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">Mettre à jour</CButton>{' '}
              <CButton color="secondary" onClick={() => this.setState({ modalVisible: false })}>Annuler</CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </div>
    );
  }
}

export default HomeSuper;
