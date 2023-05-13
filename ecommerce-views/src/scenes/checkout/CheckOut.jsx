import { ConfigProvider,Space, Steps } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import useMedia from "use-media-antd-query";
import BillingAddress from "./BillingAddress";
import Payment from "./Payment";
import { Navigate } from "react-router-dom";


export default function CheckOut() {
    const [activeStep, setActiveStep] = useState(0);
    const [cart, setCart] = useSelector((state) => state.cart.cart);
    const [billing, setBilling] = useState(null);
    const media = useMedia();

    // if(cart.size === 0) {
    //     return <Navigate to={'/'}/>
    // }

    return (
        <div className="flex m-auto justify-center">
            <Space direction="vertical" className={`mt-32 ${['xs', 'sm', 'md'].includes(media) ? 'w-screen mx-0' : 'w-3/5 mx-36'}   p-10`}>
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#2b2b2b',
                    }
                }}>
                    <Steps type="default" current={activeStep} items={[
                        {
                            title: 'Billing Information',
                            description: 'Finalise Billing Address',
                        },
                        {
                            title: 'Contact & Payment',
                            description: 'Pay Your Orders',
                        }
                    ]} />
                </ConfigProvider>
                {
                    activeStep === 0 ? <BillingAddress billing={billing} setActiveStep={setActiveStep} activeStep={activeStep} setBilling={setBilling} /> 
                    : <Payment setBilling={setBilling} billing={billing} activeStep={activeStep} setActiveStep={setActiveStep}/>
                }
                
            </Space>
        </div>
    )
}