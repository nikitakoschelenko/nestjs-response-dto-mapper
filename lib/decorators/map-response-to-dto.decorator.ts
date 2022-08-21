import {
  ClassSerializerInterceptor,
  SerializeOptions,
  Type,
  UseInterceptors,
  applyDecorators
} from '@nestjs/common';
import { ApiOkResponse, ApiResponseOptions } from '@nestjs/swagger';

import { WrapToClassInterceptor } from '../interceptors/wrap-to-class.interceptor';

export const MapResponseToDto = (
  type: Type<any>,
  options?: ApiResponseOptions
) =>
  applyDecorators(
    UseInterceptors(ClassSerializerInterceptor, WrapToClassInterceptor(type)),
    ApiOkResponse({ type, ...options }),
    SerializeOptions({ excludeExtraneousValues: true })
  );
