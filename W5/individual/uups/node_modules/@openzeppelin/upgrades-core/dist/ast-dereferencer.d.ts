import type { NodeType, NodeTypeMap } from 'solidity-ast/node';
import type { SolcOutput } from './solc-api';
export interface ASTDereferencer {
    <T extends NodeType>(nodeTypes: T[]): (id: number) => NodeTypeMap[T];
    <T extends NodeType>(nodeTypes: T[], id: number): NodeTypeMap[T];
}
export declare function astDereferencer(solcOutput: SolcOutput): ASTDereferencer;
//# sourceMappingURL=ast-dereferencer.d.ts.map