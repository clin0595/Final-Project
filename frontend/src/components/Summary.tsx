import PieChart from "./PieChart";
import "./styles.css";

type SummaryProps = {
  income: number;
  spending: number;
  categories: SpendingCategory[];
};

const Summary = ({income, spending, categories} : SummaryProps) => {
    return(
        <div className="summaryContainer">
            <div className="summaryHeader">
                <h1 className="summaryTitle"> Your Monthly Totals: </h1>
            </div>
            <div className="summaryBox">
                    <div className="summaryContext">
                        <div className="info">Income:
                            <span style={{fontSize: "2rem", fontWeight: "bold", marginTop: "10px",color: "#cd9b59", }}>{income}</span>
                        </div>
                        <div className="info">Spending:
                            <span style={{fontSize: "2rem", fontWeight: "bold", marginTop: "10px",color: "#cd9b59",}}>{spending}</span>
                        </div>
                        <div className="info">Savings:
                            <span style={{fontSize: "2rem", fontWeight: "bold", marginTop: "10px",color: "#cd9b59",}}>{income - spending}</span>
                        </div>
                    </div>
                <div className="dataContainer">
                    <div className="dataBox">
                        <h2 className="bugettingTitle">Budgeting Summary:</h2>
                        {categories.map((types) => (
                            <div className="data">
                            {types.name}: {((types.total/income)*100).toFixed(2)}%
                            </div>
                        ))}
                        <div className="data">
                        Savings: {(((income - spending)/income)*100).toFixed(2)} %
                        </div>
                    </div>
                    <div className="chart">
                    <PieChart 
                        categories={categories} 
                        income={income} 
                        spending={spending}>
                    </PieChart>
                    </div>
                </div>
            </div>
        </div>
            
      

    )
}

export default Summary;
