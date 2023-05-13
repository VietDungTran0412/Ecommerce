package com.dung.ecommerce.document;

import com.dung.ecommerce.document.attribute.Contact;
import com.dung.ecommerce.enums.OrderStatus;
import com.mongodb.lang.Nullable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Setter
@Getter
@Document(collection = "order")
public class Order {
    @Id
    private String id;
    private Date dateJoined;
    private Payment payment;
    @DBRef
    @Nullable
    private User user;
    @DBRef
    private List<Product> orderedProducts;
    private Date shippingDate;
    private Contact contact;
    private OrderStatus status;
}
