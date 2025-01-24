import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  //criando cstrutor para injetar dependencia
  constructor(private readonly jwtservice: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    //verificando se o token existe
    if (!authorization) {
      throw new  UnauthorizedException('token is required');
    }

    //verificar a autorizacao
    try {
      const payload = await this.jwtservice.verify(authorization, {
        secret: process.env.SECRET_KEY,
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('token is invalid');  
    }
    return true;
  }


  //function para extrair o token do headder
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
