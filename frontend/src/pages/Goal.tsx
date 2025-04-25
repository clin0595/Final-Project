import { useEffect, useState } from "react";
import { ExchangeResponse } from "@full-stack/types";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { convertToCurrencyFormat } from "../util";
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
        });

        
    }, []);

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
            <h1>Planning a Vacation Overseas?</h1>
    <div>
      <h2>Currency Conversion</h2>
      <div>
        <label htmlFor="amount">Amount to Convert: </label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label htmlFor="currency">Select Currency: </label>
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
        </center>
    );
};

export default Exchange;