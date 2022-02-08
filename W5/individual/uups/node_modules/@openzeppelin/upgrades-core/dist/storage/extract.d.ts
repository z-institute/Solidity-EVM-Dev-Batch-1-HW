import { ContractDefinition } from 'solidity-ast';
import { StorageLayout } from './layout';
import { SrcDecoder } from '../src-decoder';
import { ASTDereferencer } from '../ast-dereferencer';
export declare function isCurrentLayoutVersion(layout: StorageLayout): boolean;
export declare function extractStorageLayout(contractDef: ContractDefinition, decodeSrc: SrcDecoder, deref: ASTDereferencer): StorageLayout;
//# sourceMappingURL=extract.d.ts.map