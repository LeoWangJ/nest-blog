import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Roles } from 'src/roles/roles.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `名稱長度必須在 $constraint1 到 $constraint2 之間`,
  })
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `密碼長度必須在 $constraint1 到 $constraint2 之間`,
  })
  password: string;
  roles?: Roles[] | number[];
}
