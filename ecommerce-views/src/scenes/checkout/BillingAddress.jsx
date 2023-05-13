import { ConfigProvider, Form, Row, Typography, Col, Input, Button, Checkbox } from "antd"
import { useState } from "react";
import ShippingAddress from "./ShippingAddress";
import { BASE_RULE } from "../../constants/formItem";

const baseRule = BASE_RULE;

export default function BillingAddress({ activeStep, setActiveStep, setBilling, billing }) {

    const [same, setSame] = useState(false);

    const handleFormSubmit = async (info) => {
        
        if(!same) {
            setBilling({ ... info,
                shippingAddress1: info.billingAddress1,
                shippingAddress2: info.billingAddress2,
                shippingState: info.billingState,
                shippingCity: info.billingCity,
                shippingZipcode: info.billingZipcode
            })
        }else {
            setBilling(info);
        }
        setActiveStep(activeStep + 1);
    }

    return (
        <Form initialValues={ billing ? billing : {} } onFinish={handleFormSubmit} className="mt-12" layout="vertical">
            <Typography.Title level={4}>Billing Address</Typography.Title>
            <Row gutter={20} className="mt-8">
                <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                    <Form.Item rules={[baseRule]} label="Street Address" name={'billingAddress1'}>
                        <Input placeholder="Street Address" />
                    </Form.Item>
                </Col>
                <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                    <Form.Item rules={[baseRule]} label="Street Address 2 (Optional)" name={'billingAddress2'}>
                        <Input placeholder="Street Address 2" />
                    </Form.Item>
                </Col>
                <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                    <Form.Item rules={[baseRule]} label="State" name={'billingState'}>
                        <Input placeholder="State" />
                    </Form.Item>
                </Col>
                <Col span={6} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                    <Form.Item rules={[baseRule]} label="City/Suburb" name={'billingCity'}>
                        <Input placeholder="City/Suburb" />
                    </Form.Item>
                </Col>
                <Col span={6} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                    <Form.Item rules={[baseRule]} label="Zipcode" name={'billingZipcode'}>
                        <Input placeholder="Zipcode" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '2b2b2b'
                        }
                    }}>
                        <Checkbox defaultChecked onChange={(e) => setSame(!same)}>Same for shipping address</Checkbox>
                    </ConfigProvider>
                </Col>
                { same ? <ShippingAddress/> : null }
                <Col span={24}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '2b2b2b'
                        }
                    }}>
                        <Button htmlType="submit" className="w-full my-16" type="primary">Next</Button>
                    </ConfigProvider>
                </Col>
            </Row>

        </Form>
    )
}