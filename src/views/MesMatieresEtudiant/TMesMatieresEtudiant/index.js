import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLink } from '@coreui/react';

const MesMatieresEtudiant = () => {
  const [personnes, setPersonnes] = useState([]);

  useEffect(() => {
    getMatiereByUserId();
  }, []);

  const getMatiereByUserId = () => {
    axios.get(`http://localhost:4500/api/getMatiereByUserId/${localStorage.getItem('userId')}`)
      .then((res) => {
        setPersonnes(res.data);
      })
      .catch((error) => {
        console.error('Error fetching matieres:', error);
      });
  };

  const getE = (id) => {
    localStorage.setItem('idM', id);
    console.log('idE', localStorage.getItem('idE'));
  };

  return (
    <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
      <CRow>
        {personnes.map((item, index) => (
          <CCol xs="6" sm="3" md="3" key={index}>
            <CCard color="warning" className="text-white" style={{ marginBottom: '20px' }}>
              <CCardHeader>
                <CLink to="/matiereEtudiants/ressourcesEtudiants">
                  <h5 style={{ color: "white", align: "center" }} onClick={() => getE(item.matiereId._id)}>{item.matiereId.nom}</h5>
                </CLink>
              </CCardHeader>
              <CCardBody>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default MesMatieresEtudiant;
