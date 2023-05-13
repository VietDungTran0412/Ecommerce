import { gql, useMutation } from "@apollo/client";
import { Button, ConfigProvider, Descriptions, Space, Typography, notification } from "antd";
import { useEffect } from "react";
import useMedia from "use-media-antd-query";

const CREATE_PRODUCT = gql`
    mutation CreateProduct(
        $name: String!, 
        $price: Double!, 
        $shortDescription: String!, 
        $longDescription: String!, 
        $quantity: Int!, 
        $category: String!, 
        $address: String!, 
        $phone: Long!, 
        $email: String!) {
        createProduct(product: {
            name: $name, 
            price: $price, 
            shortDescription: $shortDescription, 
            longDescription: $longDescription, 
            quantity: $quantity, 
            category: $category, 
            address: $address, 
            phone: $phone, 
            email: $email}) {
            name,
            id
        }
    }
`

export default function ProductConfirmation({ product, setActiveStep, activeStep, setCreatedId }) {
    const [createProduct, {data, loading, error}] = useMutation(CREATE_PRODUCT, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    })

    const media = useMedia();

    useEffect(() => {
        if(data) {
            notification.success({
                message: 'Success',
                description: `Successfully created product ${data.createProduct.name} with id: ${data.createProduct.id}`
            })
            setActiveStep(activeStep + 1);
            setCreatedId(data.createProduct?.id);
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: error.message
            })
        }
    },[data, error])

    const onConfirm = async (e) => {
        e.preventDefault();
        createProduct({variables: product})
    }

    return (
        <Space direction="vertical">
            <Typography.Title className="mt-12" level={4}>Confirmation</Typography.Title>
            <Typography.Link onClick={() => setActiveStep(0)}>Edit Information</Typography.Link>
            <Descriptions className="mt-4" column={{xxl: 24, xl: 24}}>
                <Descriptions.Item span={12} label="Name">{product?.name}</Descriptions.Item>
                <Descriptions.Item span={12} label="Category">{product?.category}</Descriptions.Item>
                <Descriptions.Item span={12} label="Email Contact">{product?.email}</Descriptions.Item>
                <Descriptions.Item span={12} label="Phone Contact">{product?.phone}</Descriptions.Item>
                <Descriptions.Item span={12} label="Price">{product?.price}</Descriptions.Item>
                <Descriptions.Item span={12} label="Quantity">{product?.quantity}</Descriptions.Item>
                <Descriptions.Item span={24} label="Address">{product?.address}</Descriptions.Item>
            </Descriptions>
            <Descriptions layout={['sm','xs','md', 'lg'].includes(media) ? 'vertical' : 'horizontal'}>
                    <Descriptions.Item span={24} label="Short Description">
                        <Typography.Paragraph className="text-justify">{product?.shortDescription}</Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label = "Long Description">
                        <Typography.Paragraph className=" text-justify">{product?.longDescription}</Typography.Paragraph>
                    </Descriptions.Item>
            </Descriptions>
            <ConfigProvider theme={{token: {
                colorPrimary: '#2b2b2b'
            }}}>
                <Button loading={loading} onClick={onConfirm} type="primary" className="w-full mt-8">Confirm Product</Button>
            </ConfigProvider>
        </Space>

    )
}