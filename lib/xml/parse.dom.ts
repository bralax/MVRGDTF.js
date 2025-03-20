import {XMLDocument, XMLNode, XMLParserInterface} from './types';

export class XMLParser implements XMLParserInterface {
    private parser: DOMParser;
    constructor() {
        this.parser = new DOMParser();
    }

    parse(content: string): XMLDocument {
        const res = this.parser.parseFromString(content, 'text/xml');
        const root = res.documentElement;
        return {rootNode: this.transformNode(root)};
    }

    private transformNode(node: Element): XMLNode {
        const attributes: {[key: string]: string} = {};
        for (let i = 0; i < node.attributes.length; i++) {
            attributes[node.attributes[i].name] = node.attributes[i].value;
        }
        const children = [];
        for (let i = 0; i < node.children.length; i++) {
            children.push(this.transformNode(node.children[i]));
        }
        return {
            type: node.nodeName,
            attributes,
            children,
            content: children.length === 0 ? node.textContent : undefined
        }
    }
}