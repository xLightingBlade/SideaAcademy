package com.esercitazioni.primaesercitazionemeglio.validators;

import com.esercitazioni.primaesercitazionemeglio.exceptions.GenericServiceException;
import org.springframework.stereotype.Component;

@Component
public class OrderByValidator {
    public void validateOrderByParameter(String orderBy) {
        if(!"id".equals(orderBy) && !"name".equals(orderBy))
            throw new GenericServiceException("Insert a valid sorting parameter, such as 'id' or 'name'");
    }

    public void validateBooksOrderByParameter(String orderBy) {
        if(!"id".equals(orderBy) && !"title".equals(orderBy))
            throw new GenericServiceException("Insert a valid sorting parameter");
    }
}
