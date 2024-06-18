import React, { Component } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import {Link} from 'react-router-dom'
import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row,Table } 
from 'reactstrap';
import {
  CButton,CCol, CLink,CInputFile,CForm,CFormGroup,CLabel,CInput,
  CDropdownDivider,CDropdown,CDropdownToggle,CDropdownMenu,CInputGroup,
  CInputGroupPrepend,
} from '@coreui/react';
import { Document, Page } from 'react-pdf';


let prev  = 0;
let next  = 0;
let last  = 0;

class activites extends Component {
    constructor() {
        super();
        this.state = {
          personnes: [],
          currentPage: 1,
          todosPerPage: 6,
          numPages:null,
          pageNumber:1,
          nom:"",DateDeCreation:"",URLActivite:"",Files:null
        };
      
        this.handleClick = this.handleClick.bind(this);
        
        this.handleLastClick = this.handleLastClick.bind(this);
    
        this.handleFirstClick = this.handleFirstClick.bind(this);
    
      }
     
      validate (){
        let isError = false;
        const errors = {
          nomErr:'',
          URLActiviteErr:'',
          FilesErr:''
        }
        // const rgex1=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //nom
       
        if((this.state.nom ==='')||(this.state.nom.length>50)){
        isError=true;
        errors.nomErr='veuillez verifier votre nom '
        }
        // const rgex3=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/   //URLActivite
       
        if((this.state.URLActivite ==='')||(this.state.URLActivite.length>50)){
        isError=true;
        errors.URLActiviteErr='veuillez verifier votre URLActivite '
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
      envoyer(){
        let err = this.validate()
        const fd1 = new FormData();
        fd1.append('nom',this.state.nom)
        fd1.append('URLActivite',this.state.URLActivite)
        fd1.append('Files',this.state.Files,this.state.Files.name)
        // fd1.append('DateDeCreation',this.state.DateDeCreation)
      
      
        axios.post(`http://localhost:8000/Activites/addActivites/${localStorage.getItem('idUserr')}/${localStorage.getItem('idGRP')}/${localStorage.getItem('idMat')}`,fd1)
      
        
        // axios.put("http://localhost:8000/Activites/addActivites/609119086ecfe125a001e88c/608a85d60707921978fec6db/60907a49ffe3cc04a0312f51",fd1)
             
          
          .then(res=>{
              console.log('dataaaaaaaaaaaaaaaaaaaaaa',res)
              if (res.data.statut){
                alert("Activité créé")
              }
     window.location.reload()
     //  window.location.href='/sidebar'
          })
          .catch((err)=>{
              console.log(err)
          })
      }
      componentDidMount(){
        this.getusers();
    };
    onDocumentLoadSuccess() {
      this.setState({numPages:this.state.numPages})
    }
    getusers(){
        axios.get(`http://localhost:8000/Activites/getAll/${localStorage.getItem('idGRP')}/${localStorage.getItem('idMat')}`)
        .then((res=>{
            this.setState({personnes:res.data.data})
            console.log('personnnnnnnnnnnnnnnnnnnnnnnnnnnnnes',res.data.data)
        }))

    }
    
    HandleclickDelete=(evt,id)=>{
      axios.delete(`http://localhost:8000/Activites/deleteOne/${id}`).then((res)=>{
        console.log('resDel ',id)
     this.getusers();

      })}
      handleClickEdit(evt,id) {
        localStorage.setItem("idActivite", id);
        console.log("idActivite ", localStorage.getItem("idActivite"));
        window.location.href = "/#/updateActivite";
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
      getAct(id){
        localStorage.setItem('idRep',id)
        console.log('idRep',localStorage.getItem('idRep'))
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
    
          <CardBody> <Card>
            <CardHeader>
                {/* <i className="fa fa-align-justify"></i>  */}
                <h5> Espace des activités : </h5>
           
              <CDropdown className="m-1">
              <CDropdownToggle color="btn btn-light">
                Ajouter une activité 
              </CDropdownToggle>
              <CDropdownMenu>
                <CForm className="px-4 py-3" >
                  
                  {/* <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">DateDeCreation</CLabel>
                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text"
                  onChange={event=>this.setState({DateDeCreation:event.target.value})}></CInput>
                  </CFormGroup> */}
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">Nom</CLabel>
                 
                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text" 
                   onChange={event=>this.setState({nom:event.target.value})}></CInput>
                     <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nomErr}
                    </div>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormtext1">URL d'activité</CLabel>

                    <CInput className="form-control" id="exampleDropdownFormtext1" type="text" placeholder="text" autoComplete="current-text"
                onChange={event=>this.setState({URLActivite:event.target.value})}></CInput>
                  <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.URLActiviteErr}
                    </div>
                    
                  </CFormGroup>
                  
                  <br/>
                 
                
                  <CInputGroup  className="mb-3">  
                  
                  <CInputGroupPrepend><label for="Télécharger Un Fichier">Télécharger un fichier : </label> <br/>
                
           <input type="file" placeholder="Télécharger un fichier"    onChange={event=>this.setState({Files:event.target.files[0]})} />
        
           </CInputGroupPrepend>  
           
            </CInputGroup >
                  
                  <br/>
                  <CLink to="/matiere/activites">
                  <CButton color="btn btn-light" block type="submit"  onClick={()=>{this.envoyer()}}>Ajouter Activité</CButton>
                  </CLink>
                </CForm>
                <CDropdownDivider/>
       
              </CDropdownMenu>
            </CDropdown>
            </CardHeader>

              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> 
                Liste des activites
              </CardHeader> */}
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Titre</th>
       <th>Fichiers </th>
         <th>URL d'Activite </th>
       <th>Date De Creation </th>
       
       <th>Modifier</th>
                    <th>Supprimer</th>
       <th>Réponses </th>
                  </tr>
                  </thead>
                        <tbody>
                            {
                                 currentTodos.map((item,index) =>{
                                   let a =item.Files[0]
                                   a.split(4)
                                   console.log('aaaassssss',a[0])
                                    return(
              
                                      <tr 
                                      key={index}>
                                            <td>{item.nom}</td>
                                            {/* <td>{item.Files}</td> */}
                                            <CLink to={`/${item.Files}`} target="_blank" download>{item.Files}</CLink>

                                            {/* <td><img src={`http://localhost:8000/getfile/${item.Files}`} style={{"height":"50px", "width":"50px"}} download/></td> */}
                                          
                                            <td>   <Link to={`/${item.URLActivite}`} target="_blank" >{item.URLActivite}</Link></td>
                                            {/* <a target="_blank" href={`${item.URLActivite}`}>{item.URLActivite}</a> */}
                                            <td>{item.DateDeCreation}</td>
            
                                        
                                            <td>
                                            <CLink to="/matiere/UpdateActivite">
           <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
           <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
          onClick = {evt => this.handleClickEdit(evt,item._id)}/>
        
       </CCol>
       </CLink>   
                     </td>
       
                                 <td>
           <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
           <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                 onClick = {evt => this.HandleclickDelete(evt,item._id)}/>

       </CCol>
                                </td>
                                
                                     <td>
                                     <CLink to="/matiere/ListeRepActivites">
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
                <CIcon name="cil-chevron-right" active block shape="pill" color="info" aria-pressed="true" onClick={()=> this.getAct(item._id)}/> 
                 {/* type="submit"  onClick={()=>{this.envoyer2()}} */}
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
            </CardBody>
          </Col>
            
        </Row>  
      </div>

    );
  }
}

export default activites;
