import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
let prev  = 0;
let next  = 0;
let last  = 0;

class ListUtilisateur extends Component {
    constructor() {
        super();
        this.state = {
          Personel: [],
          currentPage: 1,
          todosPerPage: 6,



    
          
    
        };
    
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
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
          currentPage:last
        });
      }
      handleFirstClick(event) {
    
        event.preventDefault();
    
        this.setState({
          currentPage:1
        });
      }
    
    componentDidMount() {
        this.getAll();
      }
      getAll() {
        fetch("http://localhost:3050/user/list", {method: "GET"})
          .then(response => response.json())
          .then(res => {
            console.log("Person", res);
            this.setState({Personel: res.data})
          })
      }

      handleClickEdit(e, id){
        e.preventDefault();
        console.log("id",id);
        localStorage.setItem("idp",id);
        window.location.href="/#/GestionComptes/ModifierUtilisateur"
      }
    
      handleClickDelete(e,id){
        e.preventDefault();
        console.log("id",id);
        this.remove(id);

      }

      remove(id)
      
        {
          fetch("http://localhost:3050/user/remove/"+id, {method: "DELETE"})
            .then(response => response.json())
            .then(data => {
              console.log("remove", data);
              this.getAll();
            })
      }

     
  render() {
    let {Personel, currentPage, todosPerPage} = this.state;

    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
 console.log("indexoflast",indexOfLastTodo);
 console.log("indexfirst",indexOfFirstTodo)
 console.log("persss",Personel)
 let currentTodos =Personel.slice(indexOfFirstTodo, indexOfLastTodo);

    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(Personel.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;



    // Logic for displaying page numbers

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
                <i className="fa fa-align-justify"></i> Liste des Utilisateurs
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Matricule</th>
                    <th>Nom </th>
                    <th>Prénom</th>
                    <th>Fonction</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                    
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                      <td>{item.matricule}</td>       
                                      <td>{item.nom}</td>
                                      <td>{item.prenom}</td>
                                      
                                      <td>{item.fonction.description}</td>


                                      <td><i class='fa fa-edit fa-lg mt-8' style={{color:"green"}}
                                       onClick = {evt => this.handleClickEdit(evt,item._id)}></i></td>
                    <td><i class='fa fa-trash fa-lg mt-8' style={{color:"red"}}
                      onClick = {evt => this.handleClickDelete(evt,item._id)}></i></td>

                                    </tr>
                                    );
              
                                  })
                            }
                  
                        </tbody>
                                            
                </Table>
                <nav>

                 
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>  
      </div>

    );
  }
}

export default ListUtilisateur;
