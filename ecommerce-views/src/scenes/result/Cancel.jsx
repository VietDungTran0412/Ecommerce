import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
    const navigate = useNavigate();
    
    return (
    <Space className="h-screen w-screen m-auto flex justify-center items-center">
        <Space className="flex flex-col justify-center items-center h-full m-4">
            <Space direction="vertical" className="bg-zinc-100 rounded-md">
                <Space className=" bg-red-500 flex rounded-t-md justify-center items-center">
                    <CloseCircleOutlined className="text-8xl my-20 text-white"/>
                </Space>
                <Space direction="vertical" className="flex-col justify-center items-center mx-4 my-4 text-center">
                    <Typography.Paragraph>
                        Your order has been placed successfully!
                    </Typography.Paragraph>

                    <Typography.Paragraph>
                        We will confirm your payment and order shortly!
                    </Typography.Paragraph>
                    <ConfigProvider theme={{token: {
                        colorPrimary: '#2b2b2b'
                    }}}>
                        <Button onClick={() => navigate('/')} className="my-4" type="primary">Continue</Button>
                    </ConfigProvider>
                </Space>
            </Space>
        </Space>
    </Space>
    )
}