import React from 'react'
import Card from '../components/card/Card'

const Favorites = ({keyboards, onAddTofavorite, onAddToCart}) => {
  return (
    <div>
      <div className='block'>
        <h2>Избранное</h2>
      </div>
        <ul className='cards'>
          { keyboards.map((item) =>
            <Card
            key={item.id}
            title={item.title}
            price={item.price}
            imageURL={item.imageURL}
            onPlus={onAddToCart}
            onFavorite = {onAddTofavorite}
            />
          )}
         
        </ul>
    </div>
  )
}

export default Favorites
