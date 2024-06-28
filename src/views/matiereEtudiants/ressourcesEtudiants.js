import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {
  CCol,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CDropdownDivider,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

let prev = 0;
let next = 0;
let last = 0;

class ressourcesEtudiant extends Component {
  constructor() {
    super();
    this.state = {
      Titre: "",
      TypeDeCours: "",
      path: "",
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
    axios.get(`http://localhost:4500/api/getRessources/${localStorage.getItem('idM')}`)
      .then((res => {
        this.setState({ personnes: res.data });
        console.log('personnes', this.state.personnes);
      }));
  }

  validate() {
    let isError = false;
    const errors = {
      TitreErr: '',
      TypeDeCoursErr: '',
      pathErr: ''
    };

    if ((this.state.Titre === '')) {
      isError = true;
      errors.TitreErr = 'Veuillez verifier votre Titre ';
    }

    if ((this.state.TypeDeCours === '')) {
      isError = true;
      errors.TypeDeCoursErr = 'Veuillez verifier votre TypeDeCours ';
    }

    if ((this.state.path === '')) {
      isError = true;
      errors.pathErr = 'Veuillez verifier votre Contenu';
    }

    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      });
    }
    return isError;
  }

  // envoyer2(e) {
  //   //let err = this.validate();
  //   e.preventDefault();

  //   //if (!err) {
  //     const data = {
  //       title: this.state.Titre,
  //       path: this.state.path,
  //       userId: localStorage.getItem('userId'),
  //       matiereId: localStorage.getItem('idM')
  //     };

  //     axios.post(`http://localhost:4500/api/addRessources`, data)
  //       .then(res => {
  //         console.log('data', res);
  //         if (res.data.statut) {
  //           alert("Cours est ajouté");
  //           window.location.reload();
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   //}
  // }

  // HandleclickDelete = (evt, id) => {
  //   axios.delete(`http://localhost:8000/EspaceDeCours/deleteOne/${id}`).then((res) => {
  //     console.log('resDel ', id);
  //     this.getusers();
  //   });
  // }

  handleClickEdit(evt, id) {
    localStorage.setItem("idEspace", id);
    console.log("idEspace ", localStorage.getItem("idEspace"));
    window.location.href = "/ressourcesupdate";
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
            <CardBody>
              <Card>
                <CardHeader>
                  <h5>Espace de ressources de cours :</h5>
                </CardHeader>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentTodos.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.path}</td>
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
                        <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                      }
                    </PaginationItem>
                    <PaginationItem>
                      {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                      }
                    </PaginationItem>
                    {
                      pageNumbers.map((number, i) =>
                        <Pagination key={i}>
                          <PaginationItem active={pageNumbers[currentPage - 1] === (number) ? true : false} >
                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      )
                    }
                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                          <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                      }
                    </PaginationItem>
                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                          <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                      }
                    </PaginationItem>
                  </Pagination>
                </nav>
              </Card>
            </CardBody>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ressourcesEtudiant;
