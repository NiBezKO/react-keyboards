import React from 'react'
import Card from '../components/card/Card'

const Favorites = ({keyboards, onAddToFavorite, onAddToCart}) => {
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
            onFavorite = {onAddToFavorite}
            favorited={true}
            />
          )}
         
        </ul>
    </div>
  )
}

export default Favorites
