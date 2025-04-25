import { useState } from "react";
import SpendingCard from "../components/SpendingCard";
import "./style.css";



const Finance = () => {
  const [allNames, setAllNames] = useState<string[]>([]);
  const [spendingTypeCount, setSpendingTypeCount] = useState<number>(0);
  const [spendings, setSpendings] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  

  const handleNewTypeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateClick = () => {
    setSpendingTypeCount(spendingTypeCount + 1);
    setAllNames((prev) => [...prev, newName]);
    setNewName("");
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <center>
        <div className="heading">
          <h1 className="spendingTotal">Total Spendings: ${spendings} </h1>
          <button
            style={{ marginLeft: "10px" }}
            className="newSpendingTypeButton"
            onClick={handleNewTypeClick}
          >
            + Category
          </button>
        </div>

        {isOpen && (
          <div>
            <input
              style={{ marginTop: "20px" }}
              name="spendingCardName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              style={{ marginLeft: "10px" }}
              className="createButton"
              onClick={handleCreateClick}
            >
              create
            </button>
          </div>
        )}
        <div className="spendings">
          {Array.from({ length: spendingTypeCount }, (_, i) => {
            return (
              <SpendingCard
                name={allNames[i] ? allNames[i] : `Category ${i + 1}`}
                total={0}
              />
            );
          })}
        </div>
      </center>
    </div>
  );
};

export default Finance;
