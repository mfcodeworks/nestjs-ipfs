"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var IpfsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ipfs_constants_1 = require("./ipfs.constants");
const ipfs_service_1 = require("./ipfs.service");
let IpfsModule = IpfsModule_1 = class IpfsModule {
    static register(options = {}, waitForNode = false) {
        return {
            module: IpfsModule_1,
            providers: [
                {
                    provide: ipfs_constants_1.IPFS_MODULE_OPTIONS,
                    useValue: options
                },
                ...this.createIPFSService(waitForNode),
            ],
            exports: [ipfs_service_1.IpfsService]
        };
    }
    static registerAsync(options, waitForNode = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                module: IpfsModule_1,
                imports: options.imports || [],
                providers: [
                    ...this.createIPFSService(waitForNode),
                    ...this.createIPFSProviders(options)
                ],
                exports: [ipfs_service_1.IpfsService]
            };
        });
    }
    static createIPFSService(waitForNode) {
        return waitForNode
            ? [{
                    provide: ipfs_service_1.IpfsService,
                    useFactory: (options) => __awaiter(this, void 0, void 0, function* () {
                        const service = new ipfs_service_1.IpfsService(options);
                        yield service.getNode();
                        return service;
                    }),
                    inject: [ipfs_constants_1.IPFS_MODULE_OPTIONS]
                }]
            : [ipfs_service_1.IpfsService];
    }
    static createIPFSProviders(options) {
        if (options.useFactory || options.useExisting) {
            return [this.createIPFSOptionsProviders(options)];
        }
        return [
            this.createIPFSOptionsProviders(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            }
        ];
    }
    static createIPFSOptionsProviders(options) {
        if (options.useFactory) {
            return {
                provide: ipfs_constants_1.IPFS_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: ipfs_constants_1.IPFS_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createIPFSOptions(); }),
            inject: [options.useExisting] || [options.useClass]
        };
    }
};
IpfsModule = IpfsModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], IpfsModule);
exports.IpfsModule = IpfsModule;
