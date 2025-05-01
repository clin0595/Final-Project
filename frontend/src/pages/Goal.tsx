import { useEffect, useState } from "react";
import { ExchangeResponse } from "@full-stack/types";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { convertToCurrencyFormat } from "../util";
import "./style.css";

const getExchange = () : Promise<ExchangeResponse[]> =>
    fetch(`${BACKEND_BASE_PATH}/goal`).then((res) => res.json());
const Exchange = () => {
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
          console.log(data)
        })}, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
        update()
      };
    

      const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
        update()
      };

    return (
        <center>
        
        <div className="currencyExchange">
          <h1 className="summaryTitle">Planning a Vacation Overseas?</h1>
          <div>
            <h2 style={{color: "#cd9b59",}}>Currency Conversion</h2>
            <div>
              <label htmlFor="amount" style={{color: "#cd9b59",fontWeight: "bold", marginRight: "5px"}}>Amount to Convert: </label>
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
              <p>
                {amount? amount : '0.00'} USD is equivalent to {convertToCurrencyFormat(String(Number(amount) * selectedRate))} {selectedCurrency}.
              </p>
            </div>
          </div>
          </div>  
        </center>
    );
};

export default Exchange;