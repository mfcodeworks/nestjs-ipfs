import * as IPFS from 'ipfs';
import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type IPFSModuleOptions = {
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
    config?: any; // DEBUG: Replace with IPFS config type when implemented
    ipld?: any; // DEBUG: Replace with IPFS IPLD config type when implemented
    libp2p?: any; // DEBUG: Replace with IPFS Libp2p config type when implemented
    connectionManager?: any; // DEBUG: Replace with IPFS Libp2p connection manager type when implemented
}

export interface IPFSModuleOptionsFactory {
    createIPFSOptions(): Promise<IPFSModuleOptions> | IPFSModuleOptions
}

export interface IPFSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<IPFSModuleOptionsFactory>;
    useClass?: Type<IPFSModuleOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<IPFSModuleOptions> | IPFSModuleOptions;
    inject?: any[];
    imports?: any[];
}

export interface IPFSRelayOptions {
    enabled: boolean;
    hop: {enabled: boolean, active: boolean};
}

export interface IPFSExperimentalOptions {
    ipnsPubsub: boolean;
    sharding: boolean;
}