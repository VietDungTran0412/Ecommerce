import { MinusOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Col, ConfigProvider, Divider, Rate, Row, Space, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { addToCart } from "../../state";
import Item from "../../components/Item";
import image from '../../assets/no-image/no_image_available.jpeg'

const GET_PRODUCT_BY_ID = gql`
    query GET_PRODUCT_BY_ID($id: String!){
        getProductById(id: $id) {
            owner {
                firstname,
                lastname,
                id
            }
            product {
                id,
                name,
                shortDescription,
                longDescription,
                quantity,
                category,
                price,
                image {
                    url,
                },
                rate{
                    numOfRate,
                    score,
                },
            }
            relatedProducts {
                id,
                name,
                shortDescription,
                longDescription,
                quantity,
                category,
                price,
                image {
                    url
                },
                rate {
                    numOfRate,
                    score
                }
            }
        }
    }
`

const UPDATE_RATE = gql`
    mutation UpdateScore($score: Float!, $productId: String!) {
        updateScore(score: $score, productId: $productId)
    }
`


export default function ItemDetails() {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [count, setCount] = useState(1);
    const [owner, setOwner] = useState({});
    const [item, setItem] = useState({});
    const [updateScore] = useMutation(UPDATE_RATE);
    

    const { data } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: itemId
        }
    });

    useEffect(() => {
        if (data) {
            setItem({ ...data.getProductById.product, relatedProducts: data.getProductById.relatedProducts });
            setOwner(data.getProductById.owner);
        }
    }, [data])
    console.log(item)

    return (
        <Row className="m-auto my-24 w-4/5" justify={'space-between'}>
            <Col xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }} className={'flex justify-center items-center'}>
                <img className="w-3/4" src={item?.image?.url ? item?.image?.url : image} alt="image" />
            </Col>
            <Col span={12} className="">
                <Space direction="vertical" >
                    <Typography.Title level={4}>{item.name}</Typography.Title>
                    <Typography level={4}>${item.price}</Typography>
                    <Typography.Paragraph className="my-4">
                        {item.shortDescription}
                    </Typography.Paragraph>
                    <Space className="my-5" direction="horizontal" split>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            <Button onClick={() => {
                                setCount(Math.max(count - 1, 1))

                            }} className='border-none' shape='circle' icon={<MinusOutlined />} />
                        </ConfigProvider>
                        <div className="flex justify-center items-center w-12">
                            <Typography>{count}</Typography>
                        </div>

                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            <Button onClick={() => {
                                if (count < item.quantity) {
                                    setCount(count + 1)
                                }
                            }} className='border-none' shape='circle' icon={<PlusOutlined />} />
                        </ConfigProvider>

                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            <Button onClick={() => dispatch(addToCart({ item: { ...item, count: count } }))} className="ml-12" type="primary">ADD TO CART</Button>
                        </ConfigProvider>
                    </Space>
                    <Row className="w-4/5">
                        <Col span={12}>
                            <Typography>Categories:</Typography>
                            <Typography>Provider:</Typography>
                        </Col>
                        <Col span={12} className="flex flex-col justify-end items-end">
                            <Typography>{item.category}</Typography>
                            <Typography><UserOutlined /> {owner.firstname} {owner.lastname}</Typography>
                        </Col>
                    </Row>
                </Space>
            </Col>
            <Col className="my-8" span={24}>
                <Tabs className="h-32 max-h-48" items={[
                    {
                        label: 'DESCRIPTION',
                        key: 'description',
                        children:
                            (<Typography>
                                {item.longDescription}
                            </Typography>)
                    },
                    {
                        label: 'REVIEWS',
                        key: 'reviews',
                        children: (
                            <Row justify={''} align={'middle'}>
                                <Col xxl={{ span: 1 }}>
                                    <Typography>Rate: </Typography>
                                </Col>
                                <Col xxl={{ span: 6 }}>
                                    <Space size={'large'}>
                                        <Rate allowHalf  value={Math.round(item?.rate?.score * 2) / 2} onChange={(value) => {
                                            const newNum = item.rate.numOfRate + 1;
                                            setItem({...item, rate: {
                                                ... item?.rate,
                                                score: value,
                                                numOfRate: newNum
                                            }})
                                            updateScore({
                                                variables: {
                                                    score: value,
                                                    productId: itemId
                                                }
                                            })
                                        }}/>
                                        <Typography>{item?.rate?.numOfRate} reviews</Typography>
                                    </Space>
                                </Col>
                            </Row>
                        )
                    }
                ]}>
                </Tabs>
            </Col>
            <Divider />
            <Col span={24}>
                {/* <Space className="w-full" direction="vertical"> */}

                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col span={24}>
                        <Typography.Title level={4}>RELATED PRODUCTS</Typography.Title>
                    </Col>
                    {
                        item?.relatedProducts?.slice(0, 4).map((product, i) =>
                            <Item key={product?.id} item={product} />
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}