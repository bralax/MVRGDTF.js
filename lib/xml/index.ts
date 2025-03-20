import {XMLNode, XMLDocument, XMLParserInterface} from './types';
export {XMLDocument, XMLNode};


let XMLParser: any;
if (typeof window === 'object' && typeof window.DOMParser === 'object') {
    const exports = require('./parse.dom');
    XMLParser = exports.XMLParser;
} else {
    const exports = require('./parse.node');
    XMLParser = exports.XMLParser;
}

export function createParser(): XMLParserInterface {
    return new XMLParser();
}