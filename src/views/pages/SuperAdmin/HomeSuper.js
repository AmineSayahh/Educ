import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import {
  Card, CardBody, CardHeader, Col, Row, Table
} from 'reactstrap';
import {
  CButton, CCol, CLink, CRow, CCardHeader, CCardBody
} from '@coreui/react';

class HomeSuper extends Component {
  constructor() {
    super();
    this.state = {
      personnes: [],
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

  componentDidMount() {
    this.getusers();
  }

  getusers() {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4500/api/users", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({ personnes: res.data });
      console.log('personnes', this.state.personnes);
    }).catch(err => {
      console.error(err);
    });
  }

  updateUser(id) {
    localStorage.setItem("idPerson", id);
    console.log("idPerson ", localStorage.getItem("idPerson"));
    window.location.href = "/update";
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

  render() {
    let { personnes, currentPage, todosPerPage } = this.state;

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
                    <CCardHeader>
                      <CCardBody>
                        <CCol col="2" className="text-center mt-3">
                          <CButton color="btn btn-light" block type="submit">
                            Ajouter un Administrateur
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

export default HomeSuper;
