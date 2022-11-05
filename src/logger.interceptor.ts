import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...')
    // const now = Date.now()
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))

    return next.handle().pipe(map(data => ({ data })))
  }
}
