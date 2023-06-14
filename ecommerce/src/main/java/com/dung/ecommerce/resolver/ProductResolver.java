package com.dung.ecommerce.resolver;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.input.PageParams;
import com.dung.ecommerce.input.ProductInput;
import com.dung.ecommerce.mapper.ProductMapper;
import com.dung.ecommerce.response.GetProductsResponse;
import com.dung.ecommerce.response.ProductByIdResponse;
import com.dung.ecommerce.service.ProductService;
import com.example.packagename.types.PriceInput;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.netflix.graphql.dgs.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@Controller
@Slf4j
@RequiredArgsConstructor
@DgsComponent
public class ProductResolver {
    private final HttpServletRequest request;
    private final ProductService productService;

    @PreAuthorize("hasAnyAuthority('USER')")
    @DgsMutation
    public Product createProduct(@InputArgument ProductInput product) {
        String jwt = request.getHeader("Authorization").substring(7);
        log.info("Starting create product with jwt {}", jwt);
        return productService.saveProductByAuth(product, jwt, ProductMapper.INSTANCE::toProduct);
    }

    @PostMapping("/image/{id}")
    public ResponseEntity<String> uploadImage(@RequestBody MultipartFile image, @PathVariable String id) throws IOException {
        if(Optional.ofNullable(image).isPresent()) {
            log.info("Saving Image to ecommerce with id: {}", id);
            productService.uploadImage(id, image);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        log.info("Getting image with id: {}", id);
        Optional<Product> product = productService.findById(id);
        if(!product.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(product.get().getImage().getContent());
    }

    @DgsMutation
    public Product removeProduct(@InputArgument String productId, @InputArgument String userId) {
        log.info("Remove product with id {} and user id {}", productId, userId);

        return productService.removeProduct(productId, userId);
    }

    @DgsMutation
    public String updateScore(@InputArgument Float score, @InputArgument String productId) throws JsonProcessingException {
        log.info("Updating the review score from ecommerce");
        return productService.updateRateScore(score, productId);
    }

    @DgsQuery
    public GetProductsResponse getProducts(@InputArgument PageParams pageable, @InputArgument String name, @InputArgument PriceInput price) {
        Pageable page = PageRequest.of(pageable.getPage(), pageable.getSize());
        log.info("Starting get products from ecommerce apps");
        return productService.getAllProducts(page, price, name);
    }

    @DgsQuery
    public ProductByIdResponse getProductById(@InputArgument String id) {
        log.info("Starting get products by id {} from ecommerce app", id);
        return productService.getDetailsById(id);
    }
}
