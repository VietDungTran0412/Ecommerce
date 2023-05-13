package com.dung.ecommerce.graphql;

import com.dung.ecommerce.graphql.scalar.DoubleScalar;
import com.netflix.graphql.dgs.DgsRuntimeWiring;
import graphql.Scalars;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import graphql.schema.idl.RuntimeWiring;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class GraphqlConfig {

    @DgsRuntimeWiring
    public RuntimeWiring.Builder addDouble(RuntimeWiring.Builder builder) {
        return builder
                .scalar(GraphQLScalarType.newScalar()
                .name("Double")
                .coercing(new DoubleScalar())
                .build());
    }

    @DgsRuntimeWiring
    public RuntimeWiring.Builder addLong(RuntimeWiring.Builder builder) {
        return builder
                .scalar(Scalars.GraphQLFloat);

    }
}
