/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TrendDto = {
    metric: string;
    trend: TrendDto.trend;
    changePercentage: number;
    significance: TrendDto.significance;
};
export namespace TrendDto {
    export enum trend {
        UP = 'up',
        DOWN = 'down',
        STABLE = 'stable',
    }
    export enum significance {
        HIGH = 'high',
        MEDIUM = 'medium',
        LOW = 'low',
    }
}

