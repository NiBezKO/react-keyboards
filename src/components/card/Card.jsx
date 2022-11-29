import React from 'react'
import styles from './Card.module.scss';


const Card = ({imageURL, title, price, onPlus, }) => {

  const [isAdded, setIsAdded] = React.useState(false);
   
  const onClickAdd = () => {
    onPlus({imageURL, title, price});
    setIsAdded(!isAdded);
  }

  const [isFavorite, setIsfavorite] = React.useState(false);

  const clickOnFavorite = () => {
    setIsfavorite(!isFavorite)
  }

 
  return (
    <li className={styles.card}>
        <img className={styles.myFavorite}  onClick={clickOnFavorite} width={25} height={25} src={ isFavorite ? "./img/my-favoriteTrue.png" : "./img/my-favorite.svg"} alt="favorite" />

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
                  src={isAdded ?  "./img/btn-checked.svg"  : "./img/plus.svg" } 
                  alt="добавить" 
                  />
            </div>
    </li>
  )
}

export default Card
