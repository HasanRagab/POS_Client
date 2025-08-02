/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTaxDto = {
    name: string;
    /**
     * Tax rate as a percentage
     */
    rate: number;
    /**
     * Whether the tax is included in the product price
     */
    isInclusive?: boolean;
};

