import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const contentType = req.headers['content-type'];
    if (!contentType.includes('multipart/form-data')) {
      throw new BadRequestException('Invalid multipart content type');
    }

    return next.handle();
  }
}
