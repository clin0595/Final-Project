import { useState } from "react";
import SpendingCard from "../components/SpendingCard";
import Summary from "../components/Summary";
import "./style.css";



const Finance = () => {
  const [allNames, setAllNames] = useState<string[]>([]);
  const [spendingTypeCount, setSpendingTypeCount] = useState<number>(0);
  const [spendings, setSpendings] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [allCategory, setAllCategory] = useState<SpendingCategory[]>([])
  const handletotal = (newTotal: number, index: number) => {
    setSpendings(spendings + newTotal);
    allCategory[index].total += newTotal;

    setAllCategory(prev => 
      prev.map((cat, i) => {
        if (i === index) {
          return {
            ...cat,
            total: cat.total + newTotal,
          };
        } else {
          return cat;
        }
      })
    );
  };

  const handleNewTypeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateClick = () => {
    setSpendingTypeCount(spendingTypeCount + 1);
    const name = newName? newName : "Category " + (spendingTypeCount + 1);
    const newCategory: SpendingCategory = {
      name: name,
      total: 0,
    }
    // setAllNames((prev) => [...prev, newName]);
    setNewName("");
    setIsOpen(!isOpen);
    setAllCategory((prev) => [...prev, newCategory]);
  };

  return (
    <div className = "finance">
        <Summary 
        income={10000}
        spending={spendings}
        categories = {allCategory}>
        </Summary>
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
          <div className="createButton">
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
                index={i}
                name={allCategory[i].name ? allCategory[i].name : `Category ${i + 1}`}
                totalUpdate={handletotal}
              />
            );
          })}
        </div>
    </div>
  );
};

export default Finance;
