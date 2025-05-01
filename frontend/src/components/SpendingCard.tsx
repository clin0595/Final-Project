import { useState } from "react";
import ItemCard from "./ItemCard";
import "../util";
import { convertToCurrencyFormat } from "../util";
import "../pages/finance"


type SpendingCardProps = {
  index: number;
  name: string;
  totalUpdate: (newTotal: number, index: number) => void;
};

const SpendingCard = ({ index, name, totalUpdate }: SpendingCardProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newCost, setNewCost] = useState("");
  const handleItemClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCreateClick = () => {
    const newItem: Item = {
      name: newItemName,
      price: convertToCurrencyFormat(newCost),
      note: newNotes
    };
    setItemCount(itemCount + 1);
    setAllItems((prev) => [...prev, newItem]);
    totalUpdate(Number(convertToCurrencyFormat(newCost)), index)
    setNewItemName("");
    setNewCost("");
    setNewNotes("");
    setIsOpen(!isOpen);
    const updatedTotal = totalPrice + Number(newItem.price);
    setTotalPrice(updatedTotal);
    
  };

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textbox = document.getElementById('notes')
    if (textbox) {
      textbox.style.height = "auto";
      textbox.style.height = textbox.scrollHeight + "px";
    }
    setNewNotes(e.target.value);
  }


  return (
    <div className="spendingBox">
      <div className="spendingHeader">
        <h2 className="spendingTitle">{name}</h2>
        <button className="newSpendingTypeButton" onClick={handleItemClick}>
          + Purchase
        </button >
        {isOpen && (
          <div className="addItem">
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
            </div>
            <div className="notesBox">
            <textarea id = "notes"
              name="Notes"
              placeholder="Notes"
              value={newNotes}
              onInput={handleInput}
            />
            </div>
            <button className="createButton" onClick={handleCreateClick}>
              + add
            </button>
          </div>
        )}
        {Array.from({ length: itemCount }, (_, i) => {
          return (
            <ItemCard
              name={allItems[i].name ? allItems[i].name : `Item ${i + 1}`}
              price={allItems[i].price ? allItems[i].price : "0.00"}
              note={allItems[i].note}
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
