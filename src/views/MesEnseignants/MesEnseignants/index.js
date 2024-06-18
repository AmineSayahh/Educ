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

class MesEnseignants extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
          search:null,  
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
    
selectidens(id){

  localStorage.setItem('idUserr',id)
  console.log('idddddd',localStorage.getItem("idUserr"))

}

    
      componentDidMount(){
        this.getusers();
    }
    envoyer2(id){
      const data ={test:true,
      }
      axios.post(`http://localhost:8000/Enseignant/affecterEnseignantMatiere/${localStorage.getItem('idM')}/${id}/${localStorage.getItem('idG')}`,data)
           
   
        .then(res=>{
            console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
            localStorage.setItem("idUserr",res.data.data._id)
            console.log(res.data.statut)
            
            if(res.data.statut){
              alert('Affecté avec succés')
                    }
          //  window.location.href='/sidebar'
        })
        .catch((err)=>{
            console.log(err)
        })
    
    
    }
             

    getusers(){
        axios.get(`http://localhost:8000/Enseignant/getAll/${localStorage.getItem('idUser')}`).then((res=>{
            this.setState({personnes:res.data.data})
            // localStorage.setItem("idUserr",res.data.data._id)
            console.log('personnes',this.state.personnes)
        }))

    }
         
   
    HandleclickDelete=(evt,id)=>{
axios.delete(`http://localhost:8000/Enseignant/deleteOne/${id}`).then((res)=>{
console.log('resDelEnseignant ',id)
this.getusers();

})
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
     <h5> Liste des Enseignants</h5>
                      
                 
         
              </CardHeader>
              <CardBody>
              {/* <i className="fa fa-align-justify"></i>    */}
              <input type="text" placeholder="Reserach" onChange={(e)=>this.searchSpace(e)} />
                {/* <i className="fa fa-align-justify"></i>  */}
                <br/>
                <br/>

                <Table responsive striped>
                  <thead>
                  <tr>
                  {/* <th>id </th>
                  */}
  <th>Photo </th>
                    <th>Nom </th>
                    <th>Prenom</th>
                    <th>statut</th>
                    <th>email </th>
                   
                
                    <th>Modifier</th>
                    <th>Supprimer</th>       
                    <th>AFFECTATION</th>

                    
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.filter((item)=>{
                                  if(this.state.search == null){
                                  console.log('daaaata',item)
                                      return item
                                    }
                                  else if(item.nom.toLowerCase().includes(this.state.search.toLowerCase())){
                                      return item
                                  }
                                }).map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                            {/* <td>{item._id}</td> */}
                                                                                 <td><img src={`http://localhost:8000/getfile/${item.photo}`} style={{"height":"50px", "width":"50px"}} download/></td>

                                      <td>{item.nom}</td>       
                                      <td>{item.prenom}</td>
                                      <td>{item.statut}</td>
                                      <td>{item.email}</td>       
                                     
                                    
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
            
                                     </td>
                                     <td>
                                     <CLink to="/MesEnseignants/MesEnseignants">
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" 
                 type="submit"   onClick={()=>{this.envoyer2(item._id)}}/> 
               
            </CCol>
            </CLink>
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

export default MesEnseignants;
