import { DynamicModule } from '@nestjs/common';
import { IPFSModuleOptions, IPFSModuleAsyncOptions } from './interfaces';
export declare class IpfsModule {
    static register(options?: IPFSModuleOptions, waitForNode?: boolean): DynamicModule;
    static registerAsync(options: IPFSModuleAsyncOptions, waitForNode?: boolean): Promise<DynamicModule>;
    private static createIPFSService;
    private static createIPFSProviders;
    private static createIPFSOptionsProviders;
}
