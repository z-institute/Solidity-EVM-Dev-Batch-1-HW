import { ValidationError } from './run';
import { ProxyDeployment } from '../manifest';
export { silenceWarnings } from '../utils/log';
export interface ValidationOptions {
    unsafeAllowCustomTypes?: boolean;
    unsafeAllowLinkedLibraries?: boolean;
    unsafeAllowRenames?: boolean;
    unsafeAllow?: ValidationError['kind'][];
    kind?: ProxyDeployment['kind'];
}
export declare const ValidationErrorUnsafeMessages: Record<ValidationError['kind'], string[]>;
export declare function withValidationDefaults(opts: ValidationOptions): Required<ValidationOptions>;
export declare function processExceptions(contractName: string, errors: ValidationError[], opts: ValidationOptions): ValidationError[];
//# sourceMappingURL=overrides.d.ts.map