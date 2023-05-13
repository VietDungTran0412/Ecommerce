package com.dung.ecommerce.mapper;

import com.dung.ecommerce.document.User;
import com.dung.ecommerce.input.SaveUserInput;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-03T10:33:55+0700",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 19.0.2 (Oracle Corporation)"
)
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(SaveUserInput user) {
        if ( user == null ) {
            return null;
        }

        User user1 = new User();

        return user1;
    }
}
