import { useNavigate } from 'react-router-dom'
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen
} from '../../state'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, ConfigProvider, Divider, Row, Space, Typography } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useMedia from 'use-media-antd-query';

export default function CartMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const media = useMedia();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.price
    }, 0)
    return (
        <Row className={`${isCartOpen ? 'block' : 'hidden'} fixed z-50 w-full h-screen left-0 top-0 overflow-auto`} style={{ backgroundColor: 'rgba(0,0,0,0.4' }}>
            <Col className={`fixed right-0 bottom-0 ${['sm','xs','md'].includes(media) ? 'w-full' : 'w-1/2'}  h-screen overflow-auto bg-white`}>
                <Row className='m-12' gutter={[{}, 20]} justify={'space-between'}>
                    <Col span={12} className='flex text-black justify-start items-center w-96'>
                        <div className='text-2xl'>SHOPPING CART({cart.length})</div>    
                        
                    </Col>
                    <Col span={12} className='flex justify-end items-center'>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b'
                            }
                        }}>
                            <Button size='large' onClick={() => {
                                dispatch(setIsCartOpen({}))
                            }} className='border-none' shape='circle' icon={<CloseOutlined />} />
                        </ConfigProvider>
                    </Col>
                    <Col span={24}>
                        {
                            cart.map((item, i) => {
                                return (
                                    <Row className='my-8' key={i}>
                                        <Col span={12}>
                                            <img className='w-4/5 h-full' src={ item.image ? item.image :"https://cdn.shopify.com/s/files/1/2724/6858/collections/Untitled-11111_360x.jpg?v=1680047469"}
                                                alt="item"
                                                // style={{
                                                //     width: '180px',
                                                //     height: '200px',
                                                // }}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-col items-start'>
                                                    <Typography.Title level={5}>{item.name}</Typography.Title>
                                                    <Typography>{item.shortDescription}</Typography>
                                                </div>
                                                <div className='flex flex-col items-start'>
                                                    <ConfigProvider theme={{
                                                        token: {
                                                            colorPrimary: '#2b2b2b'
                                                        }
                                                    }}>
                                                        <Button size='small' onClick={(e) => dispatch(removeFromCart({id: item.id}))} className='border-none' shape='circle' icon={<CloseOutlined />} />
                                                    </ConfigProvider>
                                                </div>
                                            </div>
                                            <Space className='mt-12'>
                                                <Button onClick={(e) => dispatch(decreaseCount({id: item.id}))} className='border-none' shape='circle' icon={<MinusOutlined />} />
                                                <Typography className='ml-4 mr-4'>{item.count}</Typography>
                                                <Button onClick={(e) => dispatch(increaseCount({id: item.id}))} className='border-none' shape='circle' icon={<PlusOutlined />} />
                                            </Space>
                                        </Col>
                                        <Divider />
                                    </Row>
                                )
                            })
                        }
                    </Col>
                    <Col span={24} className='flex justify-between'>
                        <Typography>Subtotal</Typography>
                        <Typography>${totalPrice}</Typography>
                    </Col>
                    <Col span={24} className='flex items-center justify-center'>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#2b2b2b',
                            }
                        }}>
                            <Button disabled={cart.length === 0} onClick={()=> {
                                dispatch(setIsCartOpen({isCartOpen: false}));
                                navigate('/checkout')
                            }} size='large' className='w-full' type='primary'>CHECKOUT</Button>
                        </ConfigProvider>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}   