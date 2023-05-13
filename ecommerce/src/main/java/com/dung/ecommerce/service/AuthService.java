package com.dung.ecommerce.service;

import com.dung.ecommerce.document.BlackListJwt;
import com.dung.ecommerce.document.User;
import com.dung.ecommerce.enums.Role;
import com.dung.ecommerce.handler.exception.InvalidAgeException;
import com.dung.ecommerce.input.AuthInput;
import com.dung.ecommerce.input.SaveUserInput;
import com.dung.ecommerce.response.AuthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @Transactional(rollbackFor = Exception.class)
    public AuthResponse register(SaveUserInput user, Function<SaveUserInput, User> mapper) {
        log.info("Register user with email: {}", user.getEmail());
        User userToSave = mapper.apply(user);
        Date sixteenYearsAgo = new Date();
        Double age = ((new Date()).getTime() - userToSave.getDateOfBirth().getTime()) / (1000 * 3600 * 24 * 365.25);
        if(age < 16) {
            throw new InvalidAgeException("User must be 16 or above to register!");
        }
        userToSave.setPassword(passwordEncoder.encode(user.getPassword()));
        userToSave.setDateJoined(new Date());
        userToSave.setRole(Role.USER);
        userToSave.setProducts(new HashSet<>());
        User savedUser = userService.save(userToSave);
        String jwt = jwtService.generateToken(savedUser);
        AuthResponse res = AuthResponse.builder().user(savedUser).accessToken(jwt).build();
        log.info("Successfully register with email {}", userToSave.getEmail());
        return res;
    }

    public AuthResponse login(AuthInput loginInput) {
        final User user = userService.findUserByEmail(loginInput.getEmail());
        if(user == null) {
            throw new UsernameNotFoundException("Username not found!");
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(loginInput.getEmail(), loginInput.getPassword()));
        final String jwt = jwtService.generateToken(user);
        return AuthResponse.builder().user(user).accessToken(jwt).build();
    }

    @Transactional(rollbackFor = Exception.class)
    public BlackListJwt logout(String jwt) {
        log.info("Log out from ecommerce with jwt {}", jwt);
        BlackListJwt blackListJwt = new BlackListJwt();
        blackListJwt.setDateJoined(new Date());
        blackListJwt.setJwt(jwt);
        return jwtService.save(blackListJwt);
    }
}
