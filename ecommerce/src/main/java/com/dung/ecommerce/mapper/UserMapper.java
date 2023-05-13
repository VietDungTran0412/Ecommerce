package com.dung.ecommerce.mapper;

import com.dung.ecommerce.enums.Role;
import com.dung.ecommerce.input.SaveUserInput;
import com.dung.ecommerce.document.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    default User toUser(SaveUserInput user) {
        if ( user == null ) {
            return null;
        }

        User user1 = new User();

        try {
            if ( user.getDateOfBirth() != null ) {
                user1.setDateOfBirth( new SimpleDateFormat( "dd/MM/yyyy" ).parse( user.getDateOfBirth() ) );
            }
        }
        catch ( ParseException e ) {
            throw new RuntimeException( e );
        }
        user1.setFirstname( user.getFirstname() );
        user1.setLastname( user.getLastname() );
        user1.setEmail( user.getEmail() );
        user1.setPassword( user.getPassword() );
        user1.setGender( user.getGender() );
        user1.setProducts(new HashSet<>());
        user1.setDateJoined(new Date());
        user1.setRole(Role.USER);
        return user1;
    }



}
