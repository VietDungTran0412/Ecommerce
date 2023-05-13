import { gql, useMutation } from "@apollo/client";
import { Button, Table, Tag, notification } from "antd";
import Link from "antd/es/typography/Link";
import { useEffect } from "react";


const REMOVE_PRODUCT = gql`
    mutation RemoveProduct($productId: String!, $userId: String!) {
        removeProduct(productId: $productId, userId: $userId) {
            id
        }
    }
`


export default function ManagedTable({ columns, dataSource, userId, refetch }) {

    const [removeProduct, {data, loading, error}] = useMutation(REMOVE_PRODUCT)
    const cols = [
        {
            key: '5',
            title: 'Name',
            dataIndex: 'name',
            width: 400,
            render: (_, {id, name}) => <Link href={`item/${id}`}>{name}</Link>
        },
        {
            key: '2',
            title: 'Category',
            responsive: ['md'],
            dataIndex: 'category'
        },
        {
            key: '3',
            title: 'Price',
            responsive: ['sm'],
            dataIndex: 'price',
        }, {
            key: '6',
            title: 'Rate',
            dataIndex: 'rate',
            render: (_, {rate: {score}}) => {
                if(score >=4 ) {
                    return <Tag color="green">{score}</Tag>
                }
                return score < 3.5 ? <Tag color="red">{score}</Tag> : <Tag color="yellow">{score}</Tag>
            }
        },
        {
            key: '7',
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, {id}) => <Button loading={loading} onClick={(e) => {
                removeProduct({variables: {
                    productId: id,
                    userId: userId
                }})
            }} type="primary" danger>Remove</Button>
        }
    ]

    useEffect(() => {
        if(data) {
            notification.success({
                message: 'Success',
                description: `Successfully deleted product ${data.removeProduct.id}`
            })
            refetch()
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: 'Received unexpected error during process!'
            })
        }
    }, [data, error])

    return (
        <Table size="large" dataSource={dataSource} pagination={{pageSize: 10}} className="overflow-hidden" columns={cols}/>
    )
}