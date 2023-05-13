package com.dung.ecommerce.response;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.document.User;
import lombok.Builder;
import lombok.Data;

@Builder
public class ProductByIdResponse {
    private User owner;
    private Product product;
    private Iterable<Product> relatedProducts;
}
