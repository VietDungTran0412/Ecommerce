package com.dung.ecommerce.resolver;

import com.dung.ecommerce.service.SmtpService;
import com.dung.ecommerce.validation.Email;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;

@DgsComponent
@RequiredArgsConstructor
@Slf4j
public class SmtpResolver {
    private final SmtpService smtpService;
    @DgsQuery(field = "sendEmail")
    public String sendMail(@InputArgument String to) {
        if(to == null) {
            smtpService.send("asdasd", "asdasdasd", "<h2>asdads</h2>" ,"asdasdasd");
        }
        return "Success";
    }

    @DgsMutation
    public String subscribe(@InputArgument @Valid @Email String email) {
        log.info("Subscribing to ecommerce with email {}", email);
        return smtpService.sendSubscribeEmail(email);
    }
}
