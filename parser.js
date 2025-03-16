const fs = require('fs');
const child_process = require('child_process');

main();


function headerToJson() {
    return new Promise((resolve) => {
        const res = child_process.spawn('clang', ['-Xclang', '-ast-dump=json', '-fsyntax-only', '-x', 'c++', 'include/VectorworksMVR.h'], {stdio: ['pipe', 'pipe','pipe']});

        const writeStream = fs.createWriteStream("VectorworksMVR.json");
        const errWriteStream = fs.createWriteStream("VectorworksMVR.error");

        res.stdout.pipe(writeStream);
        res.stderr.pipe(errWriteStream);
        const resFunc = () => {
            resolve(fs.readFileSync('VectorworksMVR.json', {encoding: 'utf-8'}));
        };
        res.on('close', resFunc);
        res.on('error', resFunc);
        res.on('exit',  resFunc);
    });
}

function parseClass(node) {
    if (!node.completeDefinition) {
        console.log(`Not a complete definition for ${node.name}. Skipping!`);
        return;
    }

    const parsedNode = {name: node.name, methods: [], constructors: []};

    for (const item of node.inner) {
        switch(item.kind) {
            case "CXXMethodDecl":
                const resM = parseMethod(item);
                parsedNode.methods.push(...(resM ? [resM] : []));
                break;
            case "CXXConstructorDecl":
                const resC = parseConstructor(item);
                parsedNode.constructors.push(...(resC ? [resC] : []));
                break;

        }
    }
    console.log(JSON.stringify(parsedNode));
    return ` class_<${parsedNode.name}>("${parsedNode.name}")
    ${parsedNode.constructors.length === 0 ? ".constructor<>()" : parsedNode.constructors.map(item =>`.constructor<${item.params.join("\n   ")}>()`)}${parsedNode.methods.length === 0  ? ';' : ''}
${parsedNode.methods.map(method => `    .function("${method.name}", &${parsedNode.name}::${method.name})`).join("\n")}${parsedNode.methods.length !== 0  ? ';' : ''}
    `
}

function parseMethod(node) {
    if (node.name.startsWith("operator")) {
        return;
    }
    return {name: node.name}
}

function parseConstructor(node) {
    const params = [];
    for (const item of node.inner) {
        if (item.kind === 'ParmVarDecl') {
            params.push(item.type.qualType);
        }
    }
    return {params};
}


async function main() {
    const jsonData = JSON.parse(await headerToJson());
    const mvrNamespaces = jsonData.inner.filter(item => item.kind === 'NamespaceDecl' && item.name === 'VectorworksMVR');
    const declarations = [];
    for (const namespace of mvrNamespaces) {
        for (const item of namespace.inner) {
            switch(item.kind) {
                case "TypedefDecl": 
                    break;
                case "CXXRecordDecl": 
                    switch(item.tagUsed) {
                        case "class":
                            const res = parseClass(item);
                            declarations.push(...(res ? [res] : []));
                            break;
                        case "struct": 
                            break;
                    }
                    break;
            }
        }
    }

    const res = `
#include "./include/VectorworksMVR.h"

#include <emscripten/bind.h>

using namespace VectorworksMVR;
using namespace VectorworksMVR::GdtfDefines;



using namespace emscripten;

EMSCRIPTEN_BINDINGS(module) {
    ${declarations.join("\n")}
};`;
    fs.writeFileSync('main.cpp', res);
}