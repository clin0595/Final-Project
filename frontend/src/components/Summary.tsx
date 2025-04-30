import PieChart from "./PieChart";

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
        <div className="info">Income
        <h2>{income}</h2>
        </div>
        <div className="info">Spending
        <h2>{spending}</h2>
        </div>
        <div className="info">Savings
        <h2>{income - spending}</h2>
        </div>
        </div>
        <div className="dataContainer">
        <div className="dataBox">
        <h2 className="bugettingTitle">Bugetting Summary:</h2>
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