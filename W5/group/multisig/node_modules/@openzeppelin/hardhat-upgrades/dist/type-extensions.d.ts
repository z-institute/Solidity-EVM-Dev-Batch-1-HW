import 'hardhat/types/runtime';
import type { HardhatUpgrades } from '.';
declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        upgrades: HardhatUpgrades;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map