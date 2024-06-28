import React, { useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const AjoutAdministrateur = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      repeat_password: password
    };

    try {
      const res = await axios.post("http://localhost:4500/api/super-admin/create", data);
      console.log('Response:', res.data);

      if (res.data) {
        alert('Administrateur est créé et son mot de passe est : ' + data.password);
        window.location.href = "/homeSuper";
      } else {
        setMsg("Failed to create the administrator.");
      }
    } catch (err) {
      console.error(err);
      setMsg("An error occurred while creating the administrator.");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Administration</h1>
                  <p className="text-muted">Ajouter un Administrateur</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Nom"
                      autoComplete="Nom"
                      value={nom}
                      onChange={event => setNom(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Prenom"
                      autoComplete="Prenom"
                      value={prenom}
                      onChange={event => setPrenom(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Mot de passe"
                      autoComplete="new-password"
                      value={password}
                      minLength={6}
                      onChange={event => setPassword(event.target.value)}
                    />
                  </CInputGroup>
                  {msg && <p style={{ color: 'red' }}>{msg}</p>}
                  <CRow>
                    <CCol col="2" className="text-center mt-3">
                      <CButton color="success" block type="submit">
                        Ajouter un Administrateur
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AjoutAdministrateur;
