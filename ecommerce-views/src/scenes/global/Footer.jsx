import { Col, Row, Typography } from "antd";

export default function Footer() {
    return (
        <div className="mt-36 w-screen overflow-hidden left-0 bg-gray-100 mb-0 bottom-0 static">
            <Row  className="py-12 px-12 w-full" align={'center'} justify={'space-between'}>
                <Col className="flex flex-wrap flex-col justify-start items-start" span={8} xxl={{span: 8}} xl={{span: 8}} lg={{span: 24}} md={{span: 24}}  sm={{span: 24}} xs={{span: 24}}>
                    <Typography.Title className="mb-10" level={4}> ECOMMER</Typography.Title>
                    <Typography className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Col>
                <Col className="flex flex-col justify-start items-start" xxl={{span: 4}} xl={{span: 4}} lg={{span: 4}} md={{span: 4}} xs={{span: 24}}>
                    <Typography.Title level={4}>About Us</Typography.Title>
                    <Typography className="mb-2">Careers</Typography>
                    <Typography className="mb-2">Our Stores</Typography>
                    <Typography className="mb-2">Terms & Condition</Typography>
                    <Typography className="mb-2">Privacy Policy</Typography>
                </Col>
                <Col className="flex flex-col justify-start items-start" xxl={{span: 4}} xl={{span: 4}} lg={{span: 4}} md={{span: 4}} xs={{span: 24}}>
                    <Typography.Title level={4}>Customer Care</Typography.Title>
                    <Typography className="mb-2">Help Center</Typography>
                    <Typography className="mb-2">Track Your Order</Typography>
                    <Typography className="mb-2">Returns & Refunds</Typography>
                    <Typography className="mb-2">Corporate & Bulk Purchasing</Typography>
                </Col>
                <Col className="flex flex-col justify-start items-start" xxl={{span: 4}} xl={{span: 4}} lg={{span: 4}} md={{span: 4}} xs={{span: 24}}>
                    <Typography.Title level={4}>Contact Us</Typography.Title>
                    <Typography className="mb-2">36 Elphin Grove, Hawthorn, VIC</Typography>
                    <Typography className="mb-2">Email: abc@mailhog.com</Typography>
                    <Typography className="mb-2">(+61) 432 768 901</Typography>
                </Col>
            </Row>
        </div>
    )
}