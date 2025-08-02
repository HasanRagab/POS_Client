/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCategoryDto = {
    /**
     * Category name
     */
    name: string;
    /**
     * Category slug (auto-generated if not provided)
     */
    slug?: string;
    /**
     * Parent category ID for hierarchical structure
     */
    parentId?: string;
};

