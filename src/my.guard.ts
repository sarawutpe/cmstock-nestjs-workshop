import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return true
    // ex
    // const request = context.switchToHttp().getRequest();
    // if (request.query.token === '1234') {
    //   return true
    // }
    // return false;
  }
}
