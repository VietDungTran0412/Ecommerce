package com.dung.ecommerce.mapper;

import com.dung.ecommerce.document.Order;
import com.dung.ecommerce.document.Payment;
import com.dung.ecommerce.document.attribute.Contact;
import com.dung.ecommerce.enums.OrderStatus;
import com.dung.ecommerce.enums.PaymentStatus;
import com.dung.ecommerce.input.order.ContactInput;
import com.dung.ecommerce.input.order.OrderInput;
import com.dung.ecommerce.input.order.PaymentInput;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.function.Function;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    default Order toOrder(OrderInput orderInput){
        Order order = new Order();
        Contact contact = toContact(orderInput.getContact());
        Payment payment = toPayment(orderInput.getPayment());
        order.setContact(contact);
        order.setPayment(payment);
        order.setStatus(OrderStatus.PENDING);
        order.setDateJoined(new Date());
        return order;
    }

    default Contact toContact(ContactInput input) {
        if(input == null) {
            return null;
        }
        Contact contact = new Contact();
        contact.setCity(input.getCity());
        contact.setEmail(input.getEmail());
        contact.setFirstname(input.getFirstname());
        contact.setLastname(input.getLastname());
        contact.setAddress1(input.getAddress1());
        contact.setAddress2(input.getAddress2());
        contact.setZipCode(input.getZipCode());
        contact.setState(input.getState());
        contact.setPhone(input.getPhone());
        return contact;
    }

    default Payment toPayment(PaymentInput input) {
        Payment payment = new Payment();
        payment.setContact(toContact(input.getPaymentContact()));
        payment.setStatus(PaymentStatus.UNPAID);
        return payment;
    }
}
