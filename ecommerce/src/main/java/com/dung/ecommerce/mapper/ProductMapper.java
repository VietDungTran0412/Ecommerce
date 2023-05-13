package com.dung.ecommerce.mapper;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.document.attribute.Image;
import com.dung.ecommerce.document.attribute.Rate;
import com.dung.ecommerce.input.ProductInput;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.Date;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    default Product toProduct(ProductInput product) {
        if(product == null) {
            return null;
        }
        Product product1 = new Product();
        product1.setRate(Rate.builder().score(0F).numOfRate(0L).build());
        product1.setUpdateAt(new Date());
        product1.setCategory(product.getCategory());
        product1.setName(product.getName());
        product1.setAddress(product.getAddress());
        product1.setDateCreated(new Date());
        product1.setLongDescription(product.getLongDescription());
        product1.setShortDescription(product.getShortDescription());
        product1.setImage(new Image());
        product1.setEmail(product.getEmail());
        product1.setPhone(product.getPhone());
        product1.setQuantity(product.getQuantity());
        product1.setPrice(product.getPrice());
        return product1;
    }
}
