import React from 'react';
import Info from './Info';
import axios from "axios";
import {useCart} from "../hooks/useCart";


const  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const Drawer = ({onClose, onRemove, keyboards=[],}) => {

  const {cartItems, setCartItems, totalPrice} = useCart()

  const [isOrderComplete, setIsOrderComplete] = React.useState(false)

  const [orderId, setOrderId] = React.useState(null)

  const [isLoading, setLoading] = React.useState(true);

  

  
  
  const onClickOrder = async () => {
    try {
      setLoading(true)
      const {data} = await  axios.post('https://637fa1022f8f56e28e925aec.mockapi.io/orders', {
        items: cartItems
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      
      for (let i = 0; i < cartItems.length; i++) {
           const item =  cartItems[i];
           await  axios.delete('https://637fa1022f8f56e28e925aec.mockapi.io/cart/' + item.id)
           await delay(1000);
      }
     
    } catch (error) {
      alert("Не удалось оформить заказ :(")
    }
    setLoading(false)
  }

  return (
    <div  className='overlay'>
        <div className='drawer'>
          <div className='drawer__top'>
              <h2>Корзина</h2>
              <img className='closeBtn' onClick={onClose} src='/img/remove-btn.svg' alt="close"/>
           </div>


           {keyboards.length > 0 ? (
            <div className='itemsContainer'>
                <div className='items'>
                  {keyboards.map((obj) => (
                      <div key={obj.id} className='cartItems'>
                        <img style={ {marginRight:"20px"}} width={150} height={150} src={obj.imageURL} alt='keyboards'/>
                          <div>
                            <p>{obj.title}</p>
                            <b>{obj.price}</b>
                          </div>
                          <img 
                          onClick={() => onRemove(obj.id)}
                          className='removeBtn'
                          src='/img/remove-btn.svg' 
                          alt="delete"/>
                      </div>)
                    )}
                </div>
                <div className='cartTotalBlock'>
                  <ul >
                    <li>
                      <span>Итого</span>
                      <div></div>
                      <b>{totalPrice} руб.</b>
                    </li>
                  </ul>
                <button onClick={onClickOrder} className='btnPay'>Оплатить</button>
                </div>
               
          </div>) 
          :
          (<Info
          title={isOrderComplete ? "Заказ оформлен" :"Корзина пустая"}
          description={isOrderComplete ? `Ожидайте СМС оповещения, для того что бы забрать заказ #${orderId}` : "Добавьте сюда товар для оформления заказа"}
          />)
           }
           
        </div>
      </div>
  )
}

export default Drawer


