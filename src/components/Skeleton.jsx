import React from 'react'
import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={320}
    height={416}
    viewBox="0 0 320 416"
    backgroundColor="#b0b0b0"
    foregroundColor="#ffffff"
    
  >
    <rect x="28" y="56" rx="0" ry="0" width="302" height="194" /> 
    <rect x="28" y="279" rx="0" ry="0" width="303" height="23" /> 
    <rect x="28" y="322" rx="0" ry="0" width="305" height="20" /> 
    <rect x="28" y="358" rx="0" ry="0" width="39" height="36" /> 
    <rect x="295" y="375" rx="0" ry="0" width="15" height="9" />
  </ContentLoader>
  )
}

export default Skeleton
