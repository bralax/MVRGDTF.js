import {parse} from './parser';
import AdmZip from 'adm-zip';

export function parseBuffer(buffer: Buffer) {
    const zip = new AdmZip(buffer);
    const xmlFile = zip.getEntries().find(item => item.name === 'GeneralSceneDescription.xml');
    const resources = zip.getEntries().filter(item => item.name !== 'GeneralSceneDescription.xml')
        .map(resource => ({name: resource.name, read: () => zip.readAsText(resource)}));

    const content = zip.readAsText(xmlFile);
    const parsed = parse(content);
    return {scene: parsed, resources};
}

export function parseFile(path: string) {
    const zip = new AdmZip(path);
    const xmlFile = zip.getEntries().find(item => item.name === 'GeneralSceneDescription.xml');
    const resources = zip.getEntries().filter(item => item.name !== 'GeneralSceneDescription.xml')
        .map(resource => ({name: resource.name, read: () => zip.readAsText(resource)}));

    const content = zip.readAsText(xmlFile);
    const parsed = parse(content);
    return {scene: parsed, resources};
}