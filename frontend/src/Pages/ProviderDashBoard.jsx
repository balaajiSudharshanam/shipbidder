import React from 'react'
import MenuBar from '../Components/MenuBar/MenuBar'
import ProviderWidget from '../Components/ProviderWidget/ProviderWidget'

const ProviderDashBoard = () => {
  return (
    <div>
      <MenuBar />
      {/* <ProviderDashBoard/> */}
      <ProviderWidget sx={{mt:2}}/>
    </div>
  )
}

export default ProviderDashBoard
