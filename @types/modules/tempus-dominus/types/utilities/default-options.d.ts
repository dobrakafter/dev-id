import Options from './options';
declare const DefaultOptions: Options;
export default DefaultOptions;
export declare const DefaultEnLocalization: {
    clear?: string;
    close?: string;
    dayViewHeaderFormat?: import("../datetime").DateTimeFormatOptions;
    decrementHour?: string;
    decrementMinute?: string;
    decrementSecond?: string;
    incrementHour?: string;
    incrementMinute?: string;
    incrementSecond?: string;
    nextCentury?: string;
    nextDecade?: string;
    nextMonth?: string;
    nextYear?: string;
    pickHour?: string;
    pickMinute?: string;
    pickSecond?: string;
    previousCentury?: string;
    previousDecade?: string;
    previousMonth?: string;
    previousYear?: string;
    selectDate?: string;
    selectDecade?: string;
    selectMonth?: string;
    selectTime?: string;
    selectYear?: string;
    startOfTheWeek?: number;
    today?: string;
    toggleMeridiem?: string;
    dateFormats?: {
        L?: string;
        LL?: string;
        LLL?: string;
        LLLL?: string;
        LT?: string;
        LTS?: string;
    };
    format?: string;
    hourCycle?: Intl.LocaleHourCycleKey;
    locale?: string;
    ordinal?: (n: number) => any;
};