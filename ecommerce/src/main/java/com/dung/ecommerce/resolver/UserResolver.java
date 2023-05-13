package com.dung.ecommerce.resolver;

import com.dung.ecommerce.document.User;
import com.dung.ecommerce.input.PageParams;
import com.dung.ecommerce.service.UserService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@Slf4j
@DgsComponent
public class  UserResolver {
    private final UserService userService;
    private final HttpServletRequest request;
    @DgsQuery
    public Iterable<User> getUsers(@InputArgument PageParams pageable) {
        log.info("Starting getting products from ecommerce");
        Pageable page = PageRequest.of(pageable.getPage(), pageable.getSize());
        return userService.findAll(page).getContent();
    }

    @Secured("USER")
    @DgsQuery
    public User getPersonalDetails() {
        String accessToken = request.getHeader("Authorization").substring(7);
        log.info("Starting get auth user information");
        return userService.findByAccessToken(accessToken);
    }
}
