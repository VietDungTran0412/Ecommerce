package com.dung.ecommerce.document;

import com.dung.ecommerce.document.attribute.Contact;
import com.dung.ecommerce.enums.PaymentStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Setter
@Getter
@Data
@Document(collection = "payment")
public class Payment {
    @Id
    private String id;
    private PaymentStatus status;
    private Double value;
    private Contact contact;
}
