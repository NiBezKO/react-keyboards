import React from 'react'
import styles from './Card.module.scss';


const Card = (props) => {
  return (
    <li className={styles.card}>
        <img src={props.imageURL} alt='Клавиатура Razer'/>
            <h3>{props.title}</h3>
            <div className={styles.cardContent}>
                <div>
                    <span>Цена: </span>
                    <b>{props.price}</b>
                </div>
                <button>В корзину</button>
            </div>
    </li>
  )
}

export default Card
