package com.dung.ecommerce.document;

import com.dung.ecommerce.document.attribute.Image;
import com.dung.ecommerce.document.attribute.Rate;
import com.dung.ecommerce.enums.Category;
import com.querydsl.core.annotations.QueryEntity;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Document(collection = "product", value = "product")
//@QueryEntity
public class Product {
    @Id
    private String id;
    private String name;
    private String phone;
    private String email;
    private String address;
    @Indexed(direction = IndexDirection.DESCENDING)
    private Date dateCreated;
    @NotNull
    private Category category;
    @NotNull
    @Indexed(direction = IndexDirection.ASCENDING)
    private Double price;
    @NotNull
    private String shortDescription;
    private String longDescription;
    @Indexed(direction = IndexDirection.ASCENDING)
    private Integer quantity;
    private Image image;
    private Date updateAt;
    private Rate rate;

}
