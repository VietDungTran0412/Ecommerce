//package com.dung.ecommerce.handler;
//
//import com.dung.ecommerce.handler.exception.InvalidAgeException;
//import com.dung.ecommerce.handler.exception.InvalidIdException;
//import com.dung.ecommerce.handler.exception.NotFoundException;
//import com.dung.ecommerce.handler.exception.PaymentException;
//import graphql.GraphQLError;
//import graphql.GraphqlErrorBuilder;
//import graphql.schema.DataFetchingEnvironment;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import javax.validation.ConstraintViolationException;
//
//@Component
//public class GraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {
//    @Override
//    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
//        if(ex instanceof ConstraintViolationException) {
//            return GraphqlErrorBuilder.newError().errorType(ErrorType.BAD_REQUEST)
//                    .message("Bad Request - " + ex.getMessage())
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation()).build();
//        }
//        if(ex instanceof NotFoundException) {
//            return GraphqlErrorBuilder.newError().message(ex.getMessage())
//                    .errorType(ErrorType.NOT_FOUND)
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation())
//                    .build();
//        }
//        if(ex instanceof UsernameNotFoundException) {
//            return GraphqlErrorBuilder.newError().message(ex.getMessage())
//                    .errorType(ErrorType.NOT_FOUND)
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation())
//                    .build();
//        }
//        if(ex instanceof InvalidAgeException) {
//            return GraphqlErrorBuilder.newError().message(ex.getMessage())
//                    .errorType(ErrorType.BAD_REQUEST)
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation())
//                    .build();
//        }
//        if(ex instanceof InvalidIdException) {
//            return GraphqlErrorBuilder.newError().message(ex.getMessage())
//                    .errorType(ErrorType.NOT_FOUND)
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation())
//                    .build();
//        }
//        if(ex instanceof PaymentException) {
//            return GraphqlErrorBuilder.newError().message(ex.getMessage())
//                    .errorType(ErrorType.INTERNAL_ERROR)
//                    .path(env.getExecutionStepInfo().getPath())
//                    .location(env.getField().getSourceLocation())
//                    .build();
//        }
//        return GraphqlErrorBuilder.newError().errorType(ErrorType.INTERNAL_ERROR)
//                .message("Unexpected Error: " + ex.getMessage())
//                .path(env.getExecutionStepInfo().getPath())
//                .location(env.getField().getSourceLocation()).build();
//    }
//}
