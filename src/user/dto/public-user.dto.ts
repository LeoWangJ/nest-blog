import { Exclude, Expose } from 'class-transformer';
import { Roles } from 'src/roles/roles.entity';

export class PublicUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  profile: string;

  @Expose()
  roles: Roles[];
}
