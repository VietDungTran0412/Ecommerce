import { Form, Typography, Col, Input } from "antd"
import { BASE_RULE } from "../../constants/formItem"

const baseRule = BASE_RULE;

export default function ShippingAddress() {


    return (
        <>
            <Col span={24}>
                <Typography.Title level={4}>Shipping Information</Typography.Title>
            </Col>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                <Form.Item rules={[baseRule]} label="Street Address" name={'shippingAddress1'}>
                    <Input placeholder="Street Address" />
                </Form.Item>
            </Col>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                <Form.Item rules={[baseRule]} label="Street Address 2 (Optional)" name={'shippingAddress2'}>
                    <Input placeholder="Street Address 2" />
                </Form.Item>
            </Col>
            <Col span={12} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                <Form.Item rules={[baseRule]} label="State" name={'shippingState'}>
                    <Input placeholder="State" />
                </Form.Item>
            </Col>
            <Col span={6} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                <Form.Item rules={[baseRule]} label="City/Suburb" name={'shippingCity'}>
                    <Input placeholder="City/Suburb" />
                </Form.Item>
            </Col>
            <Col span={6} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                <Form.Item rules={[baseRule]} label="Zipcode" name={'shippingZipcode'}>
                    <Input placeholder="Zipcode" />
                </Form.Item>
            </Col>
        </>
    )
}