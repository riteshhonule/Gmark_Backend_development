import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class LowercaseEmailPipe implements PipeTransform {
    transform(value: any) {
        if (value?.email) {
            value.email = value.email.toLowerCase();
        }
        return value;
    }
}
