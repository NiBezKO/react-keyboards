import React, { useEffect } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Home from "./Pages/Home";
import Header from "./components/Header";
import './index.scss';

//https://637fa1022f8f56e28e925aec.mockapi.io/cartk

function App() {

  const [keyboards, setKeyboards] = React.useState([]);

  const [openCart, setOpenCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [toFavorite, setToFavorite] = React.useState([]);
 
  

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
    setCartItems((prev) => [...prev, obj])
  }
  
  const onAddToFavorite = (obj) => {
    axios.post("https://637fa1022f8f56e28e925aec.mockapi.io/cartk", obj);
    setToFavorite((prev) => [...prev, obj])
  }

  const onRemoveKeyboards = (id) => {
    axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cartk/${id}`);
    setCartItems((prev) => prev.filter((item)=> item.id !== id))
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

     
      <Home
        keyboards={keyboards}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchValueInput={searchValueInput}
        onAddToCart={onAddToCart}
      />

      
    </div>
  );
}

export default App;

