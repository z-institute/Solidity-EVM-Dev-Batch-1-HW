import { SolcOutput } from '../solc-api';
import { SrcDecoder } from '../src-decoder';
import { Version } from '../version';
import { LinkReference } from '../link-refs';
import { StorageLayout } from '../storage/layout';
export declare type ValidationRunData = Record<string, ContractValidation>;
export interface ContractValidation {
    version?: Version;
    src: string;
    inherit: string[];
    libraries: string[];
    methods: string[];
    linkReferences: LinkReference[];
    errors: ValidationError[];
    layout: StorageLayout;
}
declare const errorKinds: readonly ["state-variable-assignment", "state-variable-immutable", "external-library-linking", "struct-definition", "enum-definition", "constructor", "delegatecall", "selfdestruct", "missing-public-upgradeto"];
export declare type ValidationError = ValidationErrorConstructor | ValidationErrorOpcode | ValidationErrorWithName | ValidationErrorUpgradeability;
interface ValidationErrorBase {
    src: string;
    kind: typeof errorKinds[number];
}
interface ValidationErrorWithName extends ValidationErrorBase {
    name: string;
    kind: 'state-variable-assignment' | 'state-variable-immutable' | 'external-library-linking' | 'struct-definition' | 'enum-definition';
}
interface ValidationErrorConstructor extends ValidationErrorBase {
    kind: 'constructor';
    contract: string;
}
interface ValidationErrorOpcode extends ValidationErrorBase {
    kind: 'delegatecall' | 'selfdestruct';
}
interface ValidationErrorUpgradeability extends ValidationErrorBase {
    kind: 'missing-public-upgradeto';
}
export declare function validate(solcOutput: SolcOutput, decodeSrc: SrcDecoder): ValidationRunData;
export {};
//# sourceMappingURL=run.d.ts.map