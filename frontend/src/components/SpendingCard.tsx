import { useState } from "react";
import ItemCard from "./ItemCard";
import "../util";
import { convertToCurrencyFormat } from "../util";
import "../pages/finance"


type SpendingCardProps = {
  name: string;
  total: number;
};

const SpendingCard = ({ name,total }: SpendingCardProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newCost, setNewCost] = useState("");
  const handleItemClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCreateClick = () => {
    const newItem: Item = {
      name: newItemName,
      price: convertToCurrencyFormat(newCost),
    };
    setItemCount(itemCount + 1);
    setAllItems((prev) => [...prev, newItem]);
    setNewItemName("");
    setNewCost("");
    setIsOpen(!isOpen);
    setTotalPrice(totalPrice + Number(newItem.price));
    total = totalPrice;
  };

  return (
    <div className="spendingBox">
      <div className="spendingHeader">
        <h2 className="spendingTitle">{name}</h2>
        <button className="newSpendingTypeButton" onClick={handleItemClick}>
          + Purchase
        </button>
        {isOpen && (
          <div className="add">
            <input
              name="ItemName"
              placeholder="Purchase Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <br />
            <span
              style={{
                marginRight: "4px",
                marginLeft: "10px",
                fontSize: "16px",
              }}
            >
              $
            </span>
            <input
              style={{ width: "130px", marginRight: "10px" }}
              name="Cost"
              type="number"
              placeholder="0.00"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
            />
            <button className="createButton" onClick={handleCreateClick}>
              +
            </button>
          </div>
        )}
        {Array.from({ length: itemCount }, (_, i) => {
          return (
            <ItemCard
              name={allItems[i].name ? allItems[i].name : `Item ${i + 1}`}
              price={allItems[i].price ? allItems[i].price : "0.00"}
            />
          );
        })}
      </div>
      <p id="totalSpendings">
        Total Spending: ${convertToCurrencyFormat(String(totalPrice))}
      </p>
    </div>
  );
};

export default SpendingCard;
