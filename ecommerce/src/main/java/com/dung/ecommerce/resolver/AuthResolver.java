package com.dung.ecommerce.resolver;

import com.dung.ecommerce.document.BlackListJwt;
import com.dung.ecommerce.input.AuthInput;
import com.dung.ecommerce.input.SaveUserInput;
import com.dung.ecommerce.mapper.UserMapper;
import com.dung.ecommerce.response.AuthResponse;
import com.dung.ecommerce.service.AuthService;
import com.dung.ecommerce.service.JwtService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;

@DgsComponent
@Slf4j
@RequiredArgsConstructor
public class AuthResolver {
    private final AuthService authService;
    private final HttpServletRequest httpServletRequest;
    private final JwtService jwtService;
    @DgsMutation
    public AuthResponse register(@Valid @InputArgument SaveUserInput user) {
        log.info("Starting registering user at {}", new Date());
        return authService.register(user, UserMapper.INSTANCE::toUser);
    }
    @DgsQuery
    public AuthResponse login(@InputArgument AuthInput loginRequest) {
        log.info("Request to log in ecommerce application with email {}", loginRequest.getEmail());
        return authService.login(loginRequest);
    }

    @DgsMutation
    @PreAuthorize("hasAnyAuthority('USER')")
    public BlackListJwt logout() {
        log.info("Log out");
        String jwt = httpServletRequest.getHeader("Authorization").substring(7);
        return authService.logout(jwt);
    }

}
