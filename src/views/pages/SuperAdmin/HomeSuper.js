import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CButton,CCol, CLink,CRow,CCardHeader,CCardBody
} from '@coreui/react';

let prev  = 0;
let next  = 0;
let last  = 0;

class HomeSuper extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
          search:null   
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
      searchSpace=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
      }
      componentDidMount(){
        this.getusers();
    }
    // envoyer2(){
    //   const data ={test:true,
    //   }
    //   axios.put(http://localhost:8000/Enseignant/affecterEnseignantMatiere/${localStorage.getItem('idM')}/${localStorage.getItem('idUserr')}/${localStorage.getItem('idG')},data)
           
   
    //     .then(res=>{
    //         console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
    //         localStorage.setItem("idUserr",res.data.data._id)
    //       //  window.location.href='/sidebar'
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    
    
    // }
             

    getusers(){
        axios.get("http://localhost:8000/Administration/getAll").then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnes',this.state.personnes)
        }))

    }
   


  
    UpdateUser(id) {
        localStorage.setItem("idPerson", id);
        console.log("idPerson ", localStorage.getItem("idPerson"));
        window.location.href = "/update";
      }
      HandleclickDelete=(evt,id)=>{
        axios.delete(`http://localhost:8000/Administration/DelAdministration/${id}`).then((res)=>{
          console.log('resDel ',id)
       this.getusers();
  
        })}

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
             
          <h5> Liste des Administrateurs</h5>
                      
                 
         
              </CardHeader>
              <CardBody>
        
              <input type="text" placeholder="Reserach" onChange={(e)=>this.searchSpace(e)} />
         
                <br/>
                <br/>

                <Table responsive striped>
                  <thead>
                  <tr>
                  {/* <th>id </th>
                  */}
  <th>Photo </th>
                    <th>Nom </th>
                    {/* <th>Prenom</th> */}
                    <th>email </th>               
                    <th>Modifier</th>
                    <th>Supprimer</th>       

                    
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
                                      {/* <td>{item.prenom}</td> */}
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
                                     {/* <CLink to="/HomeSuper/HomeSuper">
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" 
                 type="submit"  onClick={()=>{this.envoyer2()}}/> 
            </CCol> */}
            {/* </CLink> */}
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
         <CLink to="/AjoutAdministrateur">
            <CRow>
        <CCardHeader> <CCardBody>
         <CCol col="2" className="text-center mt-3">
              <CButton color="btn btn-light"  block type="submit" >
              Ajouter un Administrateur              </CButton>
            </CCol>
            </CCardBody>
        </CCardHeader>
        </CRow>
                  {/* <CButton color="success" block type="submit">Ajouter un Administrateur</CButton> */}
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
