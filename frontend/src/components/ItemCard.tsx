import "./styles.css";
type ItemCardProps = {
  name: string;
  price: string;
};

const ItemCard = ({ name, price }: ItemCardProps) => (
  <div className="itemCard">
    <p className="itemName"> 
    <span style={{color:  "#56694f", fontSize: "25px" }}>{name}</span>
    <br /><span style={{color:  "#56694f"}}>Price:</span> ${price}</p>
  </div>
);

export default ItemCard;
