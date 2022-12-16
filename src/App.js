import React, { useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Header from "./components/Header";
import AppContext from './context';
import Orders from "./Pages/Orders";
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
     try {
      setLoading(true)
      const [cartResponse, 
        favoritesResponse, 
        keyboardsResponse] = await Promise.all([
        axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/cart"),
        axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/favorites"),
        axios.get("https://637fa1022f8f56e28e925aec.mockapi.io/keyboards"),
      ])
      setLoading(false)

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setKeyboards(keyboardsResponse.data);
      console.log(favoritesResponse.data)
      console.log(keyboardsResponse.data)
     } catch (error) {
       alert("Ошибка при запросе данных")
     }
     }
     
     fetchData();
  }, [])
  
  const onAddToCart = async (obj) => {
    console.log(obj);
    
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    if (findItem) {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      await axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cart/${findItem.id}`);
    } else {
      setCartItems((prev) => [...prev, obj]);
     const {data} = await axios.post('https://637fa1022f8f56e28e925aec.mockapi.io/cart', obj);
      setCartItems((prev) => prev.map(item => {
        if (item.parentId === data.parentId ) {
          return {
            ...item,
            id: data.parentId,
          }
        }
        return item;
      }));
    }
    } catch (error) {
      alert("Ошибка при добавлении в корзину")
    }
  };
  
 const onAddToFavorite = async (obj) => {
  console.log(onAddToFavorite )
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
    try {
      axios.delete(`https://637fa1022f8f56e28e925aec.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const searchValueInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider 
    value={{
      keyboards, 
      cartItems, 
      favorites,
      onAddToFavorite, 
      isItemAdded, 
      setOpenCart, 
      setCartItems,
      onAddToCart
      }}>
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
            cartItems={cartItems}
            keyboards={keyboards}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchValueInput={searchValueInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />}>
          </Route>
          <Route path="/favorites" exact 
              element={<Favorites />}>

          </Route>

          <Route path="/orders" exact element={
          <Orders

          />}>
            
          </Route>
      </Routes>
      
    </div>
    </AppContext.Provider>
  );
}

export default App;

