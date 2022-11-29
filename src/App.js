import React, { useEffect } from "react";
import Drawer from "./components/Drawer";
import Card from "./components/card/Card";
import Header from "./components/Header";
import './index.scss';



function App() {

  const [keyboards, setKeyboards] = React.useState([]);

  const [openCart, setOpenCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([ ])
 
  

  useEffect(() => {
    fetch("https://637fa1022f8f56e28e925aec.mockapi.io/keyboards")
    .then((res) => {return res.json()})
    .then(json => {setKeyboards(json)})
  }, [])
  
  const onAddToCart = (obj) => {
    setCartItems([...cartItems, obj]);
  }

  return (
    <div className="wrapper">
      {openCart && <Drawer keyboards={cartItems} onClose={() => setOpenCart(false)} />}

      <Header onClickCart={() => setOpenCart(true)}  />
      <div className="intro">
         <h1>Прикоснись к прекрасному кончиками пальцев</h1>
         <h2>Клавиатуры от самых лучших производителей</h2>
      </div>

     
      <div className='block'>
        <h2> Клавиатуры</h2>
        <div className='search__block'>
          <button className='search'>Найти</button>
          <input placeholder='Искать....'/>
        </div>
      </div>
        <ul className='cards'>
          { keyboards.map((item) =>
            <Card
            title={item.title}
            price={item.price}
            imageURL={item.imageURL}
            onPlus={(obj) => onAddToCart(obj)}
            clicKHeart={ () => console.log("Нажали на добавить в избранное")}
            />
          )}
         
        </ul>

      
    </div>
  );
}

export default App;
