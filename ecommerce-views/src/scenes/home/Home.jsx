import MainCarousel from "./MainCarousel"
import ShoppingList from "../../components/ShoppingList"
import Subsribe from "./Subscribe"
import { Divider, notification } from "antd"
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../state";

const GET_USERS = gql`
  query GET_PRODUCTS($page: Int, $size: Int, $name: String = ""){
    getProducts(pageable: {page: $page, size: $size}, name: $name) {
        products {
            id,
            name,
            shortDescription,
            quantity,
            price,
            category,
            longDescription,
            image {
                url,
            },
            rate {
                score
            }
        },
        pagination {
            size,
            totalElements
        }
    }
  }
`;

export default function Home() {
    const { error, data } = useQuery(GET_USERS, {
        variables: {
          page: 0,
          size:10
        }
      });
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
          dispatch(setItems(data.getProducts.products));
        }
        if (error) {
            console.error(error)
          notification.error({
            message: 'Error',
            description: 'Internal Server Error!'
          })
        }
      }, [data, error])

    return (
        <div>
            <MainCarousel/>
            <ShoppingList title={"Our Feature Products"}/>
            <Divider className="w-4/5 mt-16" />
            <Subsribe/>
        </div>
    )
}