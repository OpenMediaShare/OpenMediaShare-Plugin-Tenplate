import { defaultModules, Info, PluginConfigHelper, PluginEvents } from './index';
import { TypedEventEmitter } from './types';

export const info:Info = {
    name: 'Plugin tenplate',
    author: 'WaterWolf5918',
    configBuilder: {pages: {}},
    description: 'A helpful description of your plugin.'
}

export const start = function(modules: defaultModules,configHelper: PluginConfigHelper,events: TypedEventEmitter<PluginEvents>){
    const logger = new modules.Logger()

    logger.info([`${info.name}`],'Hello World!')
    logger.info([`${info.name}`],`This plugin was created by ${this.info.auther}`)
    events.on('mediaChange',(e) => {
        logger.info([`${info.name}`],`$Event Loop Test | Media Change: ${e.data.title}`)
    })
    events.on('playbackChange',(e) => {
        logger.info([`${info.name}`],`Event Loop Test | State Change: ${e}`)
    })
}

export const stop = function(){
    console.log('Goodbye World!')
}