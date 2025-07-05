import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveSensitiveFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.removeSensitiveFields(data);
      }),
    );
  }

  private removeSensitiveFields(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveFields(item));
    }

    if (typeof data === 'object') {
      const result = { ...data };

      delete result.__v;
      delete result.refreshToken;
      delete result.password;

      if (data.toObject && typeof data.toObject === 'function') {
        const plainObject = data.toObject();
        delete plainObject.__v;
        delete plainObject.refreshToken;
        delete plainObject.password;

        if (plainObject._id) {

          if (Buffer.isBuffer(plainObject._id)) {
            plainObject._id = plainObject._id.toString('hex');
          else if (typeof plainObject._id.toString === 'function') {
            plainObject._id = plainObject._id.toString();
          }
        }

        return plainObject;
      }

      if (result._id) {
        if (Buffer.isBuffer(result._id)) {
          result._id = result._id.toString('hex');
        }
        else if (typeof result._id.toString === 'function') {
          result._id = result._id.toString();
        }
      }

      for (const key in result) {
        if (result[key] && typeof result[key] === 'object') {
          result[key] = this.removeSensitiveFields(result[key]);
        }
      }

      return result;
    }

    return data;
  }
}}
