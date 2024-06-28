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
  ModalFooter,
  Button
} from 'reactstrap';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from '@coreui/react';
import Select from 'react-select';

class TMatieres extends Component {
  constructor() {
    super();
    this.state = {
      matiere: [],
      currentPage: 1,
      todosPerPage: 6,
      search: null,
      long: '',
      groupes: [],
      selectedGroupe: '',
      isModalOpen: false,
      selectedMatiere: null,
      nomMatiereToUpdate: '', // State to hold updated matiere's name
      selectedGroupesToUpdate: [] // State to hold updated matiere's groupes
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleGroupeSelect = this.handleGroupeSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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

  toggleModal() {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
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

  openUpdateModal(matiere) {
    const selectedGroupes = this.state.groupes.filter(groupe => matiere.groupeId.includes(groupe.value));
    this.setState({
      selectedMatiere: matiere,
      nomMatiereToUpdate: matiere.nom,
      selectedGroupesToUpdate: selectedGroupes,
      isModalOpen: true
    });
  }

  handleUpdate() {
    const { selectedMatiere, nomMatiereToUpdate, selectedGroupesToUpdate } = this.state;
    const data = {
      nom: nomMatiereToUpdate,
      groupeId: selectedGroupesToUpdate.map(groupe => groupe.value)
    };

    axios
      .put(`http://localhost:4500/api/modifierMAtiere/${selectedMatiere._id}`, data)
      .then(res => {
        alert('Matière mise à jour avec succès');
        this.toggleModal();
        this.getMatieres();
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchSpace = event => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  HandleclickDelete = (evt, id) => {
    axios.delete(`http://localhost:4500/api/deleteMatiere/${id}`).then(res => {
      this.getMatieres();
    }).catch(err => {
      console.error("There was an error deleting the matiere!", err);
    });
  };

  render() {
    const { matiere, currentPage, todosPerPage, search, isModalOpen, selectedMatiere, groupes, nomMatiereToUpdate, selectedGroupesToUpdate } = this.state;

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
            <Card>
              <CardHeader>
                <h5>Liste de matieres</h5>
              </CardHeader>
              <CardBody>
                <input type="text" placeholder="Rechercher" onChange={e => this.searchSpace(e)} />
                <br />
                <br />
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTodos
                      .filter(item => {
                        if (search == null) {
                          return item;
                        } else if (item.nomMatiere.toLowerCase().includes(search.toLowerCase())) {
                          return item;
                        }
                      })
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.nom}</td>
                          <td>
                            <CButton color="info" onClick={() => this.openUpdateModal(item)}>
                              Modifier
                            </CButton>
                          </td>
                          <td>
                            <CButton color="danger" onClick={(e) => this.HandleclickDelete(e, item._id)}>
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

        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modifier Matiere</ModalHeader>
          <ModalBody>
            <CForm>
              <h1>Matiere</h1>
              <p className="text-muted">Modifier une matiere</p>
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
                  value={nomMatiereToUpdate}
                  onChange={e => this.setState({ nomMatiereToUpdate: e.target.value })}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>Groupes</CInputGroupText>
                </CInputGroupPrepend>
                <Select
                  isMulti
                  options={groupes}
                  value={selectedGroupesToUpdate}
                  onChange={selectedGroupesToUpdate => this.setState({ selectedGroupesToUpdate })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </CInputGroup>
            </CForm>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdate}>
              Modifier
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TMatieres;
