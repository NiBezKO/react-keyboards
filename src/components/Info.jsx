import React from 'react';
import AppContext from '../context';

const Info = ({title, description}) => {

    const {setOpenCart} = React.useContext(AppContext)

  return (
    <div className='cartEmpty'>
      <div className='cartDescroption'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button onClick={() => setOpenCart(false)} className='btnEmpty'>Вернуться назад</button>
  </div>
  )
}

export default Info
