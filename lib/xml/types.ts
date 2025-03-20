

export interface XMLNode {
    type: string;
    attributes: {[key: string]: string};
    children: XMLNode[];
    content?: string;
}

export interface XMLDocument {
    rootNode?: XMLNode;
}

export interface XMLParserInterface {
    parse(content: string): XMLDocument;
}