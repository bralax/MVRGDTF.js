export interface BaseSchema {
    name: string;
    baseType: BaseTypes;
    restrictions: Restriction[]
}

export interface SimpleSchema extends BaseSchema {
    subType?: string;
}

export interface ComplexSchema extends BaseSchema {
    baseType: 'object';
    isOrdered: boolean;
    subNodes: SubNode[];
    attributes: Attribute[];
    parent?: string;
}

export interface Attribute {
    key: string;
    isRequired: boolean;
    type?: string;
}

export interface SubNode {
    minOccurances: number;
    name: string;
    type: string;
    restrictions: SubNodeRestriction[];
}

export type Schema = SimpleSchema | ComplexSchema;

export interface PatternRestriction {
    pattern: string;
}

export interface ExclusiveMinValueRestriction {
    exclusiveMinValue: number;
}

export interface InclusiveMinValueRestriction {
    inclusiveMinValue: number;
}

export interface ExclusiveMaxValueRestriction {
    exclusiveMaxValue: number;
}

export interface InclusiveMaxValueRestriction {
    inclusiveMaxValue: number;
}

export interface EnumRestriction {
    enumValues: string[];
}

export interface UniqueSubNodeRestriction {

}

export type Restriction = PatternRestriction | ExclusiveMaxValueRestriction | InclusiveMaxValueRestriction | InclusiveMinValueRestriction | ExclusiveMinValueRestriction | EnumRestriction;

export type SubNodeRestriction = UniqueSubNodeRestriction;

export type BaseTypes = 'number' | 'string' | 'boolean' | 'object';
