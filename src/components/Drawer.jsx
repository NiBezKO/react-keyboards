import React from 'react'

const Drawer = (props) => {
  return (
    <div   className='overlay'>
        <div className='drawer'>
          <div className='drawer__top'>
              <h2>Корзина</h2>
              <img className='closeBtn' src='/img/remove-btn.svg' alt="close"/>
           </div>
           <div className='items'>
            <div className='cartItems'>
              <img style={ {marginRight:"20px"}} width={150} height={150} src='/img/3.jpg' alt='keyboards'/>
                <div>
                  <p>Клавиатура проводная Razer BlackWidow V3 TKL RZ03-03490700-R3R1 механическая Razer Green, клавиш - 87, USB, черная</p>
                  <b>5600 руб</b>
                </div>
                <img className='removeBtn' src='/img/remove-btn.svg' alt="delete"/>
            </div>
            <div className='cartItems'>
              <img style={ {marginRight:"20px"}} width={150} height={150} src='/img/3.jpg' alt='keyboards'/>
                <div>
                  <p>Клавиатура проводная Razer BlackWidow V3 TKL RZ03-03490700-R3R1 механическая Razer Green, клавиш - 87, USB, черная</p>
                  <b>5600 руб</b>
                </div>
                <img className='removeBtn' src='/img/remove-btn.svg' alt="delete"/>
            </div>
           </div>
           <ul className='cartTotalBlock'>
            <li>
              <span>Итого</span>
              <div></div>
              <b>5600 руб.</b>
            </li>
           </ul>
           <button className='btnPay'>Оплатить</button>
        </div>
      </div>
  )
}

export default Drawer
