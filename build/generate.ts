import { createParser, XMLNode } from '../lib/xml/index';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { parse } from './parseSchema';
import { generateTypeDef } from './generateTypeDef';
import { generateParser } from './generateParser';
import {program} from 'commander';
import { join } from 'path';

program.requiredOption("-i, --input <file-path>", "The input schema file")
    .requiredOption("-o, --output <path>", "The folder to write the ouput to")
    .option("-f, --file-name <name>", "The name of the output parser file without extension so for main.ts, provide main, defaults to index")
    .option("-t, --types-file-name <name>", "The name of the output types file without extension so for main.ts, provide main, defaults to types")


const res = program.parse();

const file = res.opts().input;//"./build/gdtf.xsd";

const fileContent = readFileSync(file, { encoding: 'utf-8' });
const parsedContent = createParser().parse(fileContent);
if (!parsedContent.rootNode
    || parsedContent.rootNode.type !== "xs:schema"
    || parsedContent.rootNode.attributes["xmlns:xs"] !== "http://www.w3.org/2001/XMLSchema") {
    throw new Error("Invalid schema");
}

const schemas = parsedContent.rootNode.children;

const {root, schemas: parsedSchemas} = parse(schemas);
const typeDef = generateTypeDef([...(root ? [root] : []), ...parsedSchemas]);
if (!root) {
    throw new Error("Could not find the root schema for the xsd");
}
const outputFolder = res.opts().output;
const outputFile = res.opts().fileName ?? 'index';
const typesFile = res.opts().typesFileName ?? 'types';

const parser = generateParser(root, parsedSchemas, typesFile);



const typedefPath = join(outputFolder, `${typesFile}.ts`);
const parserFile = join(outputFolder, `${outputFile}.ts`);
mkdirSync(outputFolder, {recursive: true});
writeFileSync(typedefPath, typeDef);
writeFileSync(parserFile, parser);