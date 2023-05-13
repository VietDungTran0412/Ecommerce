import { useNavigate } from "react-router-dom"
import { Badge, Button, Col, ConfigProvider, Row, notification } from 'antd'
import { UserOutlined, ShoppingOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../state";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";


const DO_LOGOUT = gql`
    mutation LOGOUT {
        logout {
            jwt
        }
    }
`

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [logout, { loading, error, data }] = useMutation(DO_LOGOUT, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    });
    useEffect(() => {
        if(data) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user')
            notification.success({
                message: 'Success',
                description: 'Successfully log out!'
            })
            navigate('/');
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: error.message
            })
        }
    }, [data, error]);

    return (
        <div className="flex align-center justify-center w-full fixed top-0 left-0 z-50 p-2" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Row justify={'space-between'} className="z-20 w-full m-2">
                <Col xl={{span: 8, offset: 0}} md={{span: 8, offset: 4}} className="text-black text-2xl flex justify-center">
                    <div onClick={()=> navigate('/')} className="cursor-pointer">Ecommerce</div> 
                </Col>
                <Col xl={{span: 4}}  md={{span: 8}} sm={{span: 8}} className="ml-auto">
                    <Row gutter={20}>
                        <Col>
                            <ConfigProvider theme={{token: {
                                colorPrimary: '2b2b2b'
                            }}}>
                                <Button onClick={()=> localStorage.getItem('jwt') ? navigate('profile') : navigate('login')} icon={<UserOutlined />} shape="circle" />
                            </ConfigProvider>
                        </Col>
                        <Col>
                            <Badge count={cart.length}>
                                <ConfigProvider theme={{token: {
                                    colorPrimary: '2b2b2b'
                                }}}>
                                <Button
                                    onClick={() => dispatch(setIsCartOpen({}))}
                                    icon={<ShoppingOutlined />} shape="circle" />
                                </ConfigProvider>
   
                            </Badge>

                        </Col>
                        <Col>
                            <ConfigProvider theme={{
                                token: {
                                    colorPrimary: '2b2b2b'
                                }
                            }}>
                                <Button onClick={() => navigate('search')} icon={<SearchOutlined />} shape="circle" />
                            </ConfigProvider>

                        </Col>
                        <Col>
                            <ConfigProvider theme={{token: {
                                colorPrimary: '2b2b2b'
                            }}}>
                                <Button loading={loading} disabled={ localStorage.getItem('jwt') ? false : true } onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }} icon={<LogoutOutlined />} shape="circle" />
                            </ConfigProvider>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}