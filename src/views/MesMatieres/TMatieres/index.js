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
  Table
} from 'reactstrap';
import CIcon from '@coreui/icons-react';
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
  CSelect // Added for dropdown select
} from '@coreui/react';

class TMatieres extends Component {
  constructor() {
    super();
    this.state = {
      matiere: [],
      currentPage: 1,
      todosPerPage: 6,
      nomMatiere: '',
      nombre_d_heure_enseignée: '',
      nombre_d_heure: '',
      search: null,
      long: '',
      groupes: [], 
      selectedGroupe: '', 
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleGroupeSelect = this.handleGroupeSelect.bind(this); 
  }

  componentDidMount() {
    this.getMatieres();
    this.getGroupes(); 
  }

  getMatieres() {
    const groupeId = localStorage.getItem('idG');
    axios.get(`http://localhost:4500/api/specialites/${groupeId}`).then(res => {
      this.setState({ matiere: res.data });
      this.setState({ long: res.data.length });
    });
  }

  getGroupes() {
    const token = localStorage.getItem("token")
    axios
      .get(`http://localhost:4500/api/findAllGroupe`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({ groupes: res.data });
      })
      .catch(error => {
        console.error('Error fetching groupes:', error);
      });
  }

  envoyer() {
    const data = {
      nom: this.state.nomMatiere,
      groupeId: this.state.selectedGroupe 
    };

    axios
      .post(`http://localhost:4500/api/specialites`, data)
      .then(res => {
        if (this.state.long !== res.data.lenght) {
          alert('Matière est créée');
        }
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchSpace = event => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  UpdateUser(id) {
    localStorage.setItem('idPerson', id);
    window.location.href = '/update';
  }

  HandleclickDelete = (evt, id) => {
    axios.delete(`http://localhost:8000/Matiere/deleteOne/${id}`).then(res => {
      this.getMatieres();
    });
  };

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: this.state.last
    });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  handleGroupeSelect(event) {
    this.setState({ selectedGroupe: event.target.value });
  }

  render() {
    const { matiere, currentPage, todosPerPage, groupes } = this.state;

    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = matiere.slice(indexOfFirstTodo, indexOfLastTodo);

    let prev = currentPage > 0 ? currentPage - 1 : 0;
    let last = Math.ceil(matiere.length / todosPerPage);
    let next = last === currentPage ? currentPage : currentPage + 1;

    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
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

                    {/* Dropdown for selecting group */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Groupes</CInputGroupText>
                      </CInputGroupPrepend>
                      <CSelect custom onChange={this.handleGroupeSelect}>
                        <option value="">Sélectionner un groupe</option>
                        {groupes.map(groupe => (
                          <option key={groupe._id} value={groupe._id}>
                            {groupe.NomDeGroupe}
                          </option>
                        ))}
                      </CSelect>
                    </CInputGroup>

                    <CLink to="/MesMatieres/TMatieres">
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CButton color="btn btn-light" block type="submit" onClick={() => this.envoyer()}>
                              Ajouter{' '}
                            </CButton>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                      </CInputGroup>
                    </CLink>
                  </CForm>
                </CCardBody>
              </CCard>
            </CContainer>

            <Card>
              <CardHeader>
                <h5>Liste de matieres</h5>
              </CardHeader>
              <CardBody>
                <input type="text" placeholder="Reserach" onChange={e => this.searchSpace(e)} />
                <br />
                <br />
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom </th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                      <th>Affectation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTodos
                      .filter(item => {
                        if (this.state.search == null) {
                          return item;
                        } else if (item.nomMatiere.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return item;
                        }
                      })
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.nom}</td>
                          <td>
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true" />
                            </CCol>
                          </td>
                          <td>
                            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                              <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true" />
                            </CCol>
                          </td>
                          <td>
                            <CLink to="/MesEnseignants/MesEnseignants">
                              <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                <CIcon
                                  name="cil-chevron-right"
                                  active
                                  block
                                  shape="pill"
                                  color="info"
                                  aria-pressed="true"
                                  onClick={() => localStorage.setItem('idM', item._id)}
                                />
                              </CCol>
                            </CLink>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      {prev === 0 ? (
                        <PaginationLink disabled>First</PaginationLink>
                      ) : (
                        <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>
                          First
                        </PaginationLink>
                      )}
                    </PaginationItem>
                    <PaginationItem>
                      {prev === 0 ? (
                        <PaginationLink disabled>Prev</PaginationLink>
                      ) : (
                        <PaginationLink onClick={this.handleClick} id={prev} href={prev}>
                          Prev
                        </PaginationLink>
                      )}
                    </PaginationItem>
                    {pageNumbers.map((number, i) => (
                      <Pagination key={i}>
                        <PaginationItem active={pageNumbers[currentPage - 1] === number ? true : false}>
                          <PaginationLink onClick={this.handleClick} href={number} id={number}>
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    ))}
                    <PaginationItem>
                      {currentPage === last ? (
                        <PaginationLink disabled>Next</PaginationLink>
                      ) : (
                        <PaginationLink onClick={this.handleClick} href={next} id={pageNumbers[currentPage]}>
                          Next
                        </PaginationLink>
                      )}
                    </PaginationItem>
                    <PaginationItem>
                      {currentPage === last ? (
                        <PaginationLink disabled>Last</PaginationLink>
                      ) : (
                        <PaginationLink onClick={this.handleLastClick} href={last} id={pageNumbers[currentPage]}>
                          Last
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TMatieres;
