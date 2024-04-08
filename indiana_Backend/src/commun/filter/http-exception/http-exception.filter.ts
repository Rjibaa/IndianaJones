/**
 * Global HTTP exception filter for handling HTTP exceptions in the Nest.js application.
 * This filter catches HTTP exceptions and transforms them into a standardized JSON response.
 * It extracts the status code and message from the exception and returns them in the response.
 * If the exception is not of type HttpException, it converts it to a string.
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export const getErrorMessage = <T extends Error>(exception: T): string => {
  return exception instanceof HttpException
    ? exception.message
    : String(exception);
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();
    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : errorResponse['message'];

    response.status(status).json({
      statusCode: status,
      message: message,
      data: {},
    });
  }
}
