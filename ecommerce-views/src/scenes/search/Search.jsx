import { Button, Checkbox, Col, ConfigProvider, Divider, Form, Input, Pagination, Row, Space, Spin, Typography, notification } from "antd";
import ShoppingList from "../../components/ShoppingList";
import { gql, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setItems, setTotalItems } from "../../state";
import { DEFAULT_PAGE_SIZE } from "../../constants/formItem";
import { SearchOutlined } from "@ant-design/icons";

const defaultPageSize = DEFAULT_PAGE_SIZE;

const SEARCH = gql`
    query GetProducts($name: String = "", $price: PriceInput, $page: Int! = 0){
        getProducts(pageable: {page: $page, size: ${defaultPageSize}}, name: $name, price: $price) {
            products {
                id,
                name,
                shortDescription,
                quantity,
                price,
                category,
                longDescription,
                rate {
                    score
                }
            },
            pagination {
                size,
                totalElements
            }
        }
    }
`


export default function Search() {

    const dispatch = useDispatch();
    const { error, data, loading, refetch } = useQuery(SEARCH);
    const totalItems = useSelector(state => state.cart.totalItems);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        if (data) {
            dispatch(setItems(data?.getProducts?.products))
            dispatch(setTotalItems(data?.getProducts?.pagination?.totalElements))
        }
        if (error) {
            notification.error({
                message: 'Error',
                description: 'Internal Server Error!'
            })
        }
    }, [data, error])

    return (
        <Space direction="vertical" className="mt-36 w-screen">
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#2b2b2b'
                }
            }}>
                <Row gutter={[0, 24]} className="w-3/5 m-auto flex justify-center items-center">
                    <Typography.Title level={3}>Search Your Products</Typography.Title>
                    <Col span={24}>
                        <Form onFinish={(info) => {
                            if(info.name) {
                                refetch({
                                    name: info.name
                                })
                            }
                            else {
                                console.log(refetch({
                                    name: ""
                                }))
                            }
                        }}>
                            <Space.Compact className="w-full">
                                <Form.Item className="w-full" name={'name'}>
                                    <Input placeholder="Enter a product name to search" />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit"  icon={<SearchOutlined />}>Search</Button>
                                </Form.Item>
                            </Space.Compact>
                        </Form>
                    </Col>
                </Row>
            </ConfigProvider>
            {
                loading ? <Spin /> :
                    <>
                        <ShoppingList title={"30 Results found"}/>
                        <Space className="flex m-auto justify-center items-center">
                            <Pagination pageSize={defaultPageSize} total={totalItems} current={current} showSizeChanger={false} onChange={(page) => {
                                refetch({ page: page - 1 })
                                setCurrent(page)
                            }} />

                        </Space>
                    </>
            }

        </Space>
    )
}