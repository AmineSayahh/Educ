import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CButton,CCol,CLink,CRow
} from '@coreui/react';

import swal from 'sweetalert'

let prev  = 0;
let next  = 0;
let last  = 0;

class reunions extends Component {
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
      componentDidMount(){
        let groupe =localStorage.getItem('idGRP')
        let matiere = localStorage.getItem('idMat')
        let user = localStorage.getItem('idUserr')
        this.getusers(groupe,matiere,user);
        // this.envoyerinfo()
    }
    // envoyerinfo(){

     
    
    
    //   axios.post(`http://localhost:8000/infos/crateinfo/${localStorage.getItem('idGRP')}/${localStorage.getItem('idUserr')}/${localStorage.getItem('idMat')}`)
    
      
    //   // axios.put("http://localhost:8000/Activites/addActivites/609119086ecfe125a001e88c/608a85d60707921978fec6db/60907a49ffe3cc04a0312f51",fd1)
           
        
    //     .then(res=>{
    //         console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
    //       //  window.location.href='/sidebar'
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    // gereunions
    getusers(groupe,matiere,user){
        axios.get(`http://localhost:8000/Reunion/getAll/${groupe}/${matiere}`).then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnes',this.state.personnes)
        }))

    }
          getR(idGroupe){
      localStorage.setItem('idGr',idGroupe)
      console.log('idGr',localStorage.getItem('idGr'))
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
      getReunion(id){
        localStorage.setItem('idReunion',id)
        console.log('idReunion',localStorage.getItem('idReunion'))
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
                Liste des Reunions
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  
                    <th>Nom du réunion</th>
                    <th>Durée du reunion</th>
                    <th>Date de début</th>
                   
                  
                    {/* <th>Liste des Enseignants</th> */}
                    <th>Paticipants</th>


             
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                        <td>{item.nomReunion}</td>
                                        <td>{item.dureeReunion + ' ' + 'min'}</td>
                                      <td>{item.dateDebutReunion}</td>       
                                

                                      <td>
                                     <CLink to="/matiere/detailsReunion">
                                     <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="" aria-pressed="true" onClick={()=> this.getReunion(item._id)}/>
            </CCol>
                    </CLink>
        
                                     
                                     {/* <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right"  active block shape="pill" color="info" aria-pressed="true"  href = "http://localhost:8000"/>
            </CCol> */}
                    
                                     </td>

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
  
          <CButton color="primary" block type="submit"  href = "http://localhost:8000/" target="_blank" >Ajouter une réunion</CButton>
          
         
         
          </CardBody>
          </Card>
          
          </Col>
            
        </Row>  
      </div>

    );
  }
}

export default reunions;