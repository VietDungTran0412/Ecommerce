package com.dung.ecommerce.service;

import com.dung.ecommerce.document.BlackListJwt;
import com.dung.ecommerce.repository.BlackListJwtRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService extends BaseService<String, BlackListJwt, BlackListJwtRepository> {
    private final static String SECRET_KEY = "2B4B6250655368566D597133743677397A244226452948404D635166546A576E";

    protected JwtService(BlackListJwtRepository repository) {
        super(repository);
    }

    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails){

        return Jwts
                .builder()
                .setClaims(extractClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }


    public boolean isTokenValid(String accessToken, UserDetails userDetails) {
        final String username = extractUsername(accessToken);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(accessToken) && !repository.existsBlackListJwtByJwt(accessToken);
    }

    public String extractUsername(String accessToken) {
        return extractClaim(accessToken, Claims::getSubject);
    }

    private boolean isTokenExpired(String accessToken) {
        return extractExpiration(accessToken).before(new Date());
    }
    public Date extractExpiration(String accessToken) {
        return extractClaim(accessToken, Claims::getExpiration);
    }

    public <T> T extractClaim(String accessToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(accessToken);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String accessToken) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(accessToken).getBody();
    }
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
