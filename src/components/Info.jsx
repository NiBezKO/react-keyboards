import React from 'react';
import AppContext from '../context';

const Info = ({title, description}) => {

    const {setOpenCart} = React.useContext(AppContext)

  return (
    <div className='cartEmpty'>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setOpenCart(false)} className='btnEmpty'>Вернуться назад</button>
  </div>
  )
}

export default Info
