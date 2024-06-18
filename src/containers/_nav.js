import React from 'react'
import CIcon from '@coreui/icons-react'

 export const nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Accueil',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Mes Groupes',
    route: '/MesGroupes',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tous les Groupes',
        to: '/MesGroupes/TGroupes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nouveau Groupe',
        to: '/MesGroupes/NGroupe',
      },
    ],
  },

    {
      _tag: 'CSidebarNavItem',
      name: 'Mes Eléves',
      to: '/MesEtudiantall/TEtudiantall',
      icon: 'cil-list',
      badge: {
        color: 'success'
      },},
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout Enseignant',
        to: '/AjoutEnseignant',
        icon: 'cil-user-follow',

      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout Matiere',
        to: '/AjoutMatiere',
        icon: 'cil-user-follow',

      },
]
export const navEns =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Accueil',
    to: '/DashboardEnseignant',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Mes Groupes',
    route: '/MesGroupesEnseignant',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tous les Groupes',
        to: '/MesGroupesEnseignant/TMesGroupesEnseignant',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Ajouter un test',
    to: '/NouveauTest',
    icon: <CIcon name="cil-task" customClasses="c-sidebar-nav-icon"/>,
  }
]
export const navEtd =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Accueil',
    to: '/DashboardEleve',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Mes Matieres',
    to: '/MesMatieresEtudiant/TMesMatieresEtudiant',
    icon: 'cil-pencil',
  },
  
  {
    _tag: 'CSidebarNavItem',
     name: 'Mes Enseignants',
     to: '/MesEnseignantsEtudEns/TMesEnseignantsEtudEns',
     icon: 'cil-cursor',

    },
      {
        _tag: 'CSidebarNavItem',
        name: 'Connexion',
        to: '/login',
        icon: 'cil-star',
        // _children: [
        //   {
        //     _tag: 'CSidebarNavItem',
        //     name: 'Login',
        //     to: '/login',
        //   },
         
        // ],
      },
  
]


