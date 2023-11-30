package com.dung.ecommerce.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/public/api/healthcheck")
@Slf4j
public class HealthCheckController {
    @GetMapping
    public ResponseEntity<String> healthcheck() throws UnknownHostException {
        log.info("Health check succeed!");
        InetAddress localhost = InetAddress.getLocalHost();
        String ipAddr = localhost.getHostAddress();
        String res = "Health check passed for host address: " + ipAddr;
        return ResponseEntity.ok(res);
    }
}
