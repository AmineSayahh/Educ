
// import React, { Component } from 'react';
// import axios from 'axios';
// import CIcon from '@coreui/icons-react'

// import {  Card, CardBody,CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, ListeRepActivites } 
// from 'reactstrap';
// import {
//   CButton,CCol
// } from '@coreui/react';



// // class ListeRepActivites extends Component {
// //     constructor() {
// //         super();
// //         this.state = {
// //         //   personnes: [],
// //         //   currentPage: 1,
// //         //   todosPerPage: 6,
// //         };
      
// //       }
// //       componentDidMount(){
// //         this.getusers();
// //     }
    
// //     getusers(){
// //         axios.get("http://localhost:8000/ReponseActivites/getAll/608a85d60707921978fec6db/60907a49ffe3cc04a0312f51/60a65ca5d898fc054826e5a7").then((res=>{
// //             this.setState({personnes:res.data.data})
// //             console.log('personnes',this.state.personnes)
// //         }))

// //     }

// //   render() {
   


  

// //     return (
// //       <div className="animated fadeIn">
// //         <Row>         
// //           <Col xs="12" lg="12">
// //             <Card>
// //               <CardHeader>
// //                 <i className="fa fa-align-justify"></i> 
// //                 Liste des Liste des Reponses des Activites
// //               </CardHeader>
// //               <CardBody>
// //                 <ListeRepActivites responsive striped>
// //                   <thead>
// //                   <tr>
// //                   <th>Titre</th>
// //        <th>Fichiers </th>
       
// //        <th>Prenom</th>

// //                   </tr>
// //                   </thead>
// //                         <tbody>
// //                             {
// //                                  currentTodos.map((item,index) =>{
// //                                     return(
                            
// //                                       <tr 
// //                                       key={index}>
// //                                             <td>{item.nom}</td>
                                            
// //                                             <td>{item.Files}</td>  
// //                                                  <td>{item.prenom}</td>    
                                  
// //                                                  <select name="Groupes" id="Groupes-select">
// //                                         <option value="">Liste des Groupes</option>
// //                                         <option value="3LT1">3LT1</option>
// //                                         <option value="3LR2">3LR2</option>
// //                                         <option value="3LT4">3LT4</option>
// //                                         <option value="3LTM1">3LTM1</option>
// //                                         <option value="3LT3">3LT3</option>
// //                                         <option value="3LM2">3LM2</option>
// //                                     </select>
// //                                     <br/>
// //                                     <br/>
// //                                     </tr>
// //                                     );
              
// //                                   })
// //                             }
                  
// //                         </tbody>
                                            
// //                 </ListeRepActivites>
         
// //                </CardBody>
// //             </Card>
          
// //           </Col>
            
// //         </Row>  
// //       </div>

// //     );
// //   }
// // }

// // export default ListeRepActivites;




// // import React, { Component } from 'react';
// // import axios from 'axios'

// class ListeRepActivites extends Component {
//     state = {
//         personnes:[],
//     };
//     componentDidMount(){
//         this.getusers();
//     }
    
//     getusers(){
//         axios.get("http://localhost:8000/ReponseActivites/getAll/608a85d60707921978fec6db/60907a49ffe3cc04a0312f51/60a65ca5d898fc054826e5a7").then((res=>{
//             this.setState({personnes:res.data.data})
//             console.log('personnes',this.state.personnes)
//         }))

//     }
//     // deleteUser=(userId)=>{
//     //     axios.delete('http://localhost:5000/users/DelUser/'+userId)
//     //     console.log('userid ',userId)
//     //    this.getusers();
//     // }
//     // UpdateUser(id) {
//     //     localStorage.setItem("idPerson", id);
//     //     console.log("idPerson ", localStorage.getItem("idPerson"));
//     //     window.location.href = "/update";
//     //   }
//     render() {
       
//         return (
//             <div>

//   <tbody>
//   {this.state.personnes.map((person,index)=>(
//         <tr key={index}>       
//             <select name="Groupes" id="Groupes-select">
//                                         <option value="">Liste des Groupes</option>
//                                         {/* <option {person._id} </option> */}
//                                         <option value="3LR2">3LR2</option>
//                                         <option value="3LT4">3LT4</option>
//                                         <option value="3LTM1">3LTM1</option>
//                                         <option value="3LT3">3LT3</option>
//                                         <option value="3LM2">3LM2</option>
//                                     </select>
   

// </tr>
//     ))
//   }
   
//   </tbody>
  
//             </div>
//         );
//     }
// }

// export default ListeRepActivites;