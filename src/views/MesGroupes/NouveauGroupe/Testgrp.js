
//  */
import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CSwitch,
  CLink
} from  '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'



// const [activeIndex] = useState(1)
const TGroupes = ()=> {

  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)
  const [personnes, setPersonnes] = React.useState([])
   
    useEffect(()=>{
      getusers()
    },[])
 
    const getusers=()=>{
      axios.get("http://localhost:8000/PublicationAdministratif/getAll").then((res=>{
        setPersonnes(res.data.data)
    }))

  }
 
    
   

  return (
    <>
    <CRow style={{"flex-direction": "row"}}>
    {
      personnes.map((item,index)=>(
          <CCol xs="12" sm="6" md="4" style={{"flex-direction": "row"}}>
                 <CCard borderColor="info">
                   <CCardHeader>
                   <h4>Publication Administratives</h4>            </CCardHeader>
                   <CCardBody>
                   <tbody>
        
         <tr key={index}>
           
        
                                          <p>{item.Contenu}</p> 
                                           <p>{item.DateDeCreation}</p> 
                                          <p>{item.Files}</p> 
      </tr>
      
      
      
      </tbody>
                  </CCardBody>
                </CCard>
              </CCol>
       
      
              )   )  }
              </CRow>
              </>
  )
}

export default TGroupes