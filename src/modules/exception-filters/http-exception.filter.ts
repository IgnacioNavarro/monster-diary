// global-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? parseException(exception)
    : String(exception);
};

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const statusCode = getStatusCode<T>(exception);
    const message = getErrorMessage<T>(exception);

    response.status(statusCode).json({
      error: {
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode,
        message,
      },
    });
  }
}

function parseException(exception){
  const result = exception["response"]["message"];
  if(result){
    try{
      return result[0]["constraints"];
  }
  catch(e){
    return result;
  }
  }
  return exception;
}