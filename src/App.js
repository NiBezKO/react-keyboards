import React, { useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Header from "./components/Header";
import AppContext from './context';
import './index.scss';


//https://637fa1022f8f56e28e925aec.mockapi.io/cartk

function App() {

  const [keyboards, setKeyboards] = React.useState([]);

  const [openCart, setOpenCart] = React.useState(false);

  const [cartItems, setCartItems] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [favorites, setFavorites] = React.useState([]);
 
  const [isLoading, setLoading] = React.useState(true);
  

  useEffect(() => {
     async function fetchData() {
      setLoading(true)
      const cartResponse = await axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/favorites");
      const keyboardsResponse = await axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/keyboards");
      setLoading(false)

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setKeyboards(keyboardsResponse.data);
      console.log(favoritesResponse.data)
     }
     
     fetchData();
  }, [])
  
  const onAddToCart = (obj) => {
    console.log(obj);

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://637fa1022f8f56e28e925aec.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  
  {/*const onAddToFavorite = (obj) => {
    axios.post("https://637fa1022f8f56e28e925aec.mockapi.io/favorites");
    setFavorites((prev) => [...prev.obj])
  }*/}
  
 const onAddToFavorite = async (obj) => {
   try {
    if (favorites.find((favObj) => Number(favObj.id) !== Number(obj.id))) {
      axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
     } else {
      const {data} = await axios.post("https://637fa1022f8f56e28e925aec.mockapi.io/favorites", obj)
      setFavorites((prev) => [...prev, data ]);
     }
   } catch (error) {
    alert("Не удалось добавить в избранное")
   }
 }
  const onRemoveKeyboards = (id) => {
    axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const searchValueInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <AppContext.Provider value={{keyboards, cartItems, favorites, onAddToFavorite }}>
    <div className="wrapper">
      {openCart && <Drawer keyboards={cartItems} onRemove={onRemoveKeyboards} onClose={() => setOpenCart(false)} />}

      <Header onClickCart={() => setOpenCart(true)}  />
      <div className="intro">
         <h1>Прикоснись к прекрасному кончиками пальцев</h1>
         <h2>Клавиатуры от самых лучших производителей</h2>
      </div>

     <Routes>
        <Route path="/" exact 
        element={<Home 
            keyboards={keyboards}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchValueInput={searchValueInput}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />}>
          </Route>
          <Route path="/favorites" exact 
              element={<Favorites />}>

          </Route>
      </Routes>
      
    </div>
    </AppContext.Provider>
  );
}

export default App;

