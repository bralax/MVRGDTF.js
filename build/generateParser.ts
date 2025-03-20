import { sanitizeName } from "./util";
import { ComplexSchema, Schema, SimpleSchema } from './types';

export function generateParser(root: Schema, otherSchemas: Schema[], typesFileName: string) {
    return generateRootSchemaParser(root, otherSchemas, typesFileName);
}

export function generateRootSchemaParser(root: Schema, otherSchemas: Schema[], typesFileName: string) {
    return `
import {createParser, XMLNode} from '../xml';
import {
   ${sanitizeName(root.name)},
${otherSchemas.map(item => `   ${sanitizeName(item.name)}`).join(",\n")}
} from './${typesFileName}'

export function parse(content: string): ${sanitizeName(root.name)} | undefined {
    const parsedContent = createParser().parse(content);
    if (!parsedContent.rootNode) {
       return undefined;
    }
    return ${generateParseFunctionName(root)}(parsedContent.rootNode);
}
${generateComplexSchemaParser(root as ComplexSchema)}    
${otherSchemas.map(schema => generateSchemaParser(schema)).join("\n")}
${generateComplexSchemaChecker(root as ComplexSchema)}    
${otherSchemas.map(schema => generateSchemaChecker(schema)).join("\n")}

`
}

export function generateSchemaParser(schema: Schema) {
    if ("subNodes" in schema) {
        return generateComplexSchemaParser(schema);
    }
    return generateSimpleSchemaParser(schema);
}

export function generateSchemaChecker(schema: Schema) {
    if ("subNodes" in schema) {
        return generateComplexSchemaChecker(schema);
    }
    return generateSimpleSchemaChecker(schema);
}

export function generateSimpleSchemaParser(schema: SimpleSchema) {
    let handler: string = "";
    switch(schema.baseType) {
        case "string":
            handler = `    return node as string`;
            break;
        case "number":
            handler = `
    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(\`Field ${schema.name} is of an unexpected type \${typeof node}\`)
    }`;
            break;
        case "boolean":
            handler = `
    if (typeof node === 'string') {
        return node === 'true';
    } else if (typeof node === 'boolean') {
        return node;
    } else {
        throw new Error(\`Field ${schema.name} is of an unexpected type \${typeof node}\`)
    }`;
            break;
        case "object":
            handler = `    throw new Error(\`Field ${schema.name} is of an unexpected type \${typeof node}\`)`;
    }
    return `
function ${generateParseFunctionName(schema)}(node: XMLNode | string): ${sanitizeName(schema.name)} {
${handler}
}
`;
}

export function generateComplexSchemaParser(schema: ComplexSchema) {
    return `
function ${generateParseFunctionName(schema)}(node: XMLNode, parent?: Partial<${sanitizeName(schema.name)}>): ${sanitizeName(schema.name)} {
    const obj: Partial<${sanitizeName(schema.name)}> = parent ?? {};
    ${schema.parent ? `${generateParseFunctionName({name: schema.parent} as Schema)}(node, obj);`: ""}
    ${schema.attributes.map(attr => `obj.${sanitizeName(attr.key)} = ${generateAttributeRetrieval(attr.type!, attr.key)};`).join("\n    ")}
    ${schema.subNodes.length > 0 ? `for (const elem of node.children) {
        switch(elem.type) {
            ${schema.subNodes.map(val => `case "${val.name}":
                if (!obj.${sanitizeName(val.name)}) {
                    obj.${sanitizeName(val.name)} = [];
                }
                obj.${sanitizeName(val.name)}.push(${generateElementRetrieval(val.type)});
                break;
                `).join("\n            ")}
        }
    }`: ''}
    if (!${generateCheckFunctionName(schema)}(obj)) {
        throw new Error("");
    }   
    return obj;
}`;
}

export function generateAttributeRetrieval(baseType: string, key: string) {
    const stringRetrieval = `node?.attributes?.["${key}"]`;
    switch(baseType) {
        case "string":
            return stringRetrieval;
        case "number":
            return `parseFloat(${stringRetrieval})`;
        case "boolean":
            return `(${stringRetrieval} === 'true')`;
        case "object":
        default:
            return `${generateParseFunctionName({name: baseType} as Schema)}(node?.attributes?.["${key}"])`
    }
}

export function generateElementRetrieval(baseType: string) {
    switch(baseType) {
        case "string":
            return "''";
        case "number":
            return "''";
        case "boolean":
            return "''";
        case "object":
        default:
            return `${generateParseFunctionName({name: baseType} as Schema)}(elem)`;
    }
}

export function generateComplexSchemaChecker(schema: ComplexSchema) {
    return `
function ${generateCheckFunctionName(schema)}(obj: Partial<${sanitizeName(schema.name)}>): obj is ${sanitizeName(schema.name)} {
    return true;
}`;
}

export function generateSimpleSchemaChecker(schema: SimpleSchema) {
    return `
function ${generateCheckFunctionName(schema)}(obj: any): obj is ${sanitizeName(schema.name)} {
    return true;
}`;
}


function generateParseFunctionName(schema: Schema) {
    return `parse${capitalize(sanitizeName(schema.name)!)}`;
}

function generateCheckFunctionName(schema: Schema) {
    return `is${capitalize(sanitizeName(schema.name)!)}`;
}

function capitalize(name: string) {
    return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
}