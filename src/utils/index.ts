import { UseFilters } from '@nestjs/common';
import { TypeormFilter } from 'src/filters/typeorm.filter';

export function TypeOrmDecorator() {
  return UseFilters(new TypeormFilter());
}
