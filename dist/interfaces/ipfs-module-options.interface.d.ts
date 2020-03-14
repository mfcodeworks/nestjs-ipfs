import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
export declare type IPFSModuleOptions = {
    repo?: string | any;
    repoAutoMigrate?: boolean;
    init?: boolean;
    start?: boolean;
    pass?: string;
    silent?: boolean;
    relay?: IPFSRelayOptions;
    offline?: boolean;
    preload?: boolean;
    EXPERIMENTAL?: IPFSExperimentalOptions;
    config?: any;
    ipld?: any;
    libp2p?: any;
    connectionManager?: any;
};
export interface IPFSModuleOptionsFactory {
    createIPFSOptions(): Promise<IPFSModuleOptions> | IPFSModuleOptions;
}
export interface IPFSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<IPFSModuleOptionsFactory>;
    useClass?: Type<IPFSModuleOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<IPFSModuleOptions> | IPFSModuleOptions;
    inject?: any[];
    imports?: any[];
}
export interface IPFSRelayOptions {
    enabled: boolean;
    hop: {
        enabled: boolean;
        active: boolean;
    };
}
export interface IPFSExperimentalOptions {
    ipnsPubsub: boolean;
    sharding: boolean;
}
