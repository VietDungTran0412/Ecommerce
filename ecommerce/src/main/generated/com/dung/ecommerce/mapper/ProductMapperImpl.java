package com.dung.ecommerce.mapper;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.input.ProductInput;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-03T10:33:55+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 19.0.2 (Oracle Corporation)"
)
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toProduct(ProductInput product) {
        if ( product == null ) {
            return null;
        }

        Product product1 = new Product();

        return product1;
    }
}
