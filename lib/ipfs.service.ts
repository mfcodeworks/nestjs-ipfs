import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import * as IPFS from 'ipfs';
import { IPFS_MODULE_OPTIONS } from './ipfs.constants';
import { IPFSModuleOptions } from './interfaces';

@Injectable()
export class IpfsService implements OnApplicationShutdown {
    // DEBUG: Give IPFS Node a type when implemented
    private _ipfsNode: any;

    constructor(@Inject(IPFS_MODULE_OPTIONS) private _ipfsOptions: IPFSModuleOptions) {}

    async getNode(): Promise<any> {
        return this._ipfsNode
            ? this._ipfsNode
            : (this._ipfsNode = await IPFS.create(this._ipfsOptions));
    }

    async onApplicationShutdown(): Promise<void> {
        await this._ipfsNode && this._ipfsNode.stop();
    }
}
