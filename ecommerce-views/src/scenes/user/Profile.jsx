import { UserOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import { Avatar, Col, ConfigProvider, Row, Space, Tabs, Typography } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useMedia from "use-media-antd-query"
import ManagedTable from "../../components/ManagedTable";

const GET_PERSONAL_DETAILS = gql `
    query PersonalDetails {
        getPersonalDetails {
            id,
            firstname,
            lastname,
            gender,
            dateOfBirth,
            email,
            products {
                name,
                price,
                shortDescription,
                quantity,
                id,
                category,
                rate {
                    numOfRate,
                    score
                }
            }
        }
    }
`


export default function Profile() {
    const { data, loading, error, refetch} = useQuery(GET_PERSONAL_DETAILS, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    })

    const [user, setUser] = useState(null);
    const media = useMedia();

    useEffect(() => {
        if(data) {
            setUser(data.getPersonalDetails)
        }
        if(error) {
            localStorage.removeItem('jwt')
        }
    }, [data, error])

    if(!localStorage.getItem('jwt')) {
        return <Navigate to={'/'}/>
    }
    return (
        <div className="w-full flex m-auto justify-center">
            <Space direction="vertical" className={`mt-16 ${['lg', 'md', 'xs', 'sm'].includes(media) ? 'w-full' : 'w-3/5 mx-36'}   p-10`}>
                <Typography.Title level={3}>Your Profile</Typography.Title>
                <Row gutter={[20, 20]} justify={'space-between'}>
                    <Col sm={{span: 8}} xxl={{span: 4}} xl={{span: 4}} lg={{span: 4}} md={{span: 4}} className="flex justify-center items-center">
                        <Avatar size={150} icon={<UserOutlined/>}/>
                    </Col>
                    <Col xxl={{span: 16}} xl={{span: 16}} sm={{span: 24}} lg={{span: 16}}>
                        <Typography.Text strong className="text-lg">User ID: <Typography.Text italic copyable className="text-lg">{user?.id}</Typography.Text></Typography.Text>
                        <Row className={`w-4/5 mt-4`} gutter={[0, 16]} justify={'space-between'}>
                            <Col xl={{span: 12}} sm={{span: 24}} xs={{span: 24}} lg={{span: 12}}>
                                <Typography.Text className="text-base">Firstname: {user?.firstname}</Typography.Text>
                            </Col>
                            <Col xl={{span: 12}} sm={{span: 24}} xs={{span: 24}} lg={{span: 12}}>
                                <Typography.Text className="text-base">Lastname: {user?.lastname}</Typography.Text>
                            </Col>
                            <Col xl={{span: 12}} sm={{span: 24}} xs={{span: 24}} lg={{span: 12}}>
                                <Typography.Text className="text-base">Gender: {user?.gender}</Typography.Text>
                            </Col>
                            <Col xl={{span: 12}} sm={{span: 24}} xs={{span: 24}} lg={{span: 12}}>
                                <Typography.Text className="text-base">Date Of Birth: {moment(user?.dateOfBirth).format('DD/MM/YYYY')}</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Text className="text-base" italic>Contact: {user?.email}</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Link href="createProduct">Selling a product?</Typography.Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <ConfigProvider theme={{token: { colorPrimary: '#2b2b2b'}}}>
                            <Tabs items={[
                                {
                                    key: 'product',
                                    label: 'Your Products',
                                }
                            ]}/>
                        </ConfigProvider>
                        <ManagedTable refetch={refetch} userId={user?.id} dataSource={user?.products}/>
                    </Col>
                </Row>
            </Space>
        </div>
    )
}