import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { CButton, CCol } from '@coreui/react';
import swal from 'sweetalert';
import CIcon from '@coreui/icons-react';

let prev = 0;
let next = 0;
let last = 0;

class TEtudiants extends Component {
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
    axios.get(`http://localhost:4500/api/getUsersByGroupeId/${localStorage.getItem('idG')}`)
      .then((res) => {
        this.setState({ personnes: res.data });
        console.log('personnes', this.state.personnes);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
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
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTodos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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
                    {pageNumbers.map((number, i) =>
                      <Pagination key={i}>
                        <PaginationItem active={pageNumbers[currentPage - 1] === (number) ? true : false}>
                          <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    )}
                    <PaginationItem>
                      {currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>}
                    </PaginationItem>
                    <PaginationItem>
                      {currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
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
