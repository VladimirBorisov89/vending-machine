import './App.css';
import { useState, useEffect } from 'react';
import Fridge from './components/Fridge';
import Coiner from './components/Coiner';
import Change from './components/Change';
import { back4app } from './API/credentials';

function App() {
  const [products, setProducts] = useState([]);
  const [deposit, setDeposit] = useState(0.00);
  const [resetChange, setResetChange] = useState(false);

  // Load Products on mount from API
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    headers[back4app.appIdHeader] = back4app.appIdValue;
    headers[back4app.apiKeyHeader] = back4app.apiKeyValue;

    fetch(back4app.baseUrl + 'Products', { headers: headers })
      .then((response) => response.json())
      .then((data) => setProducts(data.results));
  }, [])

  // Accepted coins (cents, where 100 cents = 1 EUR)
  const coins = [1, 2, 5, 10, 20, 50];

  // When the Buy button is clicked:
  function handleBuy(index) {
    // Reduce the stock of the product:
    const productsCopy = products.map(obj => ({ ...obj }));
    productsCopy[index].stock--;
    setProducts(productsCopy);
    // Reduce the deposit:
    setDeposit((prevDeposit) => prevDeposit - products[index].price);
  }

  return (
    <div className="vending-machine">
      <Fridge products={products} deposit={deposit} handleBuy={handleBuy} />
      <Coiner deposit={deposit} setDeposit={setDeposit} coins={coins} setResetChange={setResetChange} />
      <Change deposit={deposit} setDeposit={setDeposit} coins={coins} resetChange={resetChange} />
    </div>
  );
}

export default App;
