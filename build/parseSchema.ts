import { XMLNode } from "../lib/xml";
import { Schema, SubNode, ComplexSchema, BaseTypes, Restriction } from "./types";

export function parse(schemas: XMLNode[]) {
    const types = [];
    const aggregatedSchemas = schemas.reduce((prev, val) => {
        if (val.type in prev) {
            prev[val.type].push(val);
        } else {
            prev[val.type] = [val];
        }
        return prev;
    }, {} as Record<string, XMLNode[]>)

    let rootSchema: Schema | undefined = undefined;
    let parsedSchemas: Schema[] = [];
    for (const schema of Object.keys(aggregatedSchemas)) {
        const schemasForType = aggregatedSchemas[schema];
        switch (schema) {
            case "xs:element":
                rootSchema = parseRootElement(schemasForType);
                break;
            case "xs:complexType":
                parsedSchemas.push(...schemasForType.map(item => parseComplexType(item)));
                break;
            case "xs:group":
                parsedSchemas.push(...schemasForType.map(item => parseGroup(item)));
                break;
            case "xs:simpleType":
                parsedSchemas.push(...schemasForType.map(item => parseSimpleType(item)))
                break;
        }
    }
    return {root: rootSchema, schemas: parsedSchemas};
}


function parseRootElement(nodes: XMLNode[]): Schema {
    if (nodes.length !== 1) {
        throw new Error("There must only be one element on the schema");
    }
    const node = nodes[0];
    const name = node.attributes["name"];
    const type = node.children[0];
    return {
        ...parseComplexType(type),
        name
    }
}

function parseElement(node: XMLNode, parent: XMLNode): SubNode {
    const minOccurances = handleOccurs(node, parent, 'minOccurs');
    const maxOccurances = handleOccurs(node, parent, 'maxOccurs');

    const {baseType, subType} = parseType(node.attributes['type']);
    return {
        minOccurances,
        maxOccurances,
        name: node.attributes['name'],
        type: baseType === 'object' && subType ? subType : baseType,
        restrictions: []
    };
}

function handleOccurs(node: XMLNode, parent: XMLNode, occurs: 'minOccurs' | 'maxOccurs') {
    if (node.attributes?.[occurs]) {
        return node.attributes[occurs] === 'unbounded' ? -1 : parseInt(node.attributes[occurs]);
    }
    if (parent.attributes?.[occurs]) {
        return parent.attributes[occurs] === 'unbounded' ? -1 : parseInt(parent.attributes[occurs]);
    }
    return 1;
}

function parseGroup(node: XMLNode): Schema {
    if (node.children.length !== 1) {
        throw new Error("There must only be one element on the schema");
    }
    const complexNode = node.children[0];
    const name = node.attributes["name"];
    return {
        ...parseComplexType(complexNode),
        name
    }
}

function parseComplexType(node: XMLNode): ComplexSchema {
    const name = node.attributes?.["name"];
    const baseType: BaseTypes = 'object';
    const isOrdered = !!node.children.find(item => item.type === 'xs:sequence');
    const attributes = node.children
        .filter(item => item.type === 'xs:attribute')
        .map(item => {
            const {baseType, subType} = parseType(item.attributes['type']);
            const isRequired = item.attributes['use'] === 'required';
            return {
                key: item.attributes['name'],
                isRequired,
                type: baseType === 'object' ? subType : baseType,
            }
        });
    const allOrSequence = node.children.find(item => 
        item.type === 'xs:sequence' || 
        item.type === 'xs:all' || item.type === 'xs:choice');
    let subNodes: SubNode[] = [];
    if (allOrSequence) {
        subNodes = allOrSequence.children.map(item => parseElement(item, allOrSequence));
    }
    let group = node.children.find(item => item.type === 'xs:group');
    return {
        name,
        isOrdered,
        subNodes,
        attributes,
        baseType,
        parent: group?.attributes["ref"],
        restrictions: []
    }
}

function parseSimpleType(node: XMLNode): Schema {
    const name = node.attributes["name"];
    const restrictionNode = node.children.find(node => node.type === 'xs:restriction');
    if (!restrictionNode) {
        throw new Error("Missing type information for a simple type");
    }
    const {baseType, subType} = parseType(restrictionNode.attributes['base']);
    const restrictions: Restriction[] = restrictionNode.children.map(node => {
        let restriction: Restriction | undefined = undefined;
        switch(node.type) {
            case "xs:minExclusive": 
                restriction = {exclusiveMinValue: parseFloat(node.attributes['value'])};
                break;
            case "xs:maxExclusive": 
                restriction = {exclusiveMaxValue: parseFloat(node.attributes['value'])};
                break;
            case "xs:minInclusive": 
                restriction = {inclusiveMinValue: parseFloat(node.attributes['value'])};
                break;
            case "xs:maxInclusive":
                restriction = {inclusiveMaxValue: parseFloat(node.attributes['value'])};
                break;
            case "xs:pattern":
                restriction = {pattern: node.attributes['value']};
                break;
        }
        return restriction;
    }).filter(val => val) as Restriction[];
    if (restrictionNode.attributes['base'] === 'xs:string') {
        const enumValues = restrictionNode.children
            .filter(item  => item.type === "xs:enumeration")
            .map(item => item.attributes["value"]);
        if (enumValues && enumValues.length > 0) {
            restrictions.push({enumValues})
        }
    }
    return {
        baseType,
        subType,
        restrictions,
        name
    }
}


function parseType(type: string): { baseType: BaseTypes, subType?: string } {
    if (!type.startsWith("xs:")) {
        return { baseType: 'object', subType: type };
    }
    const trimmedType = type.substring(3);
    switch (trimmedType) {
        case "anyURI":
            return { baseType: 'string', subType: 'URL' };
        case "base64Binary":
            return { baseType: 'string', subType: 'base64Binary' };
        case "boolean":
            return { baseType: 'boolean'};
        case "date":
            return { baseType: 'string', subType: 'date' };
        case "dateTime":
            return { baseType: 'string', subType: 'dateTime' };
        case "decimal":
            return { baseType: 'number', subType: 'decimal' };
        case "integer":
        case "int":
            return { baseType: 'number', subType: 'integer' };
        case "long":
            return { baseType: 'number', subType: 'long' };
        case "short":
            return { baseType: 'number', subType: 'short' };
        case "byte":
            return { baseType: 'number', subType: 'byte' };
        case "float":
            return { baseType: 'number', subType: 'float' };
        case "string":
            return { baseType: 'string'};
        case "unsignedByte":
            return { baseType: 'number', subType: 'unsignedByte' };
        case "unsignedInt":
            return { baseType: 'number', subType: 'unsignedInt' };
        default:
            throw new Error(`Unexpected base type ${type} and trimmed ${trimmedType}`);
    }
}
