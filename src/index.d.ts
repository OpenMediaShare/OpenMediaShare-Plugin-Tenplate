import 'oms-sharedtypes'
import type electron from 'electron'
import type { Express } from 'express-serve-static-core'
import { TypedEventEmitter } from './types';
interface defaultModules {
    electron: typeof electron
    express: Express
    Logger: typeof lLogger
}

interface PluginConfigHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: (key: string) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (key: string, value: any) => void
}

export class lLogger {
    constructor()
    info (type: string[], text: string): void;
    dinfo (type: string[], text: string): void;
    warn (type: string[], text: string): void;
    dwarn(type: string[], text: string): void;
    error (type: string[], text: string): void;
    derror (type: string[], text: string): void;
}



type PluginEvents = {
    playbackChange: [PlayerState],
    mediaChange: [VideoMetadata],
    rawInfoUpdate: [VideoMetadata]
    rawPlayerStateChange: [PlayerState]
}

interface configBuilder {
    pages: Record<string, {
        id: string,
        displayName: string,
        type: 'checkbox' | 'text' | 'number', //add options here
        required: boolean,
        default?: string | boolean | number,
    }[]>
}


interface Info {
    name: string,
    author: string,
    configBuilder: configBuilder,
    version?: string,
    description?: string
}