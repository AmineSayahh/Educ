import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CLink, CCardBody, CRow, CCardHeader } from '@coreui/react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class TGroupes extends Component {
  constructor() {
    super();
    this.state = {
      personnes: [],
      currentPage: 1,
      todosPerPage: 6,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  componentDidMount() {
    this.getusers();
  }

  getusers() {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:4500/api/findAllGroupe`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.setState({ personnes: res.data });
      console.log('personnes', this.state.personnes.length);
    }).catch((err) => {
      console.log(err);
    });
  }

  HandleclickDelete = (evt, id) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:4500/api/deleteGroupe/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log('Deleted group with ID:', id);
      this.getusers(); 
    }).catch((err) => {
      console.error('Error deleting group:', err);
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

  render() {
    const { personnes, currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = personnes.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(personnes.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>Liste des Groupes</CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Abbreviation</th>
                      <th>Liste des Matieres</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTodos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.NomDeGroupe}</td>
                        <td>{item.Abbreviation}</td>
                        <td>
                          <CLink to={`/MesMatieres/TMatieres`}>
                            <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={() => localStorage.setItem("idG", item._id)} />
                          </CLink>
                        </td>
                        <td>
                          <CLink to="/MesEnseignantsOutAff/MesEnseignantsOutAff">
                            <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={() => this.getGROUPE(item._id)} />
                          </CLink>
                        </td>
                        <td>
                          <CLink to="/MesEtudiants/TEtudiants">
                            <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={() => this.getGROUPE(item._id)} />
                          </CLink>
                        </td>
                        <td>
                          <CIcon name="cil-x" active block shape="pill" color="info" aria-pressed="true" onClick={(evt) => this.HandleclickDelete(evt, item._id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button" onClick={this.handleFirstClick}>First</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink previous tag="button" onClick={this.handleClick}>Prev</PaginationLink>
                    </PaginationItem>
                    {pageNumbers.map((number) => (
                      <PaginationItem key={number} active={number === currentPage}>
                        <PaginationLink tag="button" id={number} onClick={this.handleClick}>
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink next tag="button" onClick={this.handleClick}>Next</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink last tag="button" onClick={this.handleLastClick}>Last</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
                <CLink to="/MesGroupes/NGroupe">
                  <CRow>
                    <CCardHeader>
                      <CCardBody>
                        <CCol col="2" className="text-center mt-3">
                          <CButton color="btn btn-light" block type="submit">
                            Ajouter un groupe
                          </CButton>
                        </CCol>
                      </CCardBody>
                    </CCardHeader>
                  </CRow>
                </CLink>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TGroupes;
