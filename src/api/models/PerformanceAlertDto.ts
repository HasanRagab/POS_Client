/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PerformanceAlertDto = {
    type: PerformanceAlertDto.type;
    severity: PerformanceAlertDto.severity;
    message: string;
    actionRequired: boolean;
};
export namespace PerformanceAlertDto {
    export enum type {
        PERFORMANCE = 'performance',
        OPERATIONAL = 'operational',
        FINANCIAL = 'financial',
    }
    export enum severity {
        CRITICAL = 'critical',
        WARNING = 'warning',
        INFO = 'info',
    }
}

