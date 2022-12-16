import React from 'react';
import AppContext from '../../context';
import styles from './Card.module.scss';


const Card = ({
  title,
  price, 
  imageURL, 
  id, 
  onFavorite, 
  onPlus, 
  favorited = false, 
  
}) => {
  
  const  {isItemAdded} = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, title, imageURL, price };

  const onClickAdd = () => {
    onPlus(obj);
    
  }

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };
 
  return (
      <>
        <li key={id}  className={styles.card}>
          <img className={styles.myFavorite}  onClick={onClickFavorite} width={25} height={25} src={ isFavorite ? "./img/my-favoriteTrue.png" : "./img/my-favorite.svg"} alt="favorite" />

          <img className={styles.imageURL} src={imageURL} alt='Клавиатура Razer'/>
              <h3>{title}</h3>
              <div className={styles.cardContent}>
                  <div>
                      <span>Цена: </span>
                      <b>{price}</b>
                  </div>
                    <img 
                    className={styles.btnAdd} 
                    onClick={onClickAdd} 
                    width={40} 
                    height={40} 
                    src={isItemAdded(id) ?  "./img/btn-checked.svg"  : "./img/plus.svg" } 
                    alt="добавить" 
                    />
              </div>
        </li>
      </>
  )
}

export default Card
