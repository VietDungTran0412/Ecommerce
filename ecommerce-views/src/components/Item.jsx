import { MinusOutlined, PlusOutlined} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography, ConfigProvider, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addToCart, updateItem } from "../state";
import { endpoint } from "../constants/endpoint";


export default function Item({ item }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    
    const [image, setImage] = useState(null);
    
    const fetchImage = async () => {
        await fetch(`${endpoint}/image/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'image/img',
                // 'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then( res =>  {
            return res.blob()
        })
        .then(blob => {
            const img = URL.createObjectURL(blob); // create an object URL from the blob
            dispatch(updateItem({...item, image: img}))
            setImage(img);
        })
    }
    useEffect(() => {
        fetchImage()
    }, [])

    return (
        <Col className="mb-16 flex justify-center items-center" xxl={{span: 6}} xl={{span: 8}} md={{span: 12}} lg={{span: 8}}  sm={{span: 12}} xs={{span: 24}}>
            <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    className="h-72"
                    src={image ? image : "https://png.pngtree.com/png-clipart/20220719/original/pngtree-loading-icon-vector-transparent-png-image_8367371.png"}
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