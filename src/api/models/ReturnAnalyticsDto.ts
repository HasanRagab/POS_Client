/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReturnByLocationDto } from './ReturnByLocationDto';
import type { ReturnByProductDto } from './ReturnByProductDto';
import type { ReturnChangeDto } from './ReturnChangeDto';
import type { ReturnReasonDto } from './ReturnReasonDto';
import type { ReturnTimelineDto } from './ReturnTimelineDto';
export type ReturnAnalyticsDto = {
    totalReturns: number;
    totalRefundAmount: number;
    returnRate: number;
    averageRefundAmount: number;
    averageProcessingTime: number;
    changeFromPrevious: ReturnChangeDto;
    returnReasons: Array<ReturnReasonDto>;
    returnsByProduct: Array<ReturnByProductDto>;
    returnTimeline: Array<ReturnTimelineDto>;
    returnsByLocation: Array<ReturnByLocationDto>;
};

