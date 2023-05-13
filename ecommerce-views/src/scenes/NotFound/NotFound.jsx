
import { Col, Row, Space, Typography } from "antd";

export default function NotFound() {
    return (
        <Row className="mt-24 m-auto w-3/5 h-screen" align={'middle'} justify={'center'}>
            <Col span={10} className="flex justify-center items-center">
                <Space align="center" direction="vertical">
                    <Typography.Title level={1}>404</Typography.Title>
                    <Typography.Title level={2}>Page Not Found</Typography.Title>
                    <div className="flex justify-center items-center flex-col mt-4">
                        <Typography.Paragraph>The page you are looking for doesn't exist</Typography.Paragraph>
                        <Typography.Paragraph><Typography.Link href="/">Go back</Typography.Link>, or connect with our team for more details.</Typography.Paragraph>
                    </div>
                </Space>

            </Col>
        </Row>
    )
}