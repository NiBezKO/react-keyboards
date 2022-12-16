import React from 'react';
import Card from '../components/card';
import AppContext from '../context';

const Favorites = () => {

  const  {favorites, onAddToFavorite} = React.useContext(AppContext);
  console.log(favorites)
  return (
    <div>
      <div className='block'>
        <h2>Избранное</h2>
      </div>
        <ul className='cards'>
          { favorites.map((item) =>
            <Card
            key={item.id}
            onFavorite={onAddToFavorite}
            favorited={true}
            {...item}
            />
          )}
         
        </ul>
    </div>
  )
}

export default Favorites
