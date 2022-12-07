import React from 'react';
import Card from '../components/card';
import Skeleton from '../components/Skeleton';


const Home = ({
    keyboards,
    searchValue,
    setSearchValue,
    searchValueInput,
    onAddToFavorite, 
    onAddToCart,
    isLoading,
    }) => {
  return (
    <div>
      <div className='block'>
        <h2> Клавиатуры</h2>
        <p>{searchValue ? `Поиск по запросу:"${searchValue}"` : null}</p>
        <div className='search__block'>
          <button className='search'>Найти</button>
          { searchValue ? <img className='clear' onClick={() => setSearchValue("")} src='/img/remove-btn.svg' alt="Стереть"/> : null}
          <input 
            value={searchValue} 
            onChange={searchValueInput} 
            placeholder='Искать....'/>
        </div>
      </div>
        <ul className='cards'>
              {isLoading ? (
              <div className="skeleton-list">
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </div>
              ) : ( 
            <>
              { keyboards.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item) =>
                <Card
                key={item.id}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite = {(obj) => onAddToFavorite(obj)}
                />
              )}
            </>
            ) }
         </ul>
    </div>
  )
}

export default Home
