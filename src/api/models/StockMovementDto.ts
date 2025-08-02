/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StockMovementDto = {
    date: string;
    type: StockMovementDto.type;
    quantity: number;
    value: number;
};
export namespace StockMovementDto {
    export enum type {
        IN = 'in',
        OUT = 'out',
        ADJUSTMENT = 'adjustment',
    }
}

