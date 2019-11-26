package com.qianqian.exception;


import com.qianqian.errorcode.CommonErrorCode;
import com.qianqian.errorcode.ErrorCode;

/**
 */
public class RestException extends BaseException {

    private static final ErrorCode DEFAULT_CODE = CommonErrorCode.INTERNAL_ERROR;

    private String code = DEFAULT_CODE.getCode();

    //类似Http状态码
    private int httpStatus = DEFAULT_CODE.getStatus();

    public RestException(String code, int httpStatus, String message) {
        super(message);
        this.code = code;
        this.httpStatus = httpStatus;
    }

    public RestException(String message) {
        super(message);
    }

    /**
     * @param errorCode 状态码, 这个字段会在错误信息里返回给客户端.
     * @param message
     */
    public RestException(ErrorCode errorCode, String message) {
        this(errorCode.getCode(), errorCode.getStatus(), message);
    }

    public RestException(ErrorCode errorCode) {
        this(errorCode, errorCode.getMessage());
    }

    public String getCode() {
        return code;
    }

    public int getHttpStatus() {
        return httpStatus;
    }
}
