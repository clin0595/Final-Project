import { useEffect, useState } from "react";
import { ExchangeResponse } from "@full-stack/types";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { convertToCurrencyFormat } from "../util";
import "./style.css";
import BucketItem from "../components/BucketItem";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../backend/fireBase_Auth";

const getExchange = (): Promise<ExchangeResponse[]> =>
  fetch(`${BACKEND_BASE_PATH}/goal`).then((res) => res.json());

const Exchange = () => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [selectedRate, setSelectedRate] = useState(0);
  const [Exchange, setExchange] = useState<ExchangeResponse[]>([]);
  const [bucketCount, setBucketCount] = useState<number>(0);
  const [bucketName, setBucketName] = useState("");
  const [allItems, setAllItems] = useState<BucketCategory[]>([]);
  
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

  // Fetch exchange rates
  useEffect(() => {
    console.log("Loading Exchange Rate...");
    getExchange().then((data) => {
      setExchange(data);
    });
  }, []);

  useEffect(() => {
    const fetchBucketList = async () => {
      const user = auth.currentUser; // if user is not logged in 
      if (!user) return;
      
      try {
        const querySnapshot = await getDocs(collection(db, "bucketList"));
        const items: BucketCategory[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, name: data.name };  
        });

        setAllItems(items); 
        setBucketCount(items.length); 
      } catch (error) {
        console.error("Error fetching bucket list:", error);
      }
    };
    fetchBucketList();
  }, []);

  const update = () => {
    const newRate = Exchange.find((item) => item.toCurrency === selectedCurrency);
    if (newRate) {
      setSelectedRate(newRate.rates);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    update();
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    update();
  };

  const handleNewBucket = async () => {
    const newCategory = { name: bucketName };
  
    try {
      const docRef = await addDoc(collection(db, "bucketList"), newCategory);
  
      const newItem = {
        id: docRef.id,
        name: bucketName,
      };
  
      setAllItems([...allItems, newItem]);
      setBucketCount(bucketCount + 1);
      setBucketName(""); // Clears the input
    } catch (error) {
      console.error("Error adding bucket item:", error);
    }
  };

  const deleteBucketRequest = async (itemId: string) => {
    console.log("attempt to DELETE");
  
    try {
      const itemDocRef = doc(db, "bucketList", itemId); 
      await deleteDoc(itemDocRef); 
      console.log("Item deleted successfully");
  
      setAllItems((prevItems) => prevItems.filter(item => item.id !== itemId));
      setBucketCount((prevCount) => prevCount - 1); // decrease the count
    } catch (error) {
      console.error("Error deleting bucket item:", error);
    }
  };
  
  const handleDeleteBucketItem = (itemId: string) => {
    deleteBucketRequest(itemId);
  };

  // reorganized the indenting 
  return (
    <center>
      <div className="bucket">
        <div>
          <h1 className="goalTitle">Bucket List</h1>
          <p>
            Here you could add anything you plan to do in near or distant
            future! That way you can start budgeting for each of them :3.
          </p>
          <input
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
          />
          <button style={{marginLeft: "10px"}} onClick={() => {
                  putRequest();
                  handleNewBucket();
          }}>Add to your bucket list!</button> 
        </div>

        <div className="bucketList">
          {allItems.map((item, i) => (
            <BucketItem 
            key={i} 
            name={`${i + 1}) ${item.name}`} 
            onDelete={() => handleDeleteBucketItem(item.id)} 
            />
          ))}
        </div>
      </div>

      <div className="currencyExchange">
        <h1 className="goalTitle">Planning a Vacation Overseas?</h1>
        <div>
          <div className="vacation">
            <h2 style={{ color: "#cd9b59" }}>Currency Conversion</h2>
            <div>
              <label
                htmlFor="amount"
                style={{
                  color: "#cd9b59",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                Amount to Convert:
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>

            <label
              htmlFor="currency"
              style={{ color: "#cd9b59", fontWeight: "bold", marginRight: "5px" }}
            >
              Select Currency:
            </label>
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
              {Exchange.map((item) => (
                <option value={item.toCurrency} key={item.toCurrency}>
                  {item.toCurrency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="conversionText">
              {amount ? amount : "0.00"} USD is equivalent to{" "}
              {convertToCurrencyFormat(String(Number(amount) * selectedRate))}{" "}
              {selectedCurrency}.
            </p>
          </div>
        </div>
        <button onClick={postRequest} style={{marginRight: "10px"}}> ★ </button>
        <button onClick={putRequest} style={{marginRight: "10px"}}> ★ </button>
        <button onClick={deleteRequest}> ★ </button>
      </div>
    </center>
  );
};

export default Exchange;
