import { PipeTransform } from '@nestjs/common';
export declare class PositiveNumberPipe implements PipeTransform {
    transform(value: number): number;
}
