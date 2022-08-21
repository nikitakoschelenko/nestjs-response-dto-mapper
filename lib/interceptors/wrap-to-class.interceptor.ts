import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  mixin
} from '@nestjs/common';
import { map } from 'rxjs';

export const WrapToClassInterceptor = (
  type: Type<any>
): Type<NestInterceptor> => {
  class MixinInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
      return next
        .handle()
        .pipe(
          map((value) =>
            value && typeof value === 'object'
              ? Array.isArray(value)
                ? value.map((element) => this.wrap(element))
                : this.wrap(value)
              : value
          )
        );
    }

    wrap(value: object) {
      return Object.assign(new type(), value);
    }
  }

  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
};
