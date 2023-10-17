package com.esercitazioni.primaesercitazione.exceptions;

public class GenericServiceException extends RuntimeException {
    public GenericServiceException(String errorMessage) {
        super(errorMessage);
    }
    public GenericServiceException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
