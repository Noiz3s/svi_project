import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Реализуйте вашу логику проверки авторизации здесь
    const client = context.switchToWs().getClient();
    // Пример: проверка токена доступа или другой информации о клиенте
    const isAuthenticated = client.isAuthenticated();
    return isAuthenticated; // Возвращает true, если клиент аутентифицирован
  }
}
