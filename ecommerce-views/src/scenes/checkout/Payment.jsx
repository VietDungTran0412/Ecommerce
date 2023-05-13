import { Col, Form, Row, Input, Typography, Button, ConfigProvider, notification } from 'antd'
import { BASE_RULE, EMAIL_RULE } from '../../constants/formItem'
import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../state';

const baseRule = BASE_RULE;
const emailRule = EMAIL_RULE;

const MAKE_ORDER = gql`
    mutation MakeOrder($shippingContact: ContactInput!, $billingContact: ContactInput!, $products: [OrderedProductInput]!) {
        makeOrder(
        userId: "",
        order: {
            contact: $shippingContact,
            payment: {
                paymentContact: $billingContact
            },
            products: $products
        }) {
            successUrl,
            cancelUrl,
            paymentUrl
        }
    }
`


export default function Payment({ setBilling, billing, setActiveStep, activeStep }) {

    const [confirm, setConfirm] = useState(false);

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);

    const [makeOrder, { data, loading, error }] = useMutation(MAKE_ORDER);

    const handleSubmit = async (info) => {
        setBilling({ ...billing, ...info});
        setConfirm(true);
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        if(cart.length == 0) {
            notification.warning({
                message: 'Warning',
                description: 'You have to add items into cart before place order!'
            })
            return;
        }
        let userId = localStorage.getItem('user') ? localStorage.getItem('user') : ''
        const products = cart.map(item => {
            return { quantity: item.count, id: item.id };
        })
        makeOrder({
            variables: {
                shippingContact: {
                    firstname: billing.firstname,
                    lastname: billing.lastname,
                    phone: billing.phone,
                    email: billing.email,
                    address1: billing.shippingAddress1,
                    address2: billing.shippingAddress2,
                    state: billing.shippingState,
                    city: billing.shippingCity,
                    zipCode: billing.shippingZipcode
                },
                billingContact: {
                    firstname: billing.firstname,
                    lastname: billing.lastname,
                    phone: billing.phone,
                    email: billing.email,
                    address1: billing.billingAddress1,
                    address2: billing.billingAddress2,
                    state: billing.billingState,
                    city: billing.billingCity,
                    zipCode: billing.billingZipcode
                },
                products: products
            },
        })
    }

    useEffect(() => {
        if(data) {
            notification.success({
                message: 'Successfully placed an order!',
                description: 'Please wait until the transaction complete. The confirmation will be sent to your email!'
            })
            window.location.href = data.makeOrder.paymentUrl;
            cart.map(item => {
                dispatch(removeFromCart({ id: item.id }))
            })
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: error.message
            })
        }
    }, [data, error])

    return (
        <Form onFinish={handleSubmit} initialValues={billing ? billing : {}} layout='vertical'>
            <Typography.Title level={4}>Contact Information</Typography.Title>
            <Row className='mt-8' gutter={20}>
                <Col span={12} md={{span: 12}} sm={{span: 24}} xs={{span: 24}}>
                    <Form.Item label='Firstname' name={'firstname'} rules={[baseRule]}>
                        <Input disabled={confirm} />
                    </Form.Item>
                </Col>
                <Col span={12} md={{span: 12}} sm={{span: 24}} xs={{span: 24}}>
                    <Form.Item label='Lastname' name={'lastname'} rules={[baseRule]}>
                        <Input disabled={confirm} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label='Phone Number' name={'phone'} rules={[baseRule]}>
                        <Input disabled={confirm} type='number' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label='Email' name={'email'} rules={[emailRule, baseRule]}>
                        <Input disabled={confirm} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Typography.Link onClick={() => setActiveStep(activeStep - 1)}>Edit Billing Information</Typography.Link>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            {
                                !confirm ? <Button className='w-full my-16' htmlType='submit' type='primary'>Confirm</Button> :
                                    <Button loading={loading} className='w-full my-16' type='primary' onClick={placeOrder}>Place Order</Button>
                            }
                        </ConfigProvider>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}