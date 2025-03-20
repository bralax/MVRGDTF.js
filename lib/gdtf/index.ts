import {parse} from './parser';
import {readFileSync} from 'fs';

export {parse};

export function parseFile(path: string) {
    const content = readFileSync(path, {encoding: 'utf-8'});
    return parse(content);
}