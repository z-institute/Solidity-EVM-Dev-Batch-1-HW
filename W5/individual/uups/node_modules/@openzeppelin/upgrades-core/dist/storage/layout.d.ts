import { ParsedTypeId } from '../utils/parse-type-id';
export interface StorageLayout {
    layoutVersion?: string;
    storage: StorageItem[];
    types: Record<string, TypeItem>;
}
export interface StorageItem<Type = string> {
    contract: string;
    label: string;
    type: Type;
    src: string;
}
export interface TypeItem<Type = string> {
    label: string;
    members?: TypeItemMembers<Type>;
}
export declare type TypeItemMembers<Type = string> = StructMember<Type>[] | EnumMember[];
export interface StructMember<Type = string> {
    label: string;
    type: Type;
}
export declare type EnumMember = string;
export interface ParsedTypeDetailed extends ParsedTypeId {
    item: TypeItem<ParsedTypeDetailed>;
    args?: ParsedTypeDetailed[];
    rets?: ParsedTypeDetailed[];
}
export declare function getDetailedLayout(layout: StorageLayout): StorageItem<ParsedTypeDetailed>[];
export declare function isEnumMembers<T>(members: TypeItemMembers<T>): members is EnumMember[];
export declare function isStructMembers<T>(members: TypeItemMembers<T>): members is StructMember<T>[];
//# sourceMappingURL=layout.d.ts.map