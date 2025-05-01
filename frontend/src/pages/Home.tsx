const HomePage = () => (
    <div> 
        <div className="container">
            <img src="Piggy.png" className="coins"></img>
            <div className="text">
            <h1 className="homeTitle">Welcome to CashFlow!</h1>
            <p >
                Your own personal expenses organizer to track down how much you have spent. 
                Budget Tracker helps you stay on top of your expenses by letting you set goals 
                and monitor your progress. Stay organized, stay within budget, and save your wallet!
            </p>
            </div>
        </div>
        <div className="incomeTitle">
            Enter your yearly income here before going to the finance page: 
            <input style={{marginLeft: "20px", marginRight: "10px"}}></input> 
            <button>✔</button>
        </div>
        <div className="infoGrid">
            <div>
                <h2 style={{color: "#56694f"}}>Organize!</h2>
                Cashflow allows for an easy way to organize all of your spendings into categories, 
                and for each purchase in the category you can add notes as a record. 
            </div>
            <div>
                <h2 style={{color: "#56694f"}}>Plan!</h2>
                Cashflow keeps track of your goal so you could plan your spendings acoordingly 
                to meet it! Like your dream vacation!
            </div>
            <div>
                <h2 style={{color: "#56694f"}}>Convience!</h2>
                Cashflow allows for an easy way to organize all of your spendings into categories.
            </div>
        </div>
    </div>
    
);

export default HomePage;
