import { rollup, RollupOptions } from 'rollup';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { readFileSync } from 'fs';
import path from 'path';
import { homedir } from 'os';

const packageJson = JSON.parse(readFileSync('./package.json','utf-8'));
const args = process.argv.slice(2); // Yeet 2 args
const options: RollupOptions = {
    input: 'dist/main.js',
    plugins: [nodeResolve(),commonjs(),json()]
}

const localBuild = (args[0] == 'true')
// Local = ./out
// !Local = ~/.openMediaShare/plugins



async function build() {
    let dir = path.join(homedir(),'.openMediaShare','plugins',`${packageJson.name}-${packageJson.version}.omsPlugin.js`)
	let bundle;
	let buildFailed = false;
    if (localBuild){
        console.log(`Writing sharable local bundle`);
        dir = `${path.join(__dirname,'../','out',`${packageJson.name}-${packageJson.version}.omsPlugin.js`)}`
    }

	try {
        await using bundle = await rollup(options)
        
        await bundle.write({
            file: dir,
            format: 'cjs',
            exports: 'default'
        })
        console.log(`Wrote output bundle to "${dir}"`);
    } catch (error) {
		buildFailed = true;
		// do some error reporting
        console.error('ERROR:')
		console.error(error);
	}
	process.exit(buildFailed ? 1 : 0);
}

build()