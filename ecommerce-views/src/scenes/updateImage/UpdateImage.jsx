import {useParams} from "react-router-dom";
import ImageUpload from "../product/ImageUpload";
import {Col, Row, Space, Typography} from "antd";
import image from "../../assets/no-image/no_image_available.jpeg";
import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";

const GET_PRODUCT_BY_ID = gql`
    query GET_PRODUCT_BY_ID($id: String!){
        getProductById(id: $id) {
            owner {
                firstname,
                lastname,
                id
            },
            product {
                id,
                name,
                shortDescription,
                longDescription,
                quantity,
                category,
                price,
                image {
                    url,
                },
                rate{
                    numOfRate,
                    score,
                },
            }
        }
    }
`

const UpdateImage = () => {
    const { itemId } = useParams();
    const { data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: itemId
        }
    });
    const [uploaded, setUploaded] = useState(false);
    useEffect(() => {
        if(uploaded) {
            refetch().then(() => {
                setUploaded(false);
            })
        }
    }, [uploaded]);
    console.log(uploaded)
    return (
        <div className={'w-screen h-screen flex justify-center items-center'}>
            <Row className={'w-full'}>
                <Col xxl={{ span: 8 }} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }} className={'flex justify-center items-center w-full h-full'}>
                    <img className="w-3/4" src={data?.getProductById?.product?.image?.url ? data?.getProductById?.product?.image?.url : image} alt="image" />
                </Col>
                <Col span={12} className="">
                    <Space direction="vertical" >
                        <Typography.Title level={3}>{data?.getProductById?.product?.name}</Typography.Title>
                        <Typography level={4}>Price: ${data?.getProductById?.product?.price}</Typography>
                        <div className={'mt-8'}>
                            <Typography.Text className={'font-extrabold text-black'}>Short Description:</Typography.Text>
                            <Typography.Paragraph className="my-4">
                                 {data?.getProductById?.product?.shortDescription}
                            </Typography.Paragraph>
                        </div>
                        <div className={'mt-8'}>
                            <Typography.Text className={'font-extrabold text-black'}>Long Description:</Typography.Text>
                            <Typography.Paragraph className="my-4">
                                {data?.getProductById?.product?.longDescription}
                            </Typography.Paragraph>
                        </div>
                        <Row className="w-4/5  mt-8">
                            <Col span={12}>
                                <Typography>Categories: <span >{data?.getProductById?.product?.category}</span> </Typography>
                                <Typography>Provider: {data?.getProductById?.owner?.firstname} {data?.getProductById?.owner?.lastname}</Typography>
                            </Col>
                        </Row>
                    </Space>
                    <div className={'w-full flex flex-col justify-items-start'}>
                        <Typography.Title level={4}>Upload Image</Typography.Title>
                        <div className={'w-full'}>
                            <ImageUpload setIsUploaded={setUploaded} isUploaded={uploaded} createdId={itemId}/>
                        </div>
                    </div>
                </Col>
            </Row>


        </div>
    )
}

export default UpdateImage;