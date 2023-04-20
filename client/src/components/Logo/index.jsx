import React from 'react';
import CHCLogoImg from '../../assets/images/chc_gaming_logo.png';


export function Logo({ size = '28' }){
  return (
    <img src={CHCLogoImg} alt="Charicha Gaming Logo" width={size} height={size}/>
  );
}
