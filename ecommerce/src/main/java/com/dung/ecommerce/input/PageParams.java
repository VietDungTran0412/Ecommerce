package com.dung.ecommerce.input;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PageParams {
    private Integer page;
    private Integer size;
}
