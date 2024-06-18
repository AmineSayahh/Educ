import React, { Component } from 'react';
// import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CButton, CCol } from '@coreui/react';
// import swal from 'sweetalert';

let prev = 0;
let next = 0;
let last = 0;

class TEtudiants extends Component {
  constructor() {
    super();
    this.state = {
      personnes: [
        { _id: 1, matricule: "123",  nom: "Sami", prenom: "Jemni", specialité: "CS", email: "jemni@gmail.com" },
        { _id: 2, matricule: "456",  nom: "Salah", prenom: "Ben youssef", specialité: "IT", email: "salah@gmail.com" },
      ],
      currentPage: 1,
      todosPerPage: 6,
      search: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  }

  // Commenting out componentDidMount to prevent API call
  // componentDidMount() {
  //   this.getusers();
  // }

  // Commenting out getusers method to stop API call
  // getusers() {
  //   axios.get(`http://localhost:8000/Etudiant/getAllETD/${localStorage.getItem("idUser")}/${localStorage.getItem('idG')}`).then((res) => {
  //     this.setState({ personnes: res.data.data });
  //     console.log('personnes', this.state.personnes);
  //   });
  // }

  HandleclickDelete = (_id) => {
    // axios.delete(`http://localhost:8000/Etudiant/deleteOne/${_id}`);
    console.log('_id ', _id);
    // this.getusers();
  }

  UpdateUser(id) {
    localStorage.setItem("idPerson", id);
    console.log("idPerson ", localStorage.getItem("idPerson"));
    window.location.href = "/update";
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
      currentPage: last
    });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  render() {
    let { personnes, currentPage, todosPerPage } = this.state;

    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = personnes.slice(indexOfFirstTodo, indexOfLastTodo);

    prev = currentPage > 0 ? (currentPage - 1) : 0;
    last = Math.ceil(personnes.length / todosPerPage);
    next = (last === currentPage) ? currentPage : currentPage + 1;

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
                Liste des Etudiants
              </CardHeader>
              <CardBody>
                <input type="text" placeholder="Recherche" onChange={(e) => this.searchSpace(e)} />
                <br />
                <br />
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Spécialité</th>
                      <th>Email</th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentTodos.filter((item) => {
                        if (this.state.search == null) {
                          return item;
                        } else if (item.nom.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return item;
                        }
                      }).map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.matricule}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.specialité}</td>
                            <td>{item.email}</td>
                            <td>
                              <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
                                  onClick={evt => this.handleClickEdit(evt, item._id)} />
                              </CCol>
                            </td>
                            <td>
                              <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                                  onClick={evt => this.HandleclickDelete(evt, item._id)} />
                              </CCol>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      {prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                        <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>}
                    </PaginationItem>
                    <PaginationItem>
                      {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>}
                    </PaginationItem>
                    {
                      pageNumbers.map((number, i) =>
                        <Pagination key={i}>
                          <PaginationItem active={pageNumbers[currentPage - 1] === (number) ? true : false}>
                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      )}
                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                          <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>}
                    </PaginationItem>
                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                          <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>}
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

export default TEtudiants;


