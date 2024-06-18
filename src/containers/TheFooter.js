import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a>T3ALLEM MAANA</a>
        
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Alimenté par</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">AMINE SAYAH</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
