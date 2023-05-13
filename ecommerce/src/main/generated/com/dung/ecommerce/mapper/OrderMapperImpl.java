package com.dung.ecommerce.mapper;

import com.dung.ecommerce.document.attribute.Contact;
import com.dung.ecommerce.input.order.ContactInput;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-03T10:33:55+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 19.0.2 (Oracle Corporation)"
)
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Contact toContact(ContactInput input) {
        if ( input == null ) {
            return null;
        }

        Contact contact = new Contact();

        return contact;
    }
}
