import { PipeTransform } from '@nestjs/common';
export declare class RequiredFieldsPipe implements PipeTransform {
    private readonly fields;
    constructor(fields: string[]);
    transform(value: any): any;
}
