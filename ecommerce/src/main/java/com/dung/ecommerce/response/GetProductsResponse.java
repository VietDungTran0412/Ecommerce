package com.dung.ecommerce.response;

import com.dung.ecommerce.document.Product;
import lombok.Builder;

@Builder
public class GetProductsResponse {
    Iterable<Product> products;
    PageResponse pagination;
}
