import {XMLDocument, XMLNode, XMLParserInterface} from './types';
import {XMLParser as FastXMLParser} from 'fast-xml-parser';

interface BaseNode {
    [key: string]: Node | {[key: string]: string} | Node[];
    attributes?: {[key: string]: string}
}

type Node = BaseNode | string;

export class XMLParser implements XMLParserInterface {
    private parser: FastXMLParser;
    constructor() {
        this.parser = new FastXMLParser({
            allowBooleanAttributes: true,
            preserveOrder: false,
            attributesGroupName: "attributes",
            attributeNamePrefix: "",
            ignoreAttributes: false,
            ignoreDeclaration: false,
            parseAttributeValue: false,
            parseTagValue: false
        });
    }

    parse(content: string): XMLDocument {
        const res: BaseNode = this.parser.parse(content);
        return {rootNode: this.transformRootNode(res)};
    }

    private transformRootNode(node: BaseNode): XMLNode {
        const keys = Object.keys(node);
        const rootKey = keys.find((value) => value !== "?xml" && value !== "attributes");
        const rootNode = node[rootKey];
        const children = [];
        const rootNodeKeys = Object.keys(rootNode);
        for (const key of rootNodeKeys) {
            if (key !== 'attributes') {
                if (Array.isArray(rootNode[key])) {
                    children.push(...rootNode[key].map(item => this.transformNode(key, item)));
                } else {
                    children.push(this.transformNode(key, rootNode[key]));
                }
                
            }
        }
        return {
            type: rootKey,
            attributes: normalizeAttributes(rootNode['attributes']),
            children
        }
    }

    private transformNode(key: string, node: Node): XMLNode {
        const isString = typeof node === 'string';
        const children = [];

        if (!isString) {
            const rootNodeKeys = Object.keys(node);
            for (const key of rootNodeKeys) {
                const subNode = node[key];
                if (key !== 'attributes') {
                    if (Array.isArray(subNode)) {
                        children.push(...(subNode.map(item => this.transformNode(key, item))));
                    } else {
                        children.push(this.transformNode(key, subNode));
                    }
                }
            }
        }
        return {
            type: key,
            content: isString ? node : undefined,
            attributes: !isString ? normalizeAttributes(node['attributes']) : undefined,
            children
        }
    }
}

function normalizeAttributes(attrs?: {[key: string]: string}): {[key: string]: string} | undefined {
    if (!attrs) {
        return undefined;
    }
    return Object.keys(attrs).reduce((prev, cur)=> {
        prev[cur] = `${attrs[cur]}`;
        return prev;
    }, {} as {[key: string]: string});
}