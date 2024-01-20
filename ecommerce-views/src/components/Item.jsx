import { MinusOutlined, PlusOutlined} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography, ConfigProvider  } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addToCart } from "../state";
import image from '../assets/no-image/no_image_available.jpeg'

export default function Item({ item }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);

    return (
        <Col className="mb-16 flex justify-center items-center" xxl={{span: 6}} xl={{span: 8}} md={{span: 12}} lg={{span: 8}}  sm={{span: 12}} xs={{span: 24}}>
            <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    className="h-72"
                    src={item?.image?.url ? item?.image?.url : image}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{cursor: 'pointer'}}
                />
            }
        >
            <Row gutter={20}  justify={'space-between'}>
                <Col span={24} className="flex justify-center items-center">
                    <Typography >{item.name}</Typography>
                </Col>
                <Col span={24} className="flex justify-center items-center mb-4">
                    <div className="text-xs text-neutral-500 max-h-8 h-8 overflow-hidden">{item.shortDescription}</div>
                </Col>
                <Col span={12}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b',
                        }
                    }}>
                        <Button className="border-none" onClick={() => {
                            dispatch(addToCart({ item: { ...item, count } }))
                        }}>Add to cart</Button>
                    </ConfigProvider>
                </Col>
                <Col className="flex justify-center" span={4}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b',
                        }
                    }}>
                        <Button shape="circle" className="border-none" onClick={() => {
                            if (count > 1) {
                                setCount(count => count - 1)
                            }
                        }} icon={<MinusOutlined />} />
                    </ConfigProvider>
                </Col>
                <Col className="flex justify-center items-center" span={4}>

                    <Typography>{count}</Typography>

                </Col>
                <Col className="flex justify-center" span={4}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b',
                        }
                    }}>
                        <Button shape="circle" className="border-none" onClick={() => {
                                setCount(count => count + 1);
                            }} icon={<PlusOutlined />} />
                    </ConfigProvider>
                </Col>
            </Row>
        </Card>
        </Col>

    )
}