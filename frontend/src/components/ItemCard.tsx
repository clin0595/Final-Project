import "./styles.css";
type ItemCardProps = {
  name: string;
  price: string;
  note: string
};

const ItemCard = ({ name, price, note }: ItemCardProps) => (
  <div className="itemCard">
    <p className="itemName"> 
    <span style={{color:  "#56694f", fontSize: "25px" }}>{name}</span>
    <br /><span style={{color:  "#56694f"}}>Price:</span> ${price}
    <span style={{color:  "#56694f", fontSize: "15px", fontWeight: "400"}}><br />{note}</span>
    </p>
  </div>
);

export default ItemCard;
