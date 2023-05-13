package com.dung.ecommerce.document.attribute;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Rate {
    @Builder.Default
    private Long numOfRate = 0L;
    @Builder.Default
    private Float score = 0F;
}
