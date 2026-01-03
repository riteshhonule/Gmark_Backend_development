import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TrimStringPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (typeof value[key] === 'string') {
          value[key] = value[key].trim();
        }
      }
    }

    return value;
  }
}
