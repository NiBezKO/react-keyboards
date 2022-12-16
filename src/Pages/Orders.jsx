import React from 'react'
import Card from '../components/card'
import AppContext from '../context';
import axios from 'axios';

const Orders = () => {

    const {onAddToCart, onAddToFavorite, } = React.useContext(AppContext)

    const [orders, setOrders] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true)
  
  //другой способ взаимодействия с серваком
  React.useEffect( () => {
  ( async () =>  {
    try {
        const {data} = await axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
    } catch (error) {
        alert("Не удалось загрузить заказы")
        console.error(error)
    }
  })()

  }, [])

  return (
    <div>
      <div className='block'>
        <h2>Мои заказы</h2>
      </div>
        <ul className='cards'>
          { orders.map((item) =>
            <Card
            key={item.id}
            title={item.title}
            price={item.price}
            imageURL={item.imageURL}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus = {(obj) => onAddToCart(obj)}
            loading={isLoading}
            />
          )}
         
        </ul>
    </div>
  )
}

export default Orders
