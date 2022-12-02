import React from 'react'

const Drawer = ({onClose, onRemove, keyboards=[], }) => {
  return (
    <div  className='overlay'>
        <div className='drawer'>
          <div className='drawer__top'>
              <h2>Корзина</h2>
              <img className='closeBtn' onClick={onClose} src='/img/remove-btn.svg' alt="close"/>
           </div>


           {keyboards.length > 0 ? (
            <div>
                <div className='items'>
                  {keyboards.map((obj) => (
                      <div className='cartItems'>
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
                      <b>5600 руб.</b>
                    </li>
                  </ul>
                <button className='btnPay'>Оплатить</button>
                </div>
               
          </div>) 
          :
          <h3 className='cartEmpty'>Корзина пуста</h3>
           }
           
        </div>
      </div>
  )
}

export default Drawer


