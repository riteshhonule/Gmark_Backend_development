import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RequiredFieldsPipe implements PipeTransform {
  constructor(private readonly fields: string[]) {}

  transform(value: any) {
    for (const field of this.fields) {
      if (!value[field]) {
        throw new BadRequestException(`${field} is required`);
      }
    }
    return value;
  }
}
