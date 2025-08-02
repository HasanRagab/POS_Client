/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductVariantOptionDto } from './ProductVariantOptionDto';
export type UpdateProductVariantDto = {
    name?: string;
    sku?: string;
    barcode?: string;
    price?: number;
    imageUrl?: string;
    options?: Array<ProductVariantOptionDto>;
    trackInventory?: boolean;
    attributes?: Record<string, any>;
};

