import { InboxOutlined, RightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space, Typography, notification } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../constants/endpoint";


export default function ImageUpload({ createdId }) {
    const[isUploaded, setIsUploaded] = useState(false);
    const navigate = useNavigate();
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file)
        await fetch(`${endpoint}/image/${createdId}`, {
            method: 'POST',
            body: formData
        }).then(res => {
            notification.success({
                message: "Success",
                description: 'Save Image to Ecommerce successfully!'
            })
        }).catch(error => {
            notification.error({
                message: "Error",
                description: 'Unexpected Error!'
            })
        })
    }

    return (
        <div className="h-full my-12">

            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#2b2b2b'
                }
            }}>
                {
                    isUploaded ? <Button onClick={(e) => {
                        e.preventDefault();
                        navigate(`/item/${createdId}`)
                    }} className="w-full my-8" type="primary" icon={<RightOutlined/>}>Exit</Button> : null
                }
                 <div>

                <Dragger maxCount={1} onChange={(info) => {
                    if (info.file.status === "done") {
                        uploadImage(info.file.originFileObj);
                        setIsUploaded(true);
                    }
                }} action={`${endpoint}/image/${createdId}`} listType="picture">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <Typography.Title level={4}>Upload Your Product's Image</Typography.Title>
                    <Typography.Paragraph>
                        We need your product's artwork to gain better user's experience
                    </Typography.Paragraph>
                </Dragger>
                                    
                </div>
            </ConfigProvider>
        </div>

    )
}