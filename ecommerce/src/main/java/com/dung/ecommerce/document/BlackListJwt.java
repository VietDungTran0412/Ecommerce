package com.dung.ecommerce.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class BlackListJwt {
    @Id
    private String id;
    @Indexed(direction = IndexDirection.DESCENDING)
    private Date dateJoined;

    @Indexed(unique = true)
    private String jwt;
}
