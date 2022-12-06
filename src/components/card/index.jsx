import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';


const Card = ({
  imageURL, 
  title, 
  id, 
  price, 
  onPlus, 
  favorited = false,
  
  loading=false
}) => {

  const [isAdded, setIsAdded] = React.useState(false);
   
  const onClickAdd = () => {
    onPlus({imageURL, title, price, id});
    setIsAdded(!isAdded);
  }

  const [isFavorite, setIsfavorite] = React.useState(favorited);

  const clickOnFavorite = () => {
    clickOnFavorite({imageURL, title, price, id})
    setIsfavorite(!isFavorite)
  }

 
  return (
    <div>
    {loading ? ( <ContentLoader 
    speed={2}
    width={320}
    height={416}
    viewBox="0 0 320 416"
    backgroundColor="#b0b0b0"
    foregroundColor="#ffffff"
    
  >
    <rect x="28" y="56" rx="0" ry="0" width="302" height="194" /> 
    <rect x="28" y="279" rx="0" ry="0" width="303" height="23" /> 
    <rect x="28" y="322" rx="0" ry="0" width="305" height="20" /> 
    <rect x="28" y="358" rx="0" ry="0" width="39" height="36" /> 
    <rect x="295" y="375" rx="0" ry="0" width="15" height="9" />
  </ContentLoader>
  ) : (
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
  )}
     
    </div>
  )
}

export default Card
