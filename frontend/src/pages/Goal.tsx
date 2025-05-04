import { useEffect, useState } from "react";
import { ExchangeResponse } from "@full-stack/types";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { convertToCurrencyFormat } from "../util";
import "./style.css";
import BucketItem from "../components/BucketItem";


const getExchange = () : Promise<ExchangeResponse[]> =>
    fetch(`${BACKEND_BASE_PATH}/goal`).then((res) => res.json());
const Exchange = () => {
    const postRequest = () => {
      console.log("hi")
      fetch(`${BACKEND_BASE_PATH}/goal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({key: 50})
      }).then (response => console.log(response))
    }

      const putRequest = () => {
        console.log("attempt to PUT")
        fetch(`${BACKEND_BASE_PATH}/goal`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({key: 100})
        }).then (response => console.log(response))
      
    
  }

  
  const deleteRequest = () => {
    console.log("attempt to DELETE")
    fetch(`${BACKEND_BASE_PATH}/goal`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({key: 0})
    }).then (response => console.log(response))

}


    const [amount, setAmount] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
    const [selectedRate, setSelectedRate] = useState(0);
    const [Exchange, setExchange] = useState<ExchangeResponse[]>([]);
    const update = () => {
        const newRate = Exchange.find(item => item.toCurrency === selectedCurrency)
            if (newRate) {
                setSelectedRate(newRate.rates);
                }
    }
    useEffect(() => {
        console.log("Loading Exchange Rate...");
        getExchange().then((data) => {
          setExchange(data);
        })}, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
        update()
      };
    

      const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
        update()
      };

    const [bucketCount, setBucketCount] = useState<number>(0); 
    const [bucketName, setBucketName] = useState(""); 
    const [allItems, setAllItems] = useState<BucketCategory[]>([]); 

    const handleNewBucket = () => {
      setBucketCount(bucketCount + 1)
      setBucketName(bucketName)
      const newCategory: BucketCategory = {
        name: bucketName,
      };
  
      const updatedCategories = [...allItems, newCategory];
      setAllItems(updatedCategories);
      setBucketName("")
    }

    return (
        <center>
          <div className="bucket">
              <div>
                <h1 className="goalTitle">Bucket List</h1>
                <p>Here you could add anything you plan to do in near or distant furture! That way you can 
                  start budgeting for each of them :3. 
                </p>
                <input value={bucketName} onChange={(e) => setBucketName(e.target.value)}/>
                <button style={{marginLeft: "10px"}} onClick={() => {
                  putRequest();
                  handleNewBucket();
                }}>Add to your bucket list!</button> 
              </div>

              <div className="bucketList">
                {Array.from({ length: bucketCount }, (_, i) => (
                  <BucketItem
                    name={ `${i + 1}) ${allItems[i].name}` }
                  />
                ))}
              </div>
          </div>
          
        
        <div className="currencyExchange">
          <h1 className="summaryTitle">Planning a Vacation Overseas?</h1>
          <div>
            <h2 style={{color: "#cd9b59",}}>Currency Conversion</h2>
            <div>
              <label htmlFor="amount" style={{color: "#cd9b59",fontWeight: "bold", marginRight: "5px",}}>Amount to Convert: </label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div>
              <label htmlFor="currency" style={{color: "#cd9b59", fontWeight: "bold", marginRight: "5px"}}>Select Currency: </label>
              <select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                {Exchange.map((item) => (
                  <option value={item.toCurrency}>
                  {item.toCurrency}
                </option>
                ))}
              </select>
            </div>
            <div>
              <p className = "conversionText">
                {amount? amount : '0.00'} USD is equivalent to {convertToCurrencyFormat(String(Number(amount) * selectedRate))} {selectedCurrency}.
              </p>
            </div>
          </div>
          <button onClick={postRequest}>Does Something</button>
          <button onClick={deleteRequest}>Does Something Else</button>
          </div>  
        </center>
    );
};

export default Exchange;