/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from './CreateProductDto';
export type BulkProductImportDto = {
    products: Array<CreateProductDto>;
    skipDuplicates?: boolean;
    updateExisting?: boolean;
};

