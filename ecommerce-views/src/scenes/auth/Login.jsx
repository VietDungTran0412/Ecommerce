import { Button, Col, ConfigProvider, Form, Input, Row, Space, Typography, notification } from "antd";
import useMedia from "use-media-antd-query";
import { BASE_RULE } from "../../constants/formItem";
import { gql, useLazyQuery } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const baseRule = BASE_RULE;

const LOG_IN = gql`
    query LOG_IN($email: String!, $password: String!){
        login(loginRequest: {email: $email, password: $password}) {
            accessToken,
            user {
                id
            }
        }
    }
`


export default function Login() {
    const media = useMedia();
    const [login, {loading, data, error}] = useLazyQuery(LOG_IN, {
        fetchPolicy: 'network-only'
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(data) {
            localStorage.setItem('jwt', data.login.accessToken);
            localStorage.setItem('user', data?.login?.user?.id)
            notification.success({
                message: 'Welcome!',
                description: 'Successfully log in Ecommerce!'
            })
            navigate('/')
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: "Username or Password is incorrect!"
            })
        }
    }, [data, error])

    function onLogin(info) {
        login({variables: {
            email: info.email,
            password: info.password
        }})
    }

    if(localStorage.getItem('jwt')) {
        return <Navigate to={'/'} replace/>
    }

    return (
        <div className="w-full flex m-auto justify-center mt-12">
            <Space direction="vertical" className={`mt-16 ${['lg', 'md', 'xs', 'sm'].includes(media) ? 'w-4/5' : 'w-2/5 mx-36'}   p-10`}>
                <Typography.Title level={4}>Log In Information</Typography.Title>
                <Form onFinish={onLogin} layout="vertical">
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item rules={[baseRule]} label="Email" name={'email'}>
                                <Input placeholder="Please enter your email!"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[baseRule]} label="Password" name={'password'}>
                                <Input.Password placeholder="Please enter your password!"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Typography.Link onClick={() => navigate('/register')}>Not had an account yet?</Typography.Link>
                        </Col>
                        <Col className="" span={24}>
                            <ConfigProvider theme={{token: {
                                colorPrimary: '2b2b2b'
                            }}}>
                                <Form.Item>
                                    <Button loading={loading} htmlType="submit" className="w-full mt-8 mb-24" type="primary">Log In</Button>
                                </Form.Item>
                            </ConfigProvider>
                        </Col>
                    </Row>
                </Form>
            </Space>
        </div>
    )
}