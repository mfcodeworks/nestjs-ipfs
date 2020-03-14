import { OnApplicationShutdown } from '@nestjs/common';
import { IPFSModuleOptions } from './interfaces';
export declare class IpfsService implements OnApplicationShutdown {
    private _ipfsOptions;
    private _ipfsNode;
    constructor(_ipfsOptions: IPFSModuleOptions);
    getNode(): Promise<any>;
    onApplicationShutdown(): Promise<void>;
}
