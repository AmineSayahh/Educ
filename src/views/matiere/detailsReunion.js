import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CButton,CCol,CLink
} from '@coreui/react';

import swal from 'sweetalert'

let prev  = 0;
let next  = 0;
let last  = 0;

class detailsReunion extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
          person:{}
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
      componentDidMount(){
        this.getusers();
    }
    // geDetails
    getusers(){
        axios.get(`http://localhost:8000/Reunion/getOne/${localStorage.getItem('idGRP')}/${localStorage.getItem('idMat')}/${localStorage.getItem('idReunion')}`).then((res=>{
            this.setState({personnes:res.data.data.liste_des_participants,person:res.data.data})
            console.log('personnes',this.state.personnes)
        }))
    }
    
    // getAllEnseignantsParGroupe(){
    //   axios.get("http://localhost:8000/Enseignant/getAll").then((res=>{
    //       this.setState({personnes:res.data.data})
    //       console.log('personnes',this.state.personnes)
    //   }))
    // }
    // getAllmatieresEnseignants
    getmatieres(){   
         axios.get("http://localhost:8000/Enseignant/getAll").then((res=>{
          this.setState({personnes:res.data.data})
          console.log('personnes',this.state.personnes)
      }))

  }

   /* deleteItem(evt,id){
      console.log('idddddd',id);
      evt.preventDefault()
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://localhost:5000/Groupe/deleteOne/607960430fa231074059ef1d')
          .then(data => {
            console.log("remooooove", data);
            this.getAllUsers();
          })
          swal("deleted successfuly!", {
            icon: "success",
          });
        } else {
          swal("Your file is safe!");
        }
      });

    }*/
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
          currentPage:last
        });
      }
      handleFirstClick(event) {
    
        event.preventDefault();
    
        this.setState({
          currentPage:1
        });
      }
  
  render() {
    let {personnes, currentPage, todosPerPage} = this.state;

    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
 console.log("indexoflast",indexOfLastTodo);
 console.log("indexfirst",indexOfFirstTodo)
 console.log("persss",personnes)
 let currentTodos =personnes.slice(indexOfFirstTodo, indexOfLastTodo);

    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(personnes.length / todosPerPage);

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
                {/* <i className="fa fa-align-justify"></i>  */}
             Details de la réunion
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Nom Etudiant</th>
                  <th>% Participation</th>
                  <th>% Réponses</th>
                  <th>% Concentration</th>
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                   let a =((item.DureeEtudiant)/(this.state.person.dureeReunion)*100).toFixed(2)
                                   let b = item.Concentration 
                                   let c = parseInt(a)
                                   let d = parseInt(b)
                                   console.log('aaaaaaaaaaaaaaa',a);
                                   console.log('bbbbb',b);
                                   console.log('ccc',c);
                                   console.log('ddd',d);
                                    return(
                                      <tr 
                                      key={index}>
                                      <td>{item.Etudiant.nom + ' ' + item.Etudiant.prenom}</td>
                                      <td>{a + ' '+'%'}</td>
                                      <td>{b + ' '+ '%'}</td>
                                      <td>{(c+(d*3))/4 + ' ' + '%'}</td>
                                      {/* <td>{this.state.person.nomReunion}</td>     */}
                                        {/* {/* <td>{item.Etudiant.prenom}</td> */}                                   
                                      {/* <td>{item.NombreDeQuestion}</td>
                                      <td>{item.NombreDeReponse}</td>
                                      <td>{item.Concentration}</td> */} 
                                      {/* <td>
                                     <CLink to="/Details/ListeDesparticipants">
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"/>
            </CCol>
                    </CLink>
                                     </td>
                                      <td>
                                     <CLink to="/Details/Details">
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"/>
            </CCol>
                    </CLink>
                                     </td> */}
                                     {/* getAllEnseignantsParGroupe */}
                                     {/* <td>
                                     <CLink to="/MesEnseignants/MesEnseignants"> 
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"
          />
            </CCol>
                    </CLink>
                                     </td> */}
                        
                                 
            

                                   

                                    </tr>
                                    );
              
                                  })
                            }
                  
                        </tbody>
                                            
                </Table>
                <nav>
     <Pagination>

      <PaginationItem>
        { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
          <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
        }
      </PaginationItem>
      <PaginationItem>
        { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
          <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
        }
      </PaginationItem>
      {
        pageNumbers.map((number,i) =>
          <Pagination key= {i}>
            <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
              <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                {number}
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        )}

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

               </CardBody>
            </Card>
          
          </Col>
            
        </Row>  
      </div>

    );
  }
}

export default detailsReunion;