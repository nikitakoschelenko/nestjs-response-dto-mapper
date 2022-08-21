<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

## NestJS Response DTO Mapper
👀 Response to DTO mapper for NestJS and Swagger with class-transformer

### Installation
```
yarn add nestjs-response-dto-mapper
```

### Usage
1. Create a DTO class using at least one `class-transformer` decorator for each field:
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty({ description: 'ID' }) // or you can use `@nestjs/swagger` CLI plugin
  id: number;

  @Expose()
  @ApiProperty({ description: 'First name' })
  firstName: string;

  @Expose()
  @ApiProperty({ description: 'Last name' })
  lastName: string;

  @Expose()
  @ApiProperty({ description: 'Email' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Phone number' })
  phone: string;
}
```

2. Decorate each controller method with the `MapResponseToDto` decorator:
```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MapResponseToDto } from 'nestjs-response-dto-mapper';
import { User as UserModel } from '@prisma/client'; // for example

import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  @Get()
  @ApiOperation({ summary: 'List all users' }) // or you can use @nestjs/swagger CLI plugin
  @MapResponseToDto(UserDto, { /* ApiOkResponse decorator options */ isArray: true })
  findMany(): UserModel[] {
    // for example
    return [
      {
        id: 1,
        firstName: 'Example',
        lastName: 'Example',
        email: 'example@example.com',
        phone: '+99999999999',
        password: '$2y$10$gN9UIb8EjkhNWxu8iRJQOe/kAk1TqhtJ1M72DKx.BrpgyAe7XURhq',
        rights: 'user'
      },
      {
        id: 2,
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@example.com',
        phone: '+88888888888',
        password: '$2y$10$Mrh1URLy.Fo8tmBZtaPd5OR.1gDaPvU7GX02./uK9kKz.Skoc2C5y',
        rights: 'user'
      },
       {
        id: 3,
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@example.com',
        phone: '+88005553535',
        password: '$2y$10$qi8oDsLM88XMw4ZStIE7pOG6yZNceqDTVOp0ajLIOk2ttyIcPF9r.',
        rights: 'admin'
      }
    ]
  }
}
```

3. Run and test it!
Swagger schema:
[image]()

Response:
```json
[
  {
    "id": 1,
    "firstName": "Example",
    "lastName": "Example",
    "email": "example@example.com",
    "phone": "99999999999"
  },
  {
    "id": 2,
    "firstName": "Test",
    "lastName": "Test",
    "email": "test@example.com",
    "phone": "+88888888888"
  },
    {
    "id": 3,
    "firstName": "Admin",
    "lastName": "Admin",
    "email": "admin@example.com",
    "phone": "+88005553535"
  }
]
```

## Troubleshooting
> I use the @nestjs/swagger CLI Plugin and my method returns an array of objects, but the swagger does not display the method summary and response schema
Try casting the return value to the dto type:
```typescript
// controller...
findMany(): UserDto[] {
  // findMany returns UserModel[]
  return this.userService.findMany() as UserDto[];
}
```

## License
[MIT](https://github.com/ItzNeviKat/nestjs-response-dto-mapper/blob/main/LICENSE)
