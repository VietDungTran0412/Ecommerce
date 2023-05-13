import { ConfigProvider, Space, Steps } from "antd"
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import useMedia from "use-media-antd-query"
import ProductDetails from "./ProductDetails";
import ProductConfirmation from "./ProductConfirmation";
import ImageUpload from "./ImageUpload";

export default function CreateProduct() {
    const media = useMedia();
    const [product, setProduct] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [createdId, setCreatedId] = useState();

    if(!localStorage.getItem('jwt')) {
        return <Navigate to={'login'}/>
    }
    return (
        <div className="flex m-auto justify-center">
            <Space direction="vertical" className={`mt-32 ${['xs', 'sm','md'].includes(media)? 'w-screen mx-0' : 'w-3/5 mx-36'}   p-10`}>
                <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b',
                        }
                    }}>
                        <Steps type="default" current={activeStep} items={[
                            {
                                title: 'Product Information',
                                description: 'Fill the product information',
                            },
                            {
                                title: 'Confirmation',
                                description: 'Confirm provided information'
                            },
                            {
                                title: 'Upload Image',
                                description: "Add Product's Image"
                            }
                        ]}/>
                </ConfigProvider>
                {
                    activeStep === 0 ? <ProductDetails activeStep={activeStep} product={product} setActiveStep={setActiveStep} setProduct={setProduct}/> 
                    : activeStep === 1 ? <ProductConfirmation setCreatedId={setCreatedId} activeStep={activeStep} product={product} setActiveStep={setActiveStep}/>
                    : <ImageUpload createdId={createdId}/>
                }
                <Outlet/>
            </Space>
        </div>
    )
}