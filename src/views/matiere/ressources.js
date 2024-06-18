import React, { Component } from 'react';
import axios from 'axios';
import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } 
from 'reactstrap';
import {
  CCol,
  CButton,
  CInputFile,CForm,CFormGroup,CLabel,CInput,
  CDropdownDivider,CDropdown,CDropdownToggle,CDropdownMenu,CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

let prev  = 0;
let next  = 0;
let last  = 0;

class ressources extends Component {
    constructor() {
        super();
        this.state = {
          Titre:"",
          DateDeDepotDeCours:"",
          TypeDeCours:"",
          Contenu:"",
          Files:null,
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
        
        
          // Files:null

        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
            componentDidMount(){
        this.getusers();
    }
    
    getusers(){
        axios.get(`http://localhost:8000/EspaceDeCours/getAll/${localStorage.getItem('idGRP')}/${localStorage.getItem('idMat')}`)
        .then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnes',this.state.personnes)
        }))

    }
      validate (){
        let isError = false;
        const errors = {
          TitreErr:'',
          TypeDeCoursErr:'',
          // FilesErr:''
        }
        // const rgex1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //nom
       
        if((this.state.Titre ==='')){
        isError=true;
        errors.TitreErr='veuillez verifier votre Titre '
        }
        // const rgex3=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //URLActivite
       
        if((this.state.TypeDeCours ==='')){
        isError=true;
        errors.TypeDeCoursErr='veuillez verifier votre TypeDeCours '
        }
    // const regex2=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //Files
    // if((this.state.Files ==='')) {
    //     isError=true;
    //     errors.FilesErr = 'veuillez verifier votre Files';
    // }
    if(isError){
        this.setState({
        ...this.state,
        ...errors
        })
    }
    return isError;
    
    }

    
      envoyer2(e){
        let err = this.validate()
        e.preventDefault() 
        const fd1 = new FormData();
        fd1.append('Titre',this.state.Titre)
        // fd1.append('DateDeDepotDeCours',this.state.DateDeDepotDeCours)
        fd1.append('TypeDeCours',this.state.TypeDeCours)
        // fd1.append('Contenu',this.state.Contenu)

        fd1.append('Files',this.state.Files,this.state.Files.name)
      
        
        
        axios.post(`http://localhost:8000/EspaceDeCours/addEspaceDeCours/${localStorage.getItem('idGRP')}/${localStorage.getItem('idMat')}/${localStorage.getItem('idUserr')}`,fd1)
             
          
          .then(res=>{
              console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
                     if (res.data.statut){
                alert("Cours est ajouté")
                     window.location.reload()

              }
            //  window.location.href='/sidebar'
          })
          .catch((err)=>{
              console.log(err)
          })
      }


    
      HandleclickDelete=(evt,id)=>{
        axios.delete(`http://localhost:8000/EspaceDeCours/deleteOne/${id}`).then((res)=>{
          console.log('resDel ',id)
       this.getusers();

        })
    }
  
    handleClickEdit(evt,id) {
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
          <CardBody>   <Card>
              <CardHeader>
                {/* <i className="fa fa-align-justify"></i>  */}
               <h5> Espace de ressources de cours : </h5>  
                 
              
              <CDropdown className="m-1">
              <CDropdownToggle color="btn btn-light">
                Ajouter des resources 
              </CDropdownToggle>
              <CDropdownMenu>
                <CForm className="px-4 py-3" >
                  
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">Titre</CLabel>
                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text"
                       onChange={event=>this.setState({Titre:event.target.value})}></CInput>
                        <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.TitreErr}
                    </div>
                  </CFormGroup>
                  {/* <CFormGroup> */}
                    {/* <CLabel htmlFor="exampleDropdownFormtext1">Date</CLabel>
                 
                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text" 
                       onChange={event=>this.setState({DateDeDepotDeCours:event.target.value})}></CInput>
                  </CFormGroup> */}
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">Type de cours</CLabel>

                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text"
                    onChange={event=>this.setState({TypeDeCours:event.target.value})}></CInput>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.TypeDeCoursErr}
                    </div>
                  </CFormGroup>
                  
                  <br/>
                  {/* <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">Contenu</CLabel>

                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text"
                    onChange={event=>this.setState({Contenu:event.target.value})}></CInput>
                  </CFormGroup> */}
                
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">Contenu</CLabel>
                    <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input"
                       onChange={event=>this.setState({Files:event.target.files[0]})}></CInputFile>        </CCol>
                  </CFormGroup>
                  
                  
                  <br/>               
                     <CLink to="/matiere/activites">

                  <CFormGroup className="mt-2">
        
                  <CButton color="btn btn-light" block type="submit"  onClick={(e)=>this.envoyer2(e)}>Ajouter un cours</CButton>
                
                                    </CFormGroup>
                              </CLink>
                </CForm>
                <CDropdownDivider/>
       
              </CDropdownMenu>
            </CDropdown>
            </CardHeader>
{/*           
           
            <br/>
            Liste des Liste de Ressources :
           <br/>
           <br/> */}

                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Titre </th>
                  <th>Description </th>
                  <th>Contenu </th>
                  <th>Date </th>
         
                  
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
                                          
                                          <td>{item.Titre}</td>
                                       <td>{item.TypeDeCours}</td>
                                       <CLink to={`/${item.Files}`} target="_blank" download>{item.Files}</CLink>

                                       {/* <td><img src={`http://localhost:8000/getfile/${item.Files}`} style={{"height":"50px", "width":"50px"}} download/></td> */}
                                     
                                       <td>{item.DateDeDepotDeCours}</td>
                                                
                                      <td>
                                      <CLink to="/matiere/ressourcesupdate">     
           <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
           <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
                onClick = {evt => this.handleClickEdit(evt,item._id)}/>
 
       </CCol>   </CLink>
                                </td>
       
                                 <td>
           <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
           <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                 onClick = {evt => this.HandleclickDelete(evt,item._id)}/>

       </CCol>
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
  </Card>
               </CardBody>
      
          
          </Col>
            
        </Row>  
      </div>

    );
  }
}

export default ressources;
