import { useState } from "react";
import{ useEffect } from "react";
import SpendingCard from "../components/SpendingCard";
import Summary from "../components/Summary";
import { useLocation } from "react-router-dom";
import "./style.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/fireBase_Auth";


const Finance = () => {
  const [spendingTypeCount, setSpendingTypeCount] = useState<number>(0);
  const [spendings, setSpendings] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [allCategory, setAllCategory] = useState<SpendingCategory[]>([]);

  const location = useLocation();
  const incomeFromHome = location.state?.income ?? 10000;
  const [newIncome, setIncome] = useState(incomeFromHome);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setIncome(data.income || 0);
          setSpendings(data.spendings || 0);
          setAllCategory(data.categories || []);
          setSpendingTypeCount(data.categories?.length || 0);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);


  const saveUserData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        income: newIncome,
        spendings,
        categories: allCategory,
      });
      console.log("User data saved");
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const handletotal = (newTotal: number, index: number) => {
    const updatedSpendings = spendings + newTotal;
    const updatedCategories = allCategory.map((cat, i) => {
      if (i === index) {
        return { ...cat, total: cat.total + newTotal };
      }
      return cat;
    });

    setSpendings(updatedSpendings);
    setAllCategory(updatedCategories);

    setTimeout(saveUserData, 0); // Delay to ensure state is updated
  };

  const handleNewTypeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateClick = async () => {
    const user = auth.currentUser;
    if (!user) return;
  
    const name = newName ? newName : "Category " + (spendingTypeCount + 1);
    const newCategory: SpendingCategory = {
      name: name,
      total: 0,
    };
  
    const updatedCategories = [...allCategory, newCategory];
  
    setNewName("");
    setIsOpen(false);
    setSpendingTypeCount(updatedCategories.length);
    setAllCategory(updatedCategories);
  
    try {
      await setDoc(doc(db, "users", user.uid), {
        income: newIncome,
        spendings,
        categories: updatedCategories,
      });
      console.log("New category saved to Firebase");
    } catch (error) {
      console.error("Failed to save new category:", error);
    }
  };
  

  const handleDeleteCategory = (indexToDelete: number) => {
    const updatedCategories = allCategory.filter((_, i) => i !== indexToDelete);
    const updatedSpendings = updatedCategories.reduce((sum, cat) => sum + cat.total, 0);
  
    setAllCategory(updatedCategories);
    setSpendings(updatedSpendings);
    setSpendingTypeCount(updatedCategories.length);

    const user = auth.currentUser;
    if (!user) return;
  
    setDoc(doc(db, "users", user.uid), {
      income: newIncome,
      spendings: updatedSpendings,
      categories: updatedCategories,
    })
  };


  return (
    <div className="finance">
      <Summary
        income={newIncome}
        spending={spendings}
        categories={allCategory}
      />
      <div className="heading">
        <h1 className="spendingTotal">Total Spendings: ${spendings}</h1>
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
        {allCategory.map((category, i) => (
          <div key={i} className="spendingCardContainer" style={{ marginBottom: "20px" }}>
            <SpendingCard
              index={i}
              name={category.name || `Category ${i + 1}`}
              totalUpdate={handletotal}
            />
            <button
              className="deleteButton"
              style={{ marginTop: "10px", backgroundColor: "#e74c3c", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}
              onClick={() => {
                handleDeleteCategory(i);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finance;