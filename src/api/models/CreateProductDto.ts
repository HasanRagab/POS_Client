/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleItemDto } from './BundleItemDto';
import type { DiscountDto } from './DiscountDto';
import type { ProductLocationPricingDto } from './ProductLocationPricingDto';
export type CreateProductDto = {
    name: string;
    /**
     * Auto-generated slug from name (can be overridden)
     */
    slug?: string;
    sku?: string;
    barcode?: string;
    kind: CreateProductDto.kind;
    price: number;
    trackInventory?: boolean;
    isBundle?: boolean;
    bundlePrice?: number;
    unitId?: string;
    imageUrl?: string;
    barcodeType?: string;
    categoryId?: string;
    taxIds?: Array<string>;
    discounts?: Array<DiscountDto>;
    bundleItems?: Array<BundleItemDto>;
    locationPricing?: Array<ProductLocationPricingDto>;
    attributes?: Record<string, any>;
};
export namespace CreateProductDto {
    export enum kind {
        PHYSICAL = 'PHYSICAL',
        SERVICE = 'SERVICE',
        DIGITAL = 'DIGITAL',
        PACKAGE = 'PACKAGE',
    }
}

