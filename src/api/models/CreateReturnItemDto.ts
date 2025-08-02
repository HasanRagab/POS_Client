/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateReturnItemDto = {
    saleItemId: string;
    quantity: number;
    reason: CreateReturnItemDto.reason;
    restockable?: boolean;
    notes?: string;
};
export namespace CreateReturnItemDto {
    export enum reason {
        DAMAGED = 'DAMAGED',
        CUSTOMER_REQUEST = 'CUSTOMER_REQUEST',
        WRONG_ITEM = 'WRONG_ITEM',
        OTHER = 'OTHER',
    }
}

