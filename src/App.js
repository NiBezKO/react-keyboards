import React, { useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Header from "./components/Header";
import './index.scss';


//https://637fa1022f8f56e28e925aec.mockapi.io/cartk

function App() {

  const [keyboards, setKeyboards] = React.useState([]);

  const [openCart, setOpenCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [favorites, setFavorites] = React.useState([]);
 
  

  useEffect(() => {
    axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/keyboards")
    .then((res) => {setKeyboards(res.data)
    });
    axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/cartk")
    .then((res) => {setCartItems(res.data)
    });
    axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/favorites").then((res) =>{ 
      setFavorites(res.data)
  });
  }, [])
  
  const onAddToCart = (obj) => {

    if ( cartItems.find((item) => item.id !== obj.id)) {
      setCartItems((prev )=> prev.filter(item => item.id == obj.id ))
    } else {
      axios.post("https://637fa1022f8f56e28e925aec.mockapi.io/cartk", obj);
      setCartItems((prev) => [...prev, obj])
    }

  }
  
  const onAddToFavorite = (obj) =>  {
   try {
    if (favorites.find((favObj) => favObj.id == obj.id )) {
      axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/favorites/${obj.id}`);
      setFavorites(prev => prev.filter((item ) => item.id !== obj.id))
    } else {
      axios.post('https://637fa1022f8f56e28e925aec.mockapi.io/favorites', obj)
      .then(res => setFavorites(prev => [...prev, res.data])) 
    }
    
   } catch (error) {
     alert("Неудалось добавить в закладки")
   }
    
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

     <Routes>
        <Route path="/" exact element={<Home 
            keyboards={keyboards}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchValueInput={searchValueInput}
            onAddToCart={onAddToCart}
          />}>
          </Route>
          <Route path="/favorite" exact element={<Favorites keyboards={favorites} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

