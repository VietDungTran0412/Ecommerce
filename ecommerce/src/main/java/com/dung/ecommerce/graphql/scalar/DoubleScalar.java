package com.dung.ecommerce.graphql.scalar;

import com.netflix.graphql.dgs.DgsScalar;
import graphql.language.FloatValue;
import graphql.language.StringValue;
import graphql.schema.*;
import org.jetbrains.annotations.NotNull;

@DgsScalar(name = "Double")
public class DoubleScalar implements Coercing<Double, Double> {

    @Override
    public Double serialize(Object input) throws CoercingSerializeException {
        if (input instanceof Double) {
            return (Double) input;
        } else {
            try {
                Double output = Double.valueOf(input.toString());
                return output;
            }catch (Exception e) {
                throw new CoercingSerializeException("Not valid double");
            }
        }
    }

    @Override
    public Double parseValue(Object input) throws CoercingParseValueException {
        Double output = Double.parseDouble(input.toString());
        return output;
    }

    @Override
    public Double parseLiteral(Object input) throws CoercingParseLiteralException {
        if (input instanceof StringValue) {
            return Double.valueOf(String.valueOf(input));
        }
        throw new CoercingParseLiteralException("Value is not double!");
    }

}