import { Version } from '../version';
import { ValidationRunData, ValidationError } from './run';
import { StorageLayout } from '../storage/layout';
import { ValidationOptions } from './overrides';
import { ValidationData } from './data';
import { ProxyDeployment } from '../manifest';
export declare function assertUpgradeSafe(data: ValidationData, version: Version, opts: ValidationOptions): void;
export declare function getContractVersion(runData: ValidationRunData, contractName: string): Version;
export declare function getContractNameAndRunValidation(data: ValidationData, version: Version): [string, ValidationRunData];
export declare function getStorageLayout(data: ValidationData, version: Version): StorageLayout;
export declare function unfoldStorageLayout(runData: ValidationRunData, contractName: string): StorageLayout;
export declare function findVersionWithoutMetadataMatches(data: ValidationData, versionWithoutMetadata: string): Generator<[string, ValidationRunData]>;
export declare function getUnlinkedBytecode(data: ValidationData, bytecode: string): string;
export declare function getErrors(data: ValidationData, version: Version, opts?: ValidationOptions): ValidationError[];
export declare function isUpgradeSafe(data: ValidationData, version: Version): boolean;
export declare function inferProxyKind(data: ValidationData, version: Version): ProxyDeployment['kind'];
//# sourceMappingURL=query.d.ts.map