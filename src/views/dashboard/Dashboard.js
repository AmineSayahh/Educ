import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem,
  CInput,
  CSubheader,
  CForm,
  CFormGroup,
  CLabel,
  CHeaderNavLink,
  CHeaderNavItem,
  CTextarea,
  CInputFile,
  CImg,
  CLink,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { DocsLink } from 'src/reusable'
import axios from 'axios'
const slides = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]

class Dashboard extends Component {
  state = {
    personnes: [],
    title: "",
    description: "",
  };

  componentDidMount() {
    this.getUsers();
  }

  envoyer() {
    console.log('title', this.state.title);
    console.log('description', this.state.description);
    
    const token = localStorage.getItem('token');
    const payload = {
      title: this.state.title,
      description: this.state.description
    };
  
    axios.post('http://localhost:4500/api/posts', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('data', res);
      if (res.status === 200) {
        alert('Publication est ajoutée');
      }
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getUsers() {
    const token = localStorage.getItem('token');
  
    axios.get('http://localhost:4500/api/posts', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.setState({ personnes: res.data });
      console.log('personnes', this.state.personnes);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
<CRow>
          <CCol xxxxs="0.000000000000000000000000000000000000000000000000000000000000001" xxxxl="0.000000000000000000000000000000000000000000000000000000000000001">
            <CCard>
              {/* <CCardHeader>
          T3ALLEM MAANA
         </CCardHeader> */}
              <CCardBody>
                <CCarousel animate autoSlide={1800}>
                  <CCarouselIndicators />
                  <CCarouselInner>
                    <CCarouselItem>
                      <CImg
                        src={'avatars/photo1.jpg'}
                        className="d-block w-100"
                        alt="slide 1"
                        style={{ "height": "300px", "width": "200px" }}
                      />
                      {/* <CCarouselCaption><h4>Slide 1</h4><p>Slide 1</p></CCarouselCaption> */}
                    </CCarouselItem>
                    <CCarouselItem>

                      <CImg
                        src={'avatars/photo2.jpg'}
                        className="d-block w-100"
                        alt="slide 2"
                        style={{ "height": "300px", "width": "200px" }}
                      />

                      {/* <img className="d-block w-100" src={slides[1]} alt="slide 2"/> */}
                      {/* <CCarouselCaption><h4>Slide 2</h4><p>Slide 2</p></CCarouselCaption> */}
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImg
                        src={'avatars/photo3.jpg'}
                        className="d-block w-100"
                        alt="slide 3"
                        style={{ "height": "300px", "width": "200px" }}
                      />
                      {/* <img className="d-block w-100" src={slides[2]} alt="slide 3"/> */}
                      {/* <CCarouselCaption><h4>Slide 3</h4><p>Slide 3</p></CCarouselCaption> */}
                    </CCarouselItem>
                  </CCarouselInner>
                  <CCarouselControl direction="prev" />
                  <CCarouselControl direction="next" />
                </CCarousel>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CCardHeader>
          <h4>Publications Administratives</h4>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="company">Titre</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="company" placeholder="Titre" onChange={event => this.setState({ title: event.target.value })} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="description">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="description" placeholder="Quoi de neuf ?" onChange={event => this.setState({ description: event.target.value })} />
              </CCol>
            </CFormGroup>
          </CForm>
          <CRow>
            <CCol className="text-center mt-3">
              <CButton color="btn btn-light" block onClick={() => { this.envoyer() }}>
                Ajouter Publication
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
        {this.state.personnes.map((item, index) => (
          <CRow key={index}>
            <CCol>
              <CCard>
                <CCardHeader>
                  <div style={{ float: "right" }}>
                    <CLink to="/matiere/UpdateActivite">
                      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CIcon name="cilCheck" active block shape="pill" color="info" aria-pressed="true"
                          onClick={evt => this.handleClickEdit(evt, item._id)} />
                      </CCol>
                    </CLink>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <CIcon name="cilX" active block shape="pill" color="info" aria-pressed="true"
                        onClick={evt => this.HandleclickDelete(evt, item._id)} />
                    </CCol>
                  </div>
                  <h4>Publication Administratives</h4>
                </CCardHeader>
                <CCardBody>
                  <CJumbotron fluid>
                    <CContainer fluid>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                      <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </CContainer>
                  </CJumbotron>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ))}
      </>
    );
  }
}

export default Dashboard;
