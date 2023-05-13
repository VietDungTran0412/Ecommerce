import { Space, Button, Input, Typography, ConfigProvider, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import useMedia from "use-media-antd-query";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";


const SUBSCRIBE = gql`
  mutation Subscribe($email: String!){
    subscribe(email: $email)
  }
`

export default function Subsribe() {
  const media = useMedia();
  const [email, setEmail] = useState('');
  const [subscribe, { loading, data, error}] = useMutation(SUBSCRIBE);
  
  const onSubscribe = async (e) => {
    e.preventDefault();
    subscribe({
      variables: {
        email
      }
    })
  }

  useEffect(() => {
    if(data) {
      setEmail('')
      notification.success({
        message: 'Succcess',
        description: data.subscribe
      })
    }
    if(error) {
      notification.error({
        message: 'Error',
        description: error.message
      })
    }
  },[data, error])

  return (
    <Space direction="vertical" align="center" className="mb-20 w-screen flex justify-center items-center m-auto">
      <MailOutlined className="text-5xl text-gray-400" />
      <Typography.Title level={['xs', 'sm', 'md'].includes(media) ? 4 : 3} >Subscribe To Our Newsletter</Typography.Title>
      <Typography className="mb-8 text-base text-center w-4/5 flex justify-center items-center m-auto">
        and receive 10% discount for the first order when you checkout!
      </Typography>
      <Space.Compact size="large" className="w-max">
          <Input
            value={email}
            className={`${['xs', 'sm', 'md'].includes(media) ? 'w-fit' : 'w-96'}`}
            placeholder="Please enter your email to subscribe!"
            onChange={e => setEmail(e.target.value)}
          />
          <ConfigProvider theme={{token: {
            colorPrimary: '#2b2b2b'
          }}}>
            <Button loading={loading} onClick={onSubscribe} type="primary" htmlType="submit" icon={<MailOutlined />}>Subscribe</Button>
          </ConfigProvider>

      </Space.Compact>
    </Space>
  );
}
