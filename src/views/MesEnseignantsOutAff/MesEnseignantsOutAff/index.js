import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CButton,CCol, CLink,
} from '@coreui/react';

let prev  = 0;
let next  = 0;
let last  = 0;

class MesEnseignantsOutAff extends Component {
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
        this.getusers();
    }
    // envoyer2(){
    //   const data ={test:true,
    //   }
    //   axios.put("http://localhost:8000/Enseignant/affecterEnseignantMatiere/609f12e35e70d32cec35d133/6048a6625281de26307831af/60900829ac8de62818769019",data)
           
        
    //     .then(res=>{
    //         console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
    //       //  window.location.href='/sidebar'
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    
    
    // }
    getusers(){
        axios.get(`http://localhost:8000/Enseignant/getAllEnseignantsParGroupe/${localStorage.getItem("idG")}`).then((res=>{
          console.log('ppppppppppppppppppppppppppppppppppp',res)
            this.setState({personnes:res.data.data})
        }))

    }
    // HandleclickDelete=(_id)=>{
    //     axios.delete("http://localhost:8000/Etudiant/deleteOne/607acbc003e35411149c96bc	")
    //     console.log('_id ',_id)
    //    this.getusers();
    // }
  
    // UpdateUser(id) {
    //     localStorage.setItem("idPerson", id);
    //     console.log("idPerson ", localStorage.getItem("idPerson"));
    //     window.location.href = "/update";
    //   }

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
//  console.log("persss",personnes.[0].nom)
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
                Liste des Enseignants
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  {/* <th>id </th>
                  */}
                    <th>Nom </th>
                    <th>Prenom</th>
                    <th>statut</th>

                    <th>email </th>
                   
                
                    {/* <th>Modifier</th>
                    <th>Supprimer</th>        */}
                    {/* <th>AFFECTATION</th> */}

                    
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                            {/* <td>{item._id}</td> */}
                                          
                                      <td>{item.nom}</td>       
                                      <td>{item.prenom}</td>
                                      <td>{item.statut}</td>
                                      <td>{item.email}</td>       
                                     
{/*                                     
                                      <td>
           
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
               onClick = {evt => this.handleClickEdit(evt,item._id)}/>
             
            </CCol>
                                     </td>
            
                                      <td>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                      onClick = {evt => this.HandleclickDelete(evt,item._id)}/>
    
            </CCol>
                                     </td> */}
                                     {/* <td>
                                     <CLink to="/">
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" 
                 type="submit"  onClick={()=>{this.envoyer2()}}/> 
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

export default MesEnseignantsOutAff;



