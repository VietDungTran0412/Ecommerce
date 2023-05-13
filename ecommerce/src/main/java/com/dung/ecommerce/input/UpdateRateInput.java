package com.dung.ecommerce.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

//@Data
@Builder
@Getter
public class UpdateRateInput {
    @JsonProperty("productId")
    private String productId;
    @JsonProperty("score")
    private Float score;
}
