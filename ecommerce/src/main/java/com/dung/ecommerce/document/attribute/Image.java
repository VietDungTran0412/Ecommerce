package com.dung.ecommerce.document.attribute;

import lombok.Data;

@Data
public class Image {
    private String caption;
    private String url;
    private byte[] content;
}
