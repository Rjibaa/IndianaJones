/**
 * Global interceptor for transforming response objects in the Nest.js application.
 * This interceptor is responsible for transforming the response to a standardized format.
 * It extracts the status code from the response and constructs a new response object
 * with statusCode, message, and data fields.
 * The message is extracted from the original response data, and the result is nested under the data field.
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: {};
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        data: {
          result: data.result,
        },
      })),
    );
  }
}
