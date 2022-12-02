import React, { useEffect } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Card from "./components/card/Card";
import Header from "./components/Header";
import './index.scss';

//https://637fa1022f8f56e28e925aec.mockapi.io/cartk

function App() {

  const [keyboards, setKeyboards] = React.useState([]);

  const [openCart, setOpenCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");
 
  

  useEffect(() => {
    axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/keyboards")
    .then((res) => {setKeyboards(res.data)
    });
    axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/cartk")
    .then((res) => {setCartItems(res.data)
    });
  }, [])
  
  const onAddToCart = (obj) => {
    axios.post("https://637fa1022f8f56e28e925aec.mockapi.io/cartk", obj);
    setCartItems(prev => [...prev, obj])
  }
  
  const onRemoveKeyboards = (id) => {
    axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cartk${id}`);
    setCartItems(prev => prev.filter((keyboards )=> keyboards.id !== id))
  }

  const searchValueInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper">
      {openCart && <Drawer keyboards={cartItems} onRemove={onRemoveKeyboards} onClose={() => setOpenCart(false)} />}

      <Header onClickCart={() => setOpenCart(true)}  />
      <div className="intro">
         <h1>Прикоснись к прекрасному кончиками пальцев</h1>
         <h2>Клавиатуры от самых лучших производителей</h2>
      </div>

     
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
          { keyboards.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) =>
            <Card
            key={item.id}
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

