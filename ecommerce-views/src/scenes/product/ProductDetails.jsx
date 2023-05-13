import { Col, Form, Input, Row, Select, Typography, Button, ConfigProvider, Upload, Modal } from "antd";
import { BASE_RULE } from "../../constants/formItem";

const baseRule = BASE_RULE;

export default function ProductDetails({ setActiveStep, setProduct, product, activeStep }) {

    const [form] = Form.useForm();

    const onFinish = async (info) => {
        setProduct(info);
        setActiveStep(activeStep + 1);
    }
    return (
        <Form initialValues={product ? product : {}} form={form} onFinish={onFinish} layout="vertical" className="mt-12">
            <Typography.Title level={4}>Product's Information</Typography.Title>
            <Row gutter={20} className="mt-8">
                <Col span={12}>
                    <Form.Item label="Product Name" rules={[baseRule]} name={'name'}>
                        <Input placeholder="Please enter product's name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Category" rules={[baseRule]} name={'category'}>
                        <Select placeholder="Please choose one category!">
                            <Select.Option value="CLOTHES">Clothes</Select.Option>
                            <Select.Option value="BOOK">Book</Select.Option>
                            <Select.Option value="HOUSEHOLD">Household</Select.Option>
                            <Select.Option value="STUDY">Study</Select.Option>
                            <Select.Option value="FOOD">Food</Select.Option>
                            <Select.Option value="DAILY">Daily</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Price - AUD" rules={[baseRule]} name={'price'}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Quantity" rules={[baseRule]} name={'quantity'}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Phone Contact" rules={[baseRule]} name={'phone'}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email Contact" rules={[baseRule]} name={'email'} >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Address" rules={[baseRule]} name={'address'} >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Short Description" rules={[baseRule]} name={'shortDescription'} >
                        <Input showCount maxLength={200} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Long Description" rules={[baseRule]} name={'longDescription'}>
                        <Input.TextArea showCount maxLength={1000} rows={8} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            <Button className="w-full mt-12" htmlType="submit" type="primary">Next</Button>
                        </ConfigProvider>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}