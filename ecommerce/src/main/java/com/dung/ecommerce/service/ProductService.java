package com.dung.ecommerce.service;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.document.User;
import com.dung.ecommerce.document.attribute.Image;
import com.dung.ecommerce.enums.Category;
import com.dung.ecommerce.handler.exception.InvalidIdException;
import com.dung.ecommerce.handler.exception.NotFoundException;
import com.dung.ecommerce.input.ProductInput;
import com.dung.ecommerce.input.UpdateRateInput;
import com.dung.ecommerce.input.order.OrderedProductInput;
import com.dung.ecommerce.rabbitmq.RabbitConstants;
import com.dung.ecommerce.rabbitmq.RabbitProducer;
import com.dung.ecommerce.repository.ProductRepository;
import com.dung.ecommerce.repository.UserRepository;
import com.dung.ecommerce.response.GetProductsResponse;
import com.dung.ecommerce.response.PageResponse;
import com.dung.ecommerce.response.ProductByIdResponse;
import com.example.packagename.types.PriceInput;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService extends BaseService<String, Product, ProductRepository> {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final ImageService imageService;
    private final RabbitProducer producer;
    protected ProductService(ProductRepository repository, UserService userService, JwtService jwtService,
                             UserRepository userRepository, ImageService imageService, RabbitProducer producer) {
        super(repository);
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.imageService = imageService;
        this.producer = producer;
    }

    public String updateRateScore(Float score, String productId) throws JsonProcessingException {
        Optional<Product> product = findById(productId);
        if(!product.isPresent()) {
            log.error("Product is not found with id {}", productId);
            throw new NotFoundException("Product is not found!");
        }
        UpdateRateInput updateRateInput = UpdateRateInput.builder().score(score).productId(productId).build();
        String message = (new ObjectMapper()).writeValueAsString(
                updateRateInput
        );
        log.info("{}", message);
        producer.send(RabbitConstants.DIRECT_EXCHANGE, RabbitConstants.REVIEWS_ROUTING_KEY , message);
        return "Success";
    }

    public GetProductsResponse getAllProducts(Pageable pageable, PriceInput priceInput, String name) {
        Page<Product> products;
        if(priceInput == null) {
            products = repository.findByNameStartsWith(name, pageable);
        }else {
            products = repository.findByNameStartsWithAndPriceBetween(name, priceInput.getFrom(), priceInput.getTo(), pageable);
        }
        List<Product> productList = products.getContent().stream()
                .sorted((product1, product2) ->
                        Float.compare(product2.getRate().getScore(), product1.getRate().getScore()))
                .collect(Collectors.toList());
        PageResponse pageRes = PageResponse.builder().page(products.getNumber()).size(products.getSize()).totalElements(products.getTotalElements()).build();
        return GetProductsResponse.builder().pagination(pageRes).products(productList).build();
    }
    @Transactional(rollbackFor = Exception.class)
    public Product saveProductByAuth(ProductInput productInput, String jwt, Function<ProductInput, Product> mapper) {
        log.info("Started saving product with jwt {}", jwt);
        final String email = jwtService.extractUsername(jwt);
        User owner = userService.findUserByEmail(email);
        Product product = mapper.apply(productInput);
        product.setDateCreated(new Date());
        product.setUpdateAt(new Date());
        product.setImage(new Image());
        Product savedProduct = repository.save(product);
        owner.getProducts().add(savedProduct);
        userService.save(owner);
        return product;
    }

    @Transactional(rollbackFor = Exception.class)
    public Product uploadImage(String id, MultipartFile image) throws IOException {
        log.info("Started saving image to product {} with {}", id, image.getOriginalFilename());
        Optional<Product> productWrp = repository.findById(id);
        String originFilename = image.getOriginalFilename();
        if(!originFilename.endsWith(".jpeg") && !originFilename.endsWith(".png") && !originFilename.endsWith(".jpg")) {
            log.error("IO exception");
            throw new IOException("Wrong file formats! Required file types: ['jpg', 'png', 'jpeg']");
        }
        if(!productWrp.isPresent()) {
            throw new NotFoundException("No product with id " + id);
        }
        Product product = productWrp.get();
        byte[] thumbnail = imageService.createThumbnail(image,400, 450);
        Image imageToSave = new Image();
        imageToSave.setContent(thumbnail);
        imageToSave.setCaption("Image/content");
        product.setImage(imageToSave);
        log.info("Successfully saving image to product {} with {}", id, image.getOriginalFilename());
        return repository.save(product);
    }

    public ProductByIdResponse getDetailsById(String id) {
        log.info("Getting product details by id {}", id);
        Product product = repository.findById(id).orElse(null);
        if(product == null) {
            throw new NotFoundException("Not found product with id: " + id);
        }
        User owner = userService.findByProduct(product);
        Category category = product.getCategory();
        List<Product> relatedList = repository.findProductByCategory(category)
                .stream()
                .filter(product1 -> product != product1)
                .sorted((product1, product2) -> Float.compare(product2.getRate().getScore(), product1.getRate().getScore())
                )
                .collect(Collectors.toList());
        ProductByIdResponse res = ProductByIdResponse.builder().relatedProducts(relatedList).product(product).owner(owner).build();
        return res;
    }

    public Set<Product> findAllByOrderProducts(List<OrderedProductInput> productIds) {
        Set<String> idSet = productIds.stream().map((product) -> product.getId()).collect(Collectors.toSet());
        Set<Product> products = repository.findAllByIdIn(idSet);
        if(products.size() != idSet.size()) {
            throw new InvalidIdException("Invalid id found!");
        }

        return products;
    }

    @Transactional(rollbackFor = Exception.class)
    public Product removeProduct(String productId, String userId) {
        Optional<User> userWrapper = userService.findById(userId);
        if(!userWrapper.isPresent()) {
            log.error("User not found with id {}", userId);
            throw new NotFoundException("User is not found with valid id");
        }
        Optional<Product> productWrapper = repository.findById(productId);
        if(!productWrapper.isPresent()) {
            log.error("No product with id {}", productId);
            throw new NotFoundException("Product is not found with valid id");
        }
        Product product = productWrapper.get();
        User user = userWrapper.get();
        Set<Product> products = user.getProducts();
        boolean isContains = false;
        Product deletedProduct = null;
        for(Product product1 : products) {
            if(product1.getId().equals(product.getId())) {
                isContains = true;
                deletedProduct = product1;
            }
        }
        if(!isContains) {
            log.error("Not found any valid product with id {} belongs to this user {}", productId, userId);
            throw new NotFoundException("Not found any valid product belongs to this user");
        }
        user.getProducts().remove(deletedProduct);
        userService.save(user);
        repository.delete(product);
        return product;
    }
}
