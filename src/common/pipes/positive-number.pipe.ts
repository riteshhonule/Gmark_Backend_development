import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  transform(value: number) {
    if (value <= 0) {
      throw new BadRequestException('Value must be a positive number');
    }
    return value;
  }
}
