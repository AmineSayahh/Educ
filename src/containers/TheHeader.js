import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CNavbarNav,
  CForm,
  CInput,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownNotif,
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.nav.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand> */}

      <CHeaderNav className="d-md-down-none mr-auto">
        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Acceuil</CHeaderNavLink>
        </CHeaderNavItem> */}
        {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem> */}
             <CNavbarNav className="ml-auto">
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="Recherche.."
                    size="sm"
                  />
                  <CButton color="light" className="my-2 my-sm-0" type="submit">Recherche</CButton>
                </CForm>
               </CNavbarNav>
    
      </CHeaderNav>
 

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            {/* <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink> */}
            {/* <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink> */}
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="#" alt="Settings" />&nbsp;BIENVENUE A T3ALLEM MAANA
            </CLink>
           
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
