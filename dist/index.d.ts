import { BigNumber } from 'bignumber.js';
declare type BN = number | string | BigNumber;
export declare const bna: (str: TemplateStringsArray, ...vals: BN[]) => BigNumber;
export declare const bnl: (str: TemplateStringsArray, ...vals: BN[]) => boolean;
export {};
