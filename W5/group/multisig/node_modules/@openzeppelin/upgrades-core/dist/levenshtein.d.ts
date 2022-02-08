export declare type BasicOperation<T> = {
    kind: 'append' | 'insert';
    updated: T;
} | {
    kind: 'delete';
    original: T;
};
export declare type Operation<T, C> = C | BasicOperation<T>;
declare type GetChangeOp<T, C> = (a: T, b: T) => C | undefined;
export declare function levenshtein<T, C>(a: T[], b: T[], getChangeOp: GetChangeOp<T, C>): Operation<T, C>[];
export {};
//# sourceMappingURL=levenshtein.d.ts.map