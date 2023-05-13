package com.dung.ecommerce.response;

import com.dung.ecommerce.document.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse{
    private String accessToken;
    private User user;
}
