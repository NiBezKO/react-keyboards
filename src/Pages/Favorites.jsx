import React from 'react';
import Card from '../components/card';
import AppContext from '../context';

const Favorites = ({ onAddToFavorite}) => {

  const  {favorites} = React.useContext(AppContext);

  return (
    <div>
      <div className='block'>
        <h2>Избранное</h2>
      </div>
        <ul className='cards'>
          { favorites.map((item) =>
            <Card
            key={item.id}
            title={item.title}
            price={item.price}
            imageURL={item.imageURL}
            
            onFavorite={onAddToFavorite}
            favorited={true}
            />
          )}
         
        </ul>
    </div>
  )
}

export default Favorites
