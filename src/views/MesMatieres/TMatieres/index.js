import React, { Component } from 'react';

import axios from 'axios';

import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import CIcon from '@coreui/icons-react'

import {
  CButton,
  CCard,
  CCardBody,
  CLink,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';

let prev  = 0;
let next  = 0;
let last  = 0;

class TMatieres extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
          nomMatiere:"",
          nombre_d_heure_enseignée:"",
          nombre_d_heure:"",
          search:null,
          long:""
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
           componentDidMount(){
        
        this.getusers();
    }
    
    getusers(){
        axios.get(`http://localhost:8000/Matiere/getAllgetAllMatieres/${localStorage.getItem('idUser')}/${localStorage.getItem('idG')}`).then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnes',this.state.personnes)
            console.log('eeerrrtttzzzzaaaaa',res)
            this.setState({long:res.data.data.length}) 
                   
        }))

    }
      envoyer(){
        const data ={nomMatiere:this.state.nomMatiere,
          nombre_d_heure:this.state.nombre_d_heure,
        }
      
        
      

        
        axios.post(`http://localhost:8000/Matiere/addMatiere/${localStorage.getItem('idUser')}/${localStorage.getItem('idG')}`,data)
             
          
          .then(res=>{
              console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
              localStorage.setItem("idM",res.data.data._id)
              if(this.state.long != res.data.data.lenght){
                alert('Matière est créée')
                      }
                              window.location.reload()

          })
          .catch((err)=>{
              console.log(err)
          })
      
      
      }
      // envoyer2(){
      //   const data ={test:true,
      //   }
      //   axios.put("http://localhost:8000/Enseignant/affecterEnseignantMatiere/608a8d9df421b2273c7878ae/6048e2e72ddadc1428ac1ddc",data)
             
          
      //     .then(res=>{
      //         console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
      //       //  window.location.href='/sidebar'
      //     })
      //     .catch((err)=>{
      //         console.log(err)
      //     })
      
      
      // }
      searchSpace=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
      }


 
  
  


    UpdateUser(id) {
        localStorage.setItem("idPerson", id);
        console.log("idPerson ", localStorage.getItem("idPerson"));
        window.location.href = "/update";
      }
      HandleclickDelete=(evt,id)=>{
        axios.delete(`http://localhost:8000/Matiere/deleteOne/${id}`).then((res)=>{
        console.log('resDel ',id)
        this.getusers();
        
        })
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
          <CContainer>
          <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  
                  <h1>Matiere</h1>
                  <p className="text-muted">Ajouter une matiere</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-list" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nom" autoComplete="Nom" onChange={event=>this.setState({nomMatiere:event.target.value})}></CInput>
                  </CInputGroup>
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nombre des heures Enseignées" autoComplete="nombre_d_heure_enseignée" onChange={event=>this.setState({nombre_d_heure_enseignée:event.target.value})}></CInput>
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      
                    </CInputGroupPrepend>
                  </CInputGroup>
                   <CLink to="/MesMatieres/TMatieres">
                  <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                      <CInputGroupText>
                  <CButton color="btn btn-light" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter </CButton>

                  </CInputGroupText>
                    </CInputGroupPrepend>
                    </CInputGroup>
                    </CLink>
                </CForm>
              </CCardBody>
          
            </CCard>
            </CContainer>
            <Card>
              <CardHeader>
              <h5>     Liste de matieres </h5>  </CardHeader>
              <CardBody>
              {/* <i className="fa fa-align-justify"></i>  */}
                      
                      <input type="text" placeholder="Reserach" onChange={(e)=>this.searchSpace(e)} />
                {/* <i className="fa fa-align-justify"></i>  */}
           <br/>
           <br/>

                <Table responsive striped>
                  <thead>
                  <tr>
                  {/* <th> id</th> */}
                    <th>Nom </th>
                    {/* <th>nombre_d_heure_enseignée</th> */}
                    <th>nombre_d_heure</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                    <th> Affectation</th>
                    {/* <th> Access </th> */}
                  </tr>
                  </thead>
                        <tbody>
                            {
               currentTodos.filter((item)=>{
                                  if(this.state.search == null){
                                  console.log('daaaata',item)
                                      return item
                                    }
                                  else if(item.nomMatiere.toLowerCase().includes(this.state.search.toLowerCase())){
                                      return item
                                  }
                                }).map((item,index) =>{
                                    return(
              
                                      <tr 
                                      key={index}>
                                          {/* <td>{item._id}</td> */}
                                      <td>{item.nomMatiere}</td>       
                                      {/* <td>{item.nombre_d_heure_enseignée}</td> */}
                                      <td>{item.nombre_d_heure}</td> 
                                      <td>
           
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <CIcon name="cilCheck"active block shape="pill" color="info" aria-pressed="true"
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
                <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={()=> localStorage.setItem("idM",item._id)}/> 
                 {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
            </CCol>
            </CLink>
                                     </td>
                           
                                    </tr>
                    //                           <td>
                    //                           <CLink to="/matiere">
                    //      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                    //      <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" /> 
                    //       {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
                    //  </CCol>
                    //  </CLink>
                    //                           </td>
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

export default TMatieres;








