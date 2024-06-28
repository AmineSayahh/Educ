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
  CCardHeader,
  CSelect
} from '@coreui/react';

class MesMatieresEnseignant extends Component {
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
  }

  getMatieres() {
    const userId = localStorage.getItem("userId");
    const groupeId = localStorage.getItem('idGRP');
    axios.get(`http://localhost:4500/api/getSpecialite/${userId}/${groupeId}`).then(res => {
      this.setState({ matiere: res.data });
      this.setState({ long: res.data.length });
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
        if (this.state.long !== res.data.length) {
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
  getR(id) {
    localStorage.setItem("idM", id);
  }
  handleGroupeSelect(event) {
    this.setState({ selectedGroupe: event.target.value });
  }

  render() {
    const { matiere, currentPage, todosPerPage, groupes } = this.state;

    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = matiere;

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
          {currentTodos.map((item, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <CCard color="warning" className="text-white">
                <CCardHeader>
                  <CLink to="/matiere/ressources" onClick={() => this.getR(item._id)}
                  >
                    <h5 style={{ color: "white" }}>{item.nom}</h5>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <p>Nombre des heures: {item.nombre_d_heure}</p>
                  <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                    <CIcon
                      name="cil-chevron-right"
                      active
                      block
                      shape="pill"
                      color="info"
                      aria-pressed="true"
                      onClick={() => this.getR(item._id)}
                    />
                  </CCol>
                </CCardBody>
              </CCard>
            </Col>
          ))}
        </Row>
        <nav>
          <Pagination>
            <PaginationItem>
              {prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
              }
            </PaginationItem>
            <PaginationItem>
              {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
              }
            </PaginationItem>
            {pageNumbers.map((number, i) =>
              <Pagination key={i}>
                <PaginationItem active={pageNumbers[currentPage - 1] === (number)}>
                  <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                    {number}
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            )}
            <PaginationItem>
              {currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
              }
            </PaginationItem>
            <PaginationItem>
              {currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
              }
            </PaginationItem>
          </Pagination>
        </nav>
      </div>
    );
  }
}

export default MesMatieresEnseignant;
