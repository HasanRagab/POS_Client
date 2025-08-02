/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductSearchDto = {
    search?: string;
    categoryId?: string;
    kind?: ProductSearchDto.kind;
    minPrice?: number;
    maxPrice?: number;
    trackInventory?: boolean;
    isBundle?: boolean;
    hasVariants?: boolean;
    locationId?: string;
    taxIds?: Array<string>;
    sortBy?: ProductSearchDto.sortBy;
    sortOrder?: ProductSearchDto.sortOrder;
    page?: number;
    limit?: number;
};
export namespace ProductSearchDto {
    export enum kind {
        PHYSICAL = 'PHYSICAL',
        SERVICE = 'SERVICE',
        DIGITAL = 'DIGITAL',
        PACKAGE = 'PACKAGE',
    }
    export enum sortBy {
        NAME = 'name',
        PRICE = 'price',
        CREATED_AT = 'createdAt',
        UPDATED_AT = 'updatedAt',
        SKU = 'sku',
    }
    export enum sortOrder {
        ASC = 'asc',
        DESC = 'desc',
    }
}

