import { useSelector } from "react-redux";
import { Row, Typography } from "antd";
import Item from "./Item";


export default function ShoppingList({title}) {

  const items = useSelector(state => state.cart.items);
  console.log("shopping list: ", items)

  return (
    <div className="mt-20 w-4/5 m-auto flex flex-col justify-center items-center">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Row gutter={[16, { xs: 8, sm: 12, md: 24, lg: 32 }]} className="w-full mt-4" align={'middle'}>
        {
          items.map((item, i) => <Item item={item} key={item.id} />)
        }
      </Row>
    </div>
  )
}