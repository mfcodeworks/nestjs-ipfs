import { Module, DynamicModule, Global, Provider, Type } from '@nestjs/common';
import { IPFSModuleOptions, IPFSModuleOptionsFactory, IPFSModuleAsyncOptions } from './interfaces';
import { IPFS_MODULE_OPTIONS } from './ipfs.constants';
import { IpfsService } from './ipfs.service';

@Global()
@Module({})
export class IpfsModule {
    // DEBUG: Set options to IPFS options type when types implemented
    static register(options: IPFSModuleOptions = {}, waitForNode = false): DynamicModule {
        return {
            module: IpfsModule,
            providers: [
                {
                    provide: IPFS_MODULE_OPTIONS,
                    useValue: options
                },
                ...this.createIPFSService(waitForNode),
            ],
            exports: [IpfsService]
        };
    }

    static async registerAsync(options: IPFSModuleAsyncOptions, waitForNode = false): Promise<DynamicModule> {
        return {
            module: IpfsModule,
            imports: options.imports || [],
            providers: [
                ...this.createIPFSService(waitForNode),
                ...this.createIPFSProviders(options)
            ],
            exports: [IpfsService]
        };
    }

    private static createIPFSService(waitForNode: boolean): Provider[] {
        return waitForNode
            ? [{
                provide: IpfsService,
                useFactory: async (options) => {
                    const service = new IpfsService(options)
                    await service.getNode();
                    return service;
                },
                inject: [IPFS_MODULE_OPTIONS]
            }]
            : [IpfsService];
    }

    private static createIPFSProviders(options: IPFSModuleAsyncOptions): Provider[] {
        // If FactoryProvider or ExistingProvider use directly
        if (options.useFactory || options.useExisting) {
            return [this.createIPFSOptionsProviders(options)]
        }

        // If ClassProvider inject class and provider
        return [
            this.createIPFSOptionsProviders(options),
            {
                provide: options.useClass as Type<IPFSModuleOptionsFactory>,
                useClass: options.useClass as Type<IPFSModuleOptionsFactory>,
            }
        ];
    }

    private static createIPFSOptionsProviders(options: IPFSModuleAsyncOptions): Provider {
        // If FactoryProvider use the passed in factory
        if (options.useFactory) {
            return {
                provide: IPFS_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }

        // Create factory from ClassProvider or ExisitngService
        return {
            provide: IPFS_MODULE_OPTIONS,
            useFactory: async (optionsFactory: IPFSModuleOptionsFactory) =>
                await optionsFactory.createIPFSOptions(),
            inject: [options.useExisting as Type<IPFSModuleOptionsFactory>] || [options.useClass as Type<IPFSModuleOptionsFactory>]
        };
    }
}
