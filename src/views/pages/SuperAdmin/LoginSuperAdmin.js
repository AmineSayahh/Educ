import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

class LoginSuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mdp: '',
      msg: ''
    };
  }

  LoginSuperAdmin(event) {
    event.preventDefault(); // Prevent default form submission

    axios.post("http://localhost:4500/api/login", {
      email: this.state.email,
      password: this.state.mdp
    }).then((res) => {
      if (res.data.__t === "superadmin") {
        localStorage.setItem("USER_ROLE", res.data.__t);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/homeSuper"; 
      } else {
        this.setState({ msg: "Email or password invalid" });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ msg: "Invalid Email and password combination" });
    });
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={(event) => this.LoginSuperAdmin(event)}>
                      <h1>Connexion</h1>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          placeholder="email"
                          autoComplete="email"
                          onChange={event => this.setState({ email: event.target.value })}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Mot de passe"
                          autoComplete="current-mdp"
                          minLength={6}
                          onChange={event => this.setState({ mdp: event.target.value })}
                        />
                      </CInputGroup>
                      {this.state.msg && <p>{this.state.msg}</p>}
                      <CRow>
                        <CCol col="2" className="text-center mt-3">
                          <CButton type="submit" shape="square" color="light">
                            <CIcon name="cil-lightbulb" />CONNEXION
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default LoginSuperAdmin;
