import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
// import React, { Suspense } from 'react'

// import {
//   Switch,
//   Route,
//   useRouteMatch,
//   useParams,
//   useHistory,
//   Redirect
// } from "react-router-dom";
// import { CContainer, CFade } from '@coreui/react'
// /*rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
// // const Tables = React.lazy(() => import('./views/base/tables/Tables'));

// import TheLayout from "../containers/TheLayout";
// import Tables from "../views/base/tables/Tables";
// // const MesMatieresEtudiant = React.lazy(() => import('./views/MesMatieresEtudiant/TMesMatieresEtudiant'));
// // const MesEtudiantsEtd = React.lazy(() => import('./views/MesEtudiantsEtd/TMesEtudiantsEtd'));
// // const MesEnseignantsEtudEns = React.lazy(() => import('./views/MesEnseignantsEtudEns/TMesEnseignantsEtudEns'));
// // const MesEnseignantsOutAff = React.lazy(() => import('./views/MesEnseignantsOutAff/MesEnseignantsOutAff'));
// // const AjoutActiviteEtd = React.lazy(() => import('./views/AjoutActiviteEtd/AjoutActiviteEtd'));
// /*rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
// import matiere from "../views/matiere";
// // const matiere = React.lazy(() => import('./views/matiere'));
// // const ressources = React.lazy(() => import('./views/matiere/ressources'));
// // const activites = React.lazy(() => import('./views/matiere/activites'));
// // const reunions = React.lazy(() => import('./views/matiere/reunions'));
// // const Test = React.lazy(() => import('./views/matiere/Test'));

// // const AjoutActivite = React.lazy(() => import('./views/AjoutActivite/AjoutActivite'));
// // const ListeRepActivites = React.lazy(() => import('./views/ListeRepActivites/ListeRepActivites'));

// // const MesMatieresEnseignant= React.lazy(() => import('./views/MesMatieresEnseignant/TMesMatieresEnseignant'));
// // const MesGroupesEnseignant = React.lazy(() => import('./views/MesGroupesEnseignant/TMesGroupesEnseignant'));
// // const MesEtudiantsEnseignant = React.lazy(() => import('./views/MesEtudiantsEnseignant/TMesEtudiantsEnseignant'));
// /*rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/

// // const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

// // const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// // const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// // const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// // const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// // const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

// // const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// // const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// // const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// // const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// // const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// // const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// // const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// // const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// // const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// // const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// // const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// // const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// // const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// // const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// // /*const Charts = React.lazy(() => import('./views/charts/Charts'));*/
// // // const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// // // const DashboardEnseignant = React.lazy(() => import('./views/DashboardEnseignant/DashboardEnseignant'));

// // const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
//  import Flags from "../views/icons/flags/Flags";
// // const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// // const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// // const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// // const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// // const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// // const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// // const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
// // const Users = React.lazy(() => import('./views/users/Users'));
// // const User = React.lazy(() => import('./views/users/User'));

// // const NGroupe = React.lazy(() => import('./views/MesGroupes/NouveauGroupe'));
// // const TGroupes = React.lazy(() => import('./views/MesGroupes/TGroupes'));
// // const TMatieres = React.lazy(() => import('./views/MesMatieres/TMatieres'));
// // const AjoutGroupe = React.lazy(() => import('./views/AjoutGroupe/AjoutGroupe'));
// // const TEtudiants = React.lazy(() => import('./views/MesEtudiants/TEtudiants'));
// // const AjoutEnseignant = React.lazy(() => import('./views/AjoutEnseignant/AjoutEnseignant'));
// // const AjoutEtudiant = React.lazy(() => import('./views/AjoutEtudiant/AjoutEtudiant'));
// // const MesEnseignants = React.lazy(() => import('./views/MesEnseignants/MesEnseignants'));

// /*rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
// // routes config
// // import routes from '../routes'
// function TheContent() {
//   let { path, url } = useRouteMatch();
//   console.log('pathhhhhhhhhhhhhhhh', path);
//   let role = localStorage.getItem('USER_ROLE')

//   return (
//     <div style={{ margin: "20px" }}>
//       <Switch>
//         <Route path={`${path}/:id`}>

//           <NestedRoute />
//         </Route>
//         {role === 'Administration' ? <Route path="/"> <TheLayout/></Route> : null}
//         {role === 'Etudiant' ? <Route path="/"> <Flags/></Route> : null}
//         {role === 'Enseignant' ? <Route path="/"> <TheContent/></Route> : null}

//       </Switch>
//     </div>
//   );
// }
// export default TheContent;

// function NestedRoute() {
//   let route = useParams();
//   const history = useHistory();
//   const USER_ROLE = localStorage.getItem("USER_ROLE");
//   console.log('route id ', route.id);
//   if (USER_ROLE === "Administration") {
//     console.log('ttttttttttttttttttttt', route.id);
//     switch (route.id) {
//       //your AdDMIN routes here
//       case "Flags":
//         return <Flags />;

//       // case "annonces":
//       //   return <Annonce />;

//       //   case "annoncepreview":
//       //   return <AnnoncePreview />;


//       // case "offre":
//       //   return <Offre />;

//       // case "reclamation":
//       //   return <Reclamation />;

//       // case "Etudiant":
//       //   return <Etudiant />;

//       // case "commande":
//       //   return <CommandeAdmin />;

//       // case "article":
//       //   return <Article />;

//       // case "billet":
//       //   return <Billet />;

//       // case "event":
//       //    return <Event />

//       //    case "abonnement":
//       //     return <Abonnement />      

//     }

//   }
//   else if (USER_ROLE === "Enseignant") {
//     switch (route.id) {

//       //your Enseignant routes here

//       case "matiere":
//         return <matiere />;

//       // default:
//       //   return <EnseignantWelcome />;
//     }
//   }
//   else if (USER_ROLE === "Etudiant") {
//     switch (route.id) {

//       //your Etudiant routes here

//       case "Tables":
//         return <Tables />;

//       // case "offre":
//       //   return <Offre />;

//       // case "billet":
//       //   return <Billet />;

//       // default:
//       //   return <EtudiantWelcome />;
//     }
//   }

//   else {
//     console.log("errrrrrorrr");
//   }
// }
// // const loading = (
// //   <div className="pt-3 text-center">
// //     <div className="sk-spinner sk-spinner-pulse"></div>
// //   </div>
// // )

// // const TheContent = () => {
// //   return (
// //     <main className="c-main">
// //       <CContainer fluid>
// //         <Suspense fallback={loading}>
// //           <Switch>
// //             {routes.map((route, idx) => {
// //               return route.component && (
// //                 <Route
// //                   key={idx}
// //                   path={route.path}
// //                   exact={route.exact}
// //                   name={route.name}
// //                   render={props => (
// //                     <CFade>
// //                       <route.component {...props} />
// //                     </CFade>
// //                   )} />
// //               )
// //             })}
// //             <Redirect from="/" to="/dashboard" />
// //           </Switch>
// //         </Suspense>
// //       </CContainer>
// //     </main>
// //   )
// // }

// // export default React.memo(TheContent)
