import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('攔截器執行之前');
    return next.handle().pipe(
      map((data) => {
        console.log('攔截器執行之後');

        return data;
      }),
    );
  }
}
