import type { SolcOutput } from '@openzeppelin/upgrades-core';
declare type RecursivePartial<T> = {
    [k in keyof T]?: RecursivePartial<T[k]>;
};
declare type MaybeSolcOutput = RecursivePartial<SolcOutput>;
export declare function isFullSolcOutput(output: MaybeSolcOutput | undefined): boolean;
export {};
//# sourceMappingURL=is-full-solc-output.d.ts.map