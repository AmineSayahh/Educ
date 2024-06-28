import React from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';

const TheHeaderDropdown = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/10..jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Compte</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Mes Messages
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          DECONNEXION
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default TheHeaderDropdown;
