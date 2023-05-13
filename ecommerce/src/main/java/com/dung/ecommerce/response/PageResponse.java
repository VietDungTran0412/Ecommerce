package com.dung.ecommerce.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class PageResponse {
    private Long totalElements;
    private Integer page;
    private Integer size;
}
