import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './Coin.js'


function App() {

  const[coins, setCoins]=useState([]);
  const[search,setSearch]=useState('');

useEffect(() => {
  axios

  .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')

  .then(res => {
    setCoins(res.data);
    // console.log(res.data)
  })
  
  .catch(error =>{
    console.log("error")
  });

}, []);

const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins =coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input 
          className='coin-input'
          placeholder='search'
          onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return(
          <Coin key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                marketCap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
                />
                
        )
      })} 
    </div>
  );
}

export default App;

