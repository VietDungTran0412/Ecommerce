import { Button, Col, Row, ConfigProvider, Space, Typography } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { CaretLeftFilled, CaretLeftOutlined, CaretRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import useMedia from 'use-media-antd-query';
const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

export const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
)
export default function MainCarousel() {
    const media = useMedia();
    return (
        <Carousel
            className='w-screen'
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => {
                return (
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b'
                        }
                    }}>
                        <Button className='absolute top-1/2 left-5 z-10 ' shape='circle' onClick={onClickHandler} icon={<LeftOutlined />} />
                    </ConfigProvider>
                )
            }}
            renderArrowNext={(onClickHandler, hasNext, label) => {
                return (
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#2b2b2b'
                        }
                    }}>
                        <Button className='absolute top-1/2 right-5 z-10' shape='circle' onClick={onClickHandler} icon={<RightOutlined />} />
                    </ConfigProvider>

                )
            }}
        >
            {Object.values(heroTextureImports).map((texture, index) =>
            (
                <div key={index}>
                    <img key={index} className='w-full object-cover h-96 bg-fixed' style={{ height: '700px' }} src={texture} alt={`carousel-${index}`} />
                    <Row className={`text-white text-left flex-row flex p-8 rounded-sm absolute top-1/2 z-100 m-auto max-w-xl ${media === 'xxl'? 'left-48' : 'w-full left-0'} mt-101`} style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                        <Col>
                            <Typography className='text-white'>-- NEW ITEMS</Typography>
                            <Typography className='text-white text-5xl'>SUMMER SALE</Typography>
                            <Typography className='text-white'>Discover More</Typography>
                        </Col>
                    </Row>
                </div>
            ))}
        </Carousel>
    )
}