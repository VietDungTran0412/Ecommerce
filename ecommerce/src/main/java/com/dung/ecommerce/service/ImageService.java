package com.dung.ecommerce.service;

import lombok.AllArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@AllArgsConstructor
public class ImageService {
    public byte[] createThumbnail(MultipartFile original, int width, int height) throws IOException {
        if(!original.getOriginalFilename().endsWith(".png") && !original.getOriginalFilename().endsWith(".jpg") && !original.getOriginalFilename().endsWith(".jpeg")) {
            throw new RuntimeException("Wrong file format!");
        }
        byte[] imageByte = original.getBytes();
        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageByte));
        BufferedImage resizedImg = Scalr.resize(img, Scalr.Method.QUALITY, width, height);
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        ImageIO.write(resizedImg,"png", output);
        return output.toByteArray();
    }
    public InputStream resizeImage(MultipartFile file, int width, int height) throws IOException {
        BufferedImage resizedImage = Thumbnails.of(file.getInputStream())
                .size(width, height)
                .outputFormat("jpeg") // Choose the desired output format
                .asBufferedImage();
        InputStream inputStream = imageToInputStream(resizedImage);
        return inputStream;
    }
    private InputStream imageToInputStream(BufferedImage image) throws IOException {
        // Convert BufferedImage to InputStream
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(image, "jpeg", os);
        return new ByteArrayInputStream(os.toByteArray());
    }
}
