import { Button, Col, ConfigProvider, DatePicker, Form, Input, Row, Select, Space, Typography, notification } from "antd";
import useMedia from "use-media-antd-query";
import { BASE_RULE, EMAIL_RULE } from "../../constants/formItem";
import { Navigate, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import { useEffect } from "react";

const baseRule = BASE_RULE;
const emailRule = EMAIL_RULE;

const REGISTER = gql`
    mutation Register($firstname: String!, $lastname: String!, $dateOfBirth: String!, $email: String!, $gender: String!, $password: String!){
        register(user: {
            firstname: $firstname,
            lastname: $lastname,
            dateOfBirth: $dateOfBirth,
            email: $email,
            gender: $gender,
            password: $password
        }) {
            accessToken,
            user {
                firstname,
                lastname,
                id
            }
        }
    }
`

export default function Register() {
    const media = useMedia();
    const navigate = useNavigate();
    const [register, {data, loading, error}] = useMutation(REGISTER);
    useEffect(() => {
        if(data) {
            localStorage.setItem('jwt',data.register.accessToken)
            localStorage.setItem('user', data.register?.user?.id)
            notification.success( {
                message: `Welcome ${data.register?.user?.firstname} ${data.register?.user?.lastname}`,
                description: 'Successfully signed up!'
            })
            navigate('/');
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: error.message
            })
        }
    },[data, error])





    function onFinish(info) {
        const dateOfBirth = moment(info.dateOfBirth.$d).format('DD/MM/YYYY');
        const variables = { ...info, dateOfBirth: dateOfBirth };
        register({
            variables: variables
        })
    }

    if(localStorage.getItem('jwt')) {
        return <Navigate to={'/'} replace/>
    }

    return (
        <div className="w-full flex m-auto justify-center">
            <Space direction="vertical" className={`mt-16 ${['lg', 'md', 'xs', 'sm'].includes(media) ? 'w-full' : 'w-3/5 mx-36'}   p-10`}>
                <Form onFinish={onFinish} layout="vertical">
                    <Typography.Title level={4}>Register Information</Typography.Title>
                    <Row className="mt-8" gutter={20} justify={'space-between'}>
                        <Col xxl={{span: 12}} xl={{span: 12}} lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}}>
                            <Form.Item rules={[baseRule]} label="Firstname" name={'firstname'}>
                                <Input placeholder="Firstname"/>
                            </Form.Item>
                        </Col>
                        <Col xxl={{span: 12}} xl={{span: 12}} lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}} >
                            <Form.Item rules={[baseRule]} label="Lastname" name="lastname">
                                <Input placeholder="Lastname"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[baseRule, emailRule]} label="Email" name={'email'}>
                                <Input placeholder="Email"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[baseRule]} label="Password" name={'password'}>
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                        </Col>
                        <Col xxl={{span: 12}} xl={{span: 12}} lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}}>
                            <Form.Item rules={[baseRule]} label="gender" name={'gender'}>
                                <Select placeholder="Gender">
                                    <Select.Option value = 'MALE'>Male</Select.Option>
                                    <Select.Option value = 'FEMALE'>Female</Select.Option>
                                    <Select.Option value = 'OTHER'>Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={{span: 12}} xl={{span: 12}} lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}}>
                            <Form.Item rules={[baseRule]} label="Date Of Birth" name={'dateOfBirth'}>
                                <DatePicker format={'DD/MM/YYYY'} className="w-full"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Typography.Link onClick={() => navigate('/login')}>Already had an account?</Typography.Link>
                        </Col>
                        <Col className="mt-8 mb-16" span={24}>
                            <ConfigProvider theme={{token: {
                                colorPrimary: '2b2b2b'
                            }}}>
                                <Button loading={loading} htmlType="submit" className="w-full" type="primary">Sign Up</Button>
                            </ConfigProvider>
                        </Col>
                    </Row>
                </Form>
            </Space>
        </div>

    )
}