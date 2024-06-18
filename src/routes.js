
import React from 'react';
import NVTest from './views/Test/NVTest';
const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const DashboardEleve = React.lazy(() => import('./views/DashboardEleve/DashboardEleve'));
const DashboardEnseignant = React.lazy(() => import('./views/DashboardEnseignant/DashboardEnseignant'));

const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const NGroupe = React.lazy(() => import('./views/MesGroupes/NouveauGroupe'));
 const TGroupes = React.lazy(() => import('./views/MesGroupes/TGroupes'));
const TMatieres = React.lazy(() => import('./views/MesMatieres/TMatieres'));
 const AjoutGroupe = React.lazy(() => import('./views/AjoutGroupe/AjoutGroupe'));
 const TEtudiants = React.lazy(() => import('./views/MesEtudiants/TEtudiants'));

 const TEtudiantall = React.lazy(() => import('./views/MesEtudiantall/TEtudiantall'));
 
 const AjoutEnseignant = React.lazy(() => import('./views/AjoutEnseignant/AjoutEnseignant'));
 const AjoutMatiere = React.lazy(() => import('./views/AjoutMatiere/AjoutMatiere'));
const AjoutEtudiant = React.lazy(() => import('./views/AjoutEtudiant/AjoutEtudiant'));
 const MesEnseignants = React.lazy(() => import('./views/MesEnseignants/MesEnseignants'));

 const matiere = React.lazy(() => import('./views/matiere'));
 const ressources = React.lazy(() => import('./views/matiere/ressources'));
 const activites = React.lazy(() => import('./views/matiere/activites'));
 const reunions = React.lazy(() => import('./views/matiere/reunions'));
 const Test = React.lazy(() => import('./views/matiere/Test'));
 const ListeRepActivites = React.lazy(() => import('./views/matiere/ListeRepActivites'));
 const AjoutActivite = React.lazy(() => import('./views/matiere/AjoutActivite'));
 const ressourcesupdate = React.lazy(() => import('./views/matiere/ressourcesupdate'));
 const UpdateActivite = React.lazy(() => import('./views/matiere/UpdateActivite'));
 const detailsReunion = React.lazy(() => import('./views/matiere/detailsReunion'));
 
 const matiereEtudiants = React.lazy(() => import('./views/matiereEtudiants'));
 const ressourcesEtudiants = React.lazy(() => import('./views/matiereEtudiants/ressourcesEtudiants'));
 const ActivitéEtudiants = React.lazy(() => import('./views/matiereEtudiants/ActivitéEtudiants'))
 const TestEtudiants = React.lazy(() => import('./views/matiereEtudiants/TestEtudiants'));
 const AjoutActiviteEtd = React.lazy(() => import('./views/AjoutActiviteEtd/AjoutActiviteEtd'));


 const MesMatieresEnseignant= React.lazy(() => import('./views/MesMatieresEnseignant/TMesMatieresEnseignant'));
 const MesGroupesEnseignant = React.lazy(() => import('./views/MesGroupesEnseignant/TMesGroupesEnseignant'));
 const MesEtudiantsEnseignant = React.lazy(() => import('./views/MesEtudiantsEnseignant/TMesEtudiantsEnseignant'));
 const MesMatieresEtudiant = React.lazy(() => import('./views/MesMatieresEtudiant/TMesMatieresEtudiant'));
 const MesEtudiantsEtd = React.lazy(() => import('./views/MesEtudiantsEtd/TMesEtudiantsEtd'));
 const MesEnseignantsEtudEns = React.lazy(() => import('./views/MesEnseignantsEtudEns/TMesEnseignantsEtudEns'));
 const MesEnseignantsOutAff = React.lazy(() => import('./views/MesEnseignantsOutAff/MesEnseignantsOutAff'));

//  const ListeRepActivites = React.lazy(() => import('./views/ListeRepActivites/ListeRepActivites'));




const routes = [
  { path: '/', exact: true, name: 'Accueil' },
   { path: '/dashboard', name: 'Espace Administrateur', component: Dashboard },
   { path: '/dashboardEleve', name: 'Espace Eleve', component: DashboardEleve},
   { path: '/DashEns', name: 'Espace Enseignant', component: DashboardEnseignant},
   { path: '/DashboardEnseignant', name: 'Espace Enseignant', component: DashboardEnseignant},




 { path: '/theme', name: 'Theme', component: Colors, exact: true },
 { path: '/theme/colors', name: 'Colors', component: Colors },
   { path: '/theme/typography', name: 'Typography', component: Typography },
   { path: '/base', name: 'Base', component: Cards, exact: true },
   { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
   { path: '/base/cards', name: 'Cards', component: Cards },
   { path: '/base/carousels', name: 'Carousel', component: Carousels },
   { path: '/base/collapses', name: 'Collapse', component: Collapses },
   { path: '/base/forms', name: 'Forms', component: BasicForms },
   { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
   { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
   { path: '/base/navbars', name: 'Navbars', component: Navbars },
   { path: '/base/navs', name: 'Navs', component: Navs },
   { path: '/base/paginations', name: 'Paginations', component: Paginations },
   { path: '/base/popovers', name: 'Popovers', component: Popovers },
   { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
   { path: '/base/switches', name: 'Switches', component: Switches },
   { path: '/base/tables', name: 'Tables', component: Tables },
   { path: '/base/tabs', name: 'Tabs', component: Tabs },
   { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
   { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
   { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
   { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
   { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
   { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
{ path: '/charts', name: 'Charts', component: Charts },
   { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
   { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
   { path: '/icons/flags', name: 'Flags', component: Flags },
   { path: '/icons/brands', name: 'Brands', component: Brands },
   { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
   { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
   { path: '/notifications/badges', name: 'Badges', component: Badges },
   { path: '/notifications/modals', name: 'Modals', component: Modals },
   { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
   { path: '/widgets', name: 'Calendrier', component: Widgets },
   { path: '/users', exact: true,  name: 'Users', component: Users },
   { path: '/users/:id', exact: true, name: 'User Details', component: User },
   { path: '/MesGroupes', name: 'Groupes', component: TGroupes, exact: true },
   { path: '/MesGroupes/TGroupes', name: 'Tous les Groupes', component: TGroupes },
  { path: '/MesGroupes', name: 'Groupes', component: NGroupe, exact: true },
 { path: '/MesGroupes/NGroupe', name: 'Nouveau Groupe', component: NGroupe },

  { path: '/MesMatieres', name: 'MesMatieres', component: TMatieres, exact: true },
  { path: '/MesMatieres/TMatieres', name: 'TMatieress', component: TMatieres },

  { path: '/AjoutGroupe', name: 'AjoutGroupe', component: AjoutGroupe, exact: true },
  { path: '/AjoutGroupe/AjoutGroupe', name: 'AjoutGroupe', component: AjoutGroupe },


{ path: '/MesEtudiants', name: 'Mes élèves par groupe', component: TEtudiants, exact: true },
  { path: '/MesEtudiants/TEtudiants',  component: TEtudiants },

  { path: '/MesEtudiantall', name: 'MesElèves', component: TEtudiantall, exact: true },
  { path: '/MesEtudiantall/TEtudiantall',  component: TEtudiantall },
  
  
{ path: '/AjoutEnseignant', name: 'Ajout Enseignant', component: AjoutEnseignant, exact: true },
{ path: '/AjoutEnseignant/AjoutEnseignant', name: 'Ajout Enseignant', component: AjoutEnseignant },

{ path: '/AjoutMatiere', name: 'AjoutMatiere', component: AjoutMatiere, exact: true },
{ path: '/AjoutMatiere/AjoutMatiere', name: 'AjoutMatiere', component: AjoutMatiere },

{ path: '/AjoutEtudiant', name: 'Ajout Etudiant', component: AjoutEtudiant, exact: true },
{ path: '/AjoutEtudiant/AjoutEtudiant', name: 'Ajout Etudiant', component: AjoutEtudiant },

{ path: '/MesEnseignants', name: 'Mes Enseignants', component: MesEnseignants, exact: true },
{ path: '/MesEnseignants/MesEnseignants', name: 'Mes Enseignants', component: MesEnseignants },

{ path: '/matiere', exact: true, name: 'matiere', component: matiere },
{ path: '/matiere/ressources', exact: true, name: 'ressources', component: ressources },
{ path: '/matiere/activites', exact: true, name: 'activites', component: activites },
{ path: '/matiere/reunions', exact: true, name: 'reunion', component: reunions },
{ path: '/matiere/detailsReunion', exact: true, name: 'detailsReunion', component: detailsReunion },
{ path: '/matiere/Test', exact: true, name: 'Test', component: Test },
{ path: '/matiere/ListeRepActivites', exact: true, name: 'ListeRepActivites', component: ListeRepActivites },
{ path: '/matiere/AjoutActivite', exact: true, name: 'AjoutActivite', component: AjoutActivite },
{ path: '/matiere/ressourcesupdate', exact: true, name: 'ressourcesupdate', component: ressourcesupdate },
{ path: '/matiere/UpdateActivite', exact: true, name: 'UpdateActivite', component: UpdateActivite },



{ path: '/matiereEtudiants', exact: true, name: 'matiereEleve', component: matiereEtudiants },
{ path: '/matiereEtudiants/ressourcesEtudiants', exact: true, name: 'ressources', component: ressourcesEtudiants },
{ path: '/matiereEtudiants/ActivitéEtudiants', exact: true, name: 'Activité', component: ActivitéEtudiants },
{ path: '/matiereEtudiants/TestEtudiants', exact: true, name: 'Test', component: TestEtudiants },

// { path: '/AjoutActivite', name: 'Ajout Activite', component: AjoutActivite, exact: true },
// { path: '/AjoutActivite/AjoutActivite', name: 'Ajout Activite', component: AjoutActivite },



{ path: '/MesMatieresEnseignant', name: 'MesMatieresEnseignant', component: MesMatieresEnseignant, exact: true },
{ path: '/MesMatieresEnseignant/TMesMatieresEnseignant', name: 'MesMatieresEnseignant', component: MesMatieresEnseignant },
{ path: '/MesGroupesEnseignant', name: 'MesGroupesEnseignant', component: MesGroupesEnseignant, exact: true },
{ path: '/MesGroupesEnseignant/TMesGroupesEnseignant', name: 'MesGroupesEnseignant', component: MesGroupesEnseignant },
{ path: '/MesEtudiantsEnseignant', name: 'MesEleves', component: MesEtudiantsEnseignant, exact: true },
{ path: '/MesEtudiantsEnseignant/TMesEtudiantsEnseignant', name: 'MesEleves', component: MesEtudiantsEnseignant },
{ path: '/NouveauTest', name: 'NouveauTest', component: NVTest },

{ path: '/MesMatieresEtudiant', name: 'MesMatieresEleve', component: MesMatieresEtudiant, exact: true },
{ path: '/MesMatieresEtudiant/TMesMatieresEtudiant', name: 'MesMatieresEleve', component: MesMatieresEtudiant },
{ path: '/MesEtudiantsEtd', name: 'MesEleveEl', component: MesEtudiantsEtd, exact: true },
{ path: '/MesEtudiantsEtd/TMesEtudiantsEtd', name: 'MesEleveEl', component: MesEtudiantsEtd },
{ path: '/MesEnseignantsEtudEns', name: 'MesEnseignantsEtudEns', component: MesEnseignantsEtudEns, exact: true },
{ path: '/MesEnseignantsEtudEns/TMesEnseignantsEtudEns', name: 'MesEnseignantsEtudEns', component: MesEnseignantsEtudEns },
{ path: '/MesEnseignantsOutAff', name: 'MesEnseignants', component: MesEnseignantsOutAff, exact: true },
{ path: '/MesEnseignantsOutAff/MesEnseignantsOutAff', component: MesEnseignantsOutAff },
{ path: '/AjoutActiviteEtd', name: 'AjoutActiviteEtd', component: AjoutActiviteEtd, exact: true },
{ path: '/AjoutActiviteEtd/AjoutActiviteEtd', name: 'AjoutActiviteEtd', component: AjoutActiviteEtd },
// { path: '/ListeRepActivites', name: 'ListeRepActivites', component: ListeRepActivites, exact: true },
// { path: '/ListeRepActivites/ListeRepActivites', name: 'ListeRepActivites', component: ListeRepActivites },


];
 
export default routes;
