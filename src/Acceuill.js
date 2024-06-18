// import React, { Component } from 'react';
// import {
//   CLink
// } from '@coreui/react';
// class Acceuill extends Component {

// render(){

//     return (
//         <div>
//   <div>
//     <div className="top_container">
//       {/* header section strats */}
//       <header className="header_section">
//         <div className="container">
//           <nav className="navbar navbar-expand-lg custom_nav-container ">
//             <a className="navbar-brand" href="index.html">
//               <img src="assets/images/log.PNG" alt />
//               <span>
//                 T3ALLEM M3ANA

//               </span>
//             </a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon" />
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
//                 <ul className="navbar-nav  ">
//                   <li className="nav-item active">
//                     <a className="nav-link" href="index.html"> Acceuill <span className="sr-only">(current)</span></a>
//                   </li>
                  
//                   <li className="nav-item ">
//                     <a className="nav-link" href="#team">Equipe</a>
//                   </li>
//                   <li className="nav-item ">
//                     <a className="nav-link" href="#about">A propos</a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#contact">Contact</a>
//                   </li>
//                 </ul>
//                 <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
//                   <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit" />
//                 </form>
//               </div>
//             </div></nav>
//         </div>
//       </header>
//       <section className="hero_section ">
//         <div className="hero-container container">
//           <div className="hero_detail-box">
//             <h3>
//             Bienvenue  <br />
//    Ici c'est l'éducation par excellence 
//             </h3> <br/> <br/>
//             <h1>
//               EDU'COM
//             </h1>
//             <h5>
//             Au service de toutes les réussites. 
//             </h5>
//             <br/>
//             <CLink to="/Login">
//             <div className="hero_btn-continer">
//               <a className="call_to-btn btn_white-border">
//                 <span>
//                   Connexion
//                 </span>
//                 <img src="assets/images/right-arrow.png" alt />
//               </a>
//             </div>
//             </CLink>
//           </div>
//           <div className="hero_img-container">
//             <div>
//               <img src="assets/images/hero.png" alt className="img-fluid" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//     {/* end header section */}
//     {/* about  */}
//     <section className="about_section layout_padding">
//       <div id="about" className="about">
//         <div className="container">
//           <h2 className="main-heading ">
//             About EDU'COM
//           </h2>
//           <p className="text-center">
//             EDUCOM est le plateforme idéal de communication en ligne créer par Ahmed Zwawi et Moutiaa Dimassi en 2021.
//           </p>
//           <div className="about_img-box ">
//             <img src="assets/images/photo1.png" alt className="img-fluid w-100" />
//           </div>
//           <div className="d-flex justify-content-center mt-5">
//             <a href className="call_to-btn  ">
//               <span>
//                 Read More
//               </span>
//               <img src="assets/images/right-arrow.png" alt />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//     {/* about */}
//     {/* Team  */}
//     <section className="teacher_section layout_padding-bottom">
//       <div id="team" className="team">
//         <div className="container">
//           <h2 className="main-heading ">
//             Team
//           </h2>
//           <p className="text-center">
//             Created and Desined
//           </p>
//           <div className="teacher_container layout_padding2">
//             <div className="card-deck">
//               <div className="card">
//                 <img className="card-img-top" src="assets/images/mouti3.png" alt="Card image cap" />
//                 <div className="card-body">
//                   <h5 className="card-title">Moutia Dimassi</h5>
//                 </div>
//               </div>
//               <div className="card">
//                 <img className="card-img-top" src="assets/images/Ahmeddd.jpg" alt="Card image cap" />
//                 <div className="card-body">
//                   <h5 className="card-title">Ahmed Zwawi</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="d-flex justify-content-center mt-3">
//         <a href className="call_to-btn  ">
//           <span>
//             See More
//           </span>
//           <img src="assets/images/right-arrow.png" alt />
//         </a>
//       </div>
//     </section></div>
//   {/* Team */}
//   {/* Our Service */}
//   <section className="vehicle_section layout_padding">
//     <div className="container">
//       <h2 className="main-heading ">
//         Our Service
//       </h2>
//       <p className="text-center">
//         {/*hnee ekteb l service li yadmou l site*/}
//         Nous offrons pour les établissement scolaires une espace bien organisé pour le partage des cours et activités tout en sécurité 

//       </p>
//       <div className="layout_padding-top">
//         <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
//           <div className="carousel-inner">
//             <div className="carousel-item active">
//               <div className="vehicle_img-box ">
//                 <img src="assets/images/photo4.png" alt className="img-fluid w-100" />
//               </div>
//             </div>
//             <div className="carousel-item">
//               <div className="vehicle_img-box ">
//                 <img src="assets/images/photo3.png" alt className="img-fluid w-100" />
//               </div>
//             </div>
//           </div>
//           <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true" />
//             <span className="sr-only">Previous</span>
//           </a>
//           <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true" />
//             <span className="sr-only">Next</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* Our Service */}
//   {/* Our Students Feedback */}
//   <section className="client_section layout_padding">
//     <div className="container">
//       <h2 className="main-heading ">
//         Our Students Feedback
//       </h2>
//       <p className="text-center">

//       </p>
//       <div className="layout_padding2">
//         <div className="client_container d-flex flex-column">
//           <div className="client_detail d-flex align-items-center">
//             <div className="client_img-box ">
//               <img src="assets/images/dodo.jpg" alt />
//             </div>
//             <div className="client_detail-box">
//               <h4>
//                 Raed Sghaier
//               </h4>
//               <span>
//                 Etudiant
//               </span>
//             </div>
//           </div>
//           <div className="client_text mt-4">
//             <p>
//               magnifique ! Bravo.
//               {/*tnajem tzid ara2*/}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* Our Students Feedback */}
//   {/* contact section */}
//   <section className="contact_section layout_padding-bottom">
//     <div className="container">
//       <h2 className="main-heading">
//         Contact Now
//       </h2>
//       <p className="text-center">
//         {/**/}
//       </p>
//       <div className>
//         <div className="contact_section-container">
//           <div id="contact" className="contact">
//             <div className="row">
//               <div className="col-md-6 mx-auto">
//                 <div className="contact-form">
//                   <form action>
//                     <div>
//                       <input type="text" placeholder="Name" />
//                     </div>
//                     <div>
//                       <input type="text" placeholder="Phone Number" />
//                     </div>
//                     <div>
//                       <input type="email" placeholder="Email" />
//                     </div>
//                     <div>
//                       <input type="text" placeholder="Message" className="input_message" />
//                     </div>
//                     <div className="d-flex justify-content-center">
//                       <button type="submit" className="btn_on-hover">
//                         Send
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* landing section */}
//   <section className="landing_section layout_padding">
//     <div className="container">
//     </div>
//   </section>
//   {/* end landing section */}
//   {/* footer section */}
//   <section className="container-fluid footer_section">
//     <p>
//       Copyright © All rights reserved | Created and Desined
//     </p>
//   </section>
// </div>

//     )


// }


// }

// export default Acceuill