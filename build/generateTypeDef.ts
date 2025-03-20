import { Schema, ComplexSchema } from "./types";
import { sanitizeName } from "./util";

export function generateTypeDef(allSchemas: Schema[]) {
    return allSchemas.map(item => {
        switch(item.baseType) {
            case "string":
            case "number":
            case "boolean":
                return `export type ${item.name} = ${item.baseType};`;
            case "object":
                if ("subNodes" in item) {
                    return generateInterface(item);
                } else {
                    return `export type ${item.name} = ${item.subType};`;
                }
        }
    }).join("\n\n");
}

export function generateInterface(schema: ComplexSchema) {
    return `
export interface ${sanitizeName(schema.name)} ${schema.parent ? `extends ${schema.parent}` : ""} {
${schema.attributes.map(attr => `   ${sanitizeName(attr.key)}${attr.isRequired ? '' : '?'}: ${sanitizeName(attr.type)};`).join("\n")}${schema.attributes.length > 0 ? '\n' : ''}${schema.subNodes.map(node => `   ${sanitizeName(node.name)}${node.minOccurances === 0 ? '?' : ''}: ${sanitizeName(node.type)}[];`).join("\n")}
}`
}
