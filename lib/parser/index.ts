
import {createParser, XMLNode} from '../xml';
import {
   GDTF,
   FixtureType,
   AttributeDefinitions,
   ActivationGroups,
   FeatureGroups,
   ActivationGroup,
   FeatureGroup,
   Feature,
   Attributes,
   Attribute,
   SubPhysicalUnit,
   Wheels,
   Wheel,
   Slot,
   Facet,
   AnimationSystem,
   PhysicalDescriptions,
   Emitters,
   Emitter,
   EmitterMeasurement,
   Filters,
   Filter,
   FilterMeasurement,
   MeasurementPoint,
   ColorSpace,
   AdditionalColorSpaces,
   Gamuts,
   Gamut,
   DMXProfiles,
   DMXProfile,
   Point,
   CRIs,
   CRIGroup,
   CRI,
   Connectors,
   Connector,
   Properties,
   OperatingTemperature,
   Weight,
   PowerConsumption,
   LegHeight,
   Models,
   Model,
   Geometries,
   BasicGeometryAttributes,
   BasicGeometryType,
   Beam,
   Display,
   Laser,
   Protocol,
   GeometryReference,
   Break,
   WiringObject,
   PinPatch,
   Inventory,
   Structure,
   Support,
   DMXModes,
   DMXMode,
   DMXChannels,
   DMXChannel,
   LogicalChannel,
   ChannelFunction,
   ChannelSet,
   SubChannelSet,
   Relations,
   Relation,
   FTMacros,
   FTMacro,
   MacroDMX,
   MacroDMXStep,
   MacroDMXValue,
   Revisions,
   Revision,
   FTPresets,
   FTPreset,
   Protocols,
   ArtNet,
   Map,
   sACN,
   PosiStageNet,
   OpenSoundControl,
   CITP,
   FTRDM,
   SoftwareVersionID,
   DMXPersonality,
   GeometryChildren,
   positivefloat,
   positiveinteger,
   hextype,
   physicaltype,
   twoarray,
   matrixtype,
   rotationtype,
   colorcietype,
   offsettype,
   dmxtype,
   dmxaddresstype,
   nametype,
   featuretype,
   nodetype,
   dataversion,
   guidtype,
   dmxbreaktype,
   PhysicalUnitEnum,
   MasterEnum,
   PrimitiveTypeEnum,
   LampTypeEnum,
   BeamTypeEnum,
   ColorSpaceEnum,
   InterpolationToEnum,
   SnapEnum,
   YesNoEnum,
   RelationTypesEnum,
   CESEnum,
   SubPhysicalTypeEnum,
   LaserColorType,
   WiringComponentType,
   WiringFuseRating,
   WiringOrientation,
   StructureType,
   CrossSectionType,
   SupportType
} from './types'

export function parse(content: string): GDTF | undefined {
    const parsedContent = createParser().parse(content);
    if (!parsedContent.rootNode) {
       return undefined;
    }
    return parseGDTF(parsedContent.rootNode);
}

function parseGDTF(node: XMLNode, parent?: Partial<GDTF>): GDTF {
    const obj: Partial<GDTF> = parent ?? {};
    
    obj.DataVersion = parseDataversion(node?.attributes?.["DataVersion"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "FixtureType":
                if (!obj.FixtureType) {
                    obj.FixtureType = [];
                }
                obj.FixtureType.push(parseFixtureType(elem));
                break;
                
        }
    }
    if (!isGDTF(obj)) {
        throw new Error("");
    }   
    return obj;
}    

function parseFixtureType(node: XMLNode, parent?: Partial<FixtureType>): FixtureType {
    const obj: Partial<FixtureType> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.ShortName = node?.attributes?.["ShortName"];
    obj.LongName = node?.attributes?.["LongName"];
    obj.Manufacturer = node?.attributes?.["Manufacturer"];
    obj.Description = node?.attributes?.["Description"];
    obj.FixtureTypeID = parseGuidtype(node?.attributes?.["FixtureTypeID"]);
    obj.Thumbnail = node?.attributes?.["Thumbnail"];
    obj.ThumbnailOffsetX = parseFloat(node?.attributes?.["ThumbnailOffsetX"]);
    obj.ThumbnailOffsetY = parseFloat(node?.attributes?.["ThumbnailOffsetY"]);
    obj.RefFT = parseGuidtype(node?.attributes?.["RefFT"]);
    obj.CanHaveChildren = parseYesNoEnum(node?.attributes?.["CanHaveChildren"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "AttributeDefinitions":
                if (!obj.AttributeDefinitions) {
                    obj.AttributeDefinitions = [];
                }
                obj.AttributeDefinitions.push(parseAttributeDefinitions(elem));
                break;
                
            case "Wheels":
                if (!obj.Wheels) {
                    obj.Wheels = [];
                }
                obj.Wheels.push(parseWheels(elem));
                break;
                
            case "PhysicalDescriptions":
                if (!obj.PhysicalDescriptions) {
                    obj.PhysicalDescriptions = [];
                }
                obj.PhysicalDescriptions.push(parsePhysicalDescriptions(elem));
                break;
                
            case "Models":
                if (!obj.Models) {
                    obj.Models = [];
                }
                obj.Models.push(parseModels(elem));
                break;
                
            case "Geometries":
                if (!obj.Geometries) {
                    obj.Geometries = [];
                }
                obj.Geometries.push(parseGeometries(elem));
                break;
                
            case "DMXModes":
                if (!obj.DMXModes) {
                    obj.DMXModes = [];
                }
                obj.DMXModes.push(parseDMXModes(elem));
                break;
                
            case "Revisions":
                if (!obj.Revisions) {
                    obj.Revisions = [];
                }
                obj.Revisions.push(parseRevisions(elem));
                break;
                
            case "FTPresets":
                if (!obj.FTPresets) {
                    obj.FTPresets = [];
                }
                obj.FTPresets.push(parseFTPresets(elem));
                break;
                
            case "Protocols":
                if (!obj.Protocols) {
                    obj.Protocols = [];
                }
                obj.Protocols.push(parseProtocols(elem));
                break;
                
        }
    }
    if (!isFixtureType(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseAttributeDefinitions(node: XMLNode, parent?: Partial<AttributeDefinitions>): AttributeDefinitions {
    const obj: Partial<AttributeDefinitions> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "ActivationGroups":
                if (!obj.ActivationGroups) {
                    obj.ActivationGroups = [];
                }
                obj.ActivationGroups.push(parseActivationGroups(elem));
                break;
                
            case "FeatureGroups":
                if (!obj.FeatureGroups) {
                    obj.FeatureGroups = [];
                }
                obj.FeatureGroups.push(parseFeatureGroups(elem));
                break;
                
            case "Attributes":
                if (!obj.Attributes) {
                    obj.Attributes = [];
                }
                obj.Attributes.push(parseAttributes(elem));
                break;
                
        }
    }
    if (!isAttributeDefinitions(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseActivationGroups(node: XMLNode, parent?: Partial<ActivationGroups>): ActivationGroups {
    const obj: Partial<ActivationGroups> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "ActivationGroup":
                if (!obj.ActivationGroup) {
                    obj.ActivationGroup = [];
                }
                obj.ActivationGroup.push(parseActivationGroup(elem));
                break;
                
        }
    }
    if (!isActivationGroups(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFeatureGroups(node: XMLNode, parent?: Partial<FeatureGroups>): FeatureGroups {
    const obj: Partial<FeatureGroups> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "FeatureGroup":
                if (!obj.FeatureGroup) {
                    obj.FeatureGroup = [];
                }
                obj.FeatureGroup.push(parseFeatureGroup(elem));
                break;
                
        }
    }
    if (!isFeatureGroups(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseActivationGroup(node: XMLNode, parent?: Partial<ActivationGroup>): ActivationGroup {
    const obj: Partial<ActivationGroup> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    
    if (!isActivationGroup(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFeatureGroup(node: XMLNode, parent?: Partial<FeatureGroup>): FeatureGroup {
    const obj: Partial<FeatureGroup> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Pretty = node?.attributes?.["Pretty"];
    for (const elem of node.children) {
        switch(elem.type) {
            case "Feature":
                if (!obj.Feature) {
                    obj.Feature = [];
                }
                obj.Feature.push(parseFeature(elem));
                break;
                
        }
    }
    if (!isFeatureGroup(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFeature(node: XMLNode, parent?: Partial<Feature>): Feature {
    const obj: Partial<Feature> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    
    if (!isFeature(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseAttributes(node: XMLNode, parent?: Partial<Attributes>): Attributes {
    const obj: Partial<Attributes> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Attribute":
                if (!obj.Attribute) {
                    obj.Attribute = [];
                }
                obj.Attribute.push(parseAttribute(elem));
                break;
                
        }
    }
    if (!isAttributes(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseAttribute(node: XMLNode, parent?: Partial<Attribute>): Attribute {
    const obj: Partial<Attribute> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Pretty = node?.attributes?.["Pretty"];
    obj.ActivationGroup = node?.attributes?.["ActivationGroup"];
    obj.Feature = parseFeaturetype(node?.attributes?.["Feature"]);
    obj.MainAttribute = parseNametype(node?.attributes?.["MainAttribute"]);
    obj.PhysicalUnit = parsePhysicalUnitEnum(node?.attributes?.["PhysicalUnit"]);
    obj.Color = parseColorcietype(node?.attributes?.["Color"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "SubPhysicalUnit":
                if (!obj.SubPhysicalUnit) {
                    obj.SubPhysicalUnit = [];
                }
                obj.SubPhysicalUnit.push(parseSubPhysicalUnit(elem));
                break;
                
        }
    }
    if (!isAttribute(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSubPhysicalUnit(node: XMLNode, parent?: Partial<SubPhysicalUnit>): SubPhysicalUnit {
    const obj: Partial<SubPhysicalUnit> = parent ?? {};
    
    obj.Type = parseSubPhysicalTypeEnum(node?.attributes?.["Type"]);
    obj.PhysicalUnit = parsePhysicalUnitEnum(node?.attributes?.["PhysicalUnit"]);
    obj.PhysicalFrom = parseFloat(node?.attributes?.["PhysicalFrom"]);
    obj.PhysicalTo = parseFloat(node?.attributes?.["PhysicalTo"]);
    
    if (!isSubPhysicalUnit(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseWheels(node: XMLNode, parent?: Partial<Wheels>): Wheels {
    const obj: Partial<Wheels> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Wheel":
                if (!obj.Wheel) {
                    obj.Wheel = [];
                }
                obj.Wheel.push(parseWheel(elem));
                break;
                
        }
    }
    if (!isWheels(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseWheel(node: XMLNode, parent?: Partial<Wheel>): Wheel {
    const obj: Partial<Wheel> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "Slot":
                if (!obj.Slot) {
                    obj.Slot = [];
                }
                obj.Slot.push(parseSlot(elem));
                break;
                
        }
    }
    if (!isWheel(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSlot(node: XMLNode, parent?: Partial<Slot>): Slot {
    const obj: Partial<Slot> = parent ?? {};
    
    obj.Name = node?.attributes?.["Name"];
    obj.Color = parseColorcietype(node?.attributes?.["Color"]);
    obj.Filter = parseNametype(node?.attributes?.["Filter"]);
    obj.MediaFileName = node?.attributes?.["MediaFileName"];
    for (const elem of node.children) {
        switch(elem.type) {
            case "Facet":
                if (!obj.Facet) {
                    obj.Facet = [];
                }
                obj.Facet.push(parseFacet(elem));
                break;
                
            case "AnimationSystem":
                if (!obj.AnimationSystem) {
                    obj.AnimationSystem = [];
                }
                obj.AnimationSystem.push(parseAnimationSystem(elem));
                break;
                
        }
    }
    if (!isSlot(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFacet(node: XMLNode, parent?: Partial<Facet>): Facet {
    const obj: Partial<Facet> = parent ?? {};
    
    obj.Color = parseColorcietype(node?.attributes?.["Color"]);
    obj.Rotation = parseRotationtype(node?.attributes?.["Rotation"]);
    
    if (!isFacet(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseAnimationSystem(node: XMLNode, parent?: Partial<AnimationSystem>): AnimationSystem {
    const obj: Partial<AnimationSystem> = parent ?? {};
    
    obj.P1 = parseTwoarray(node?.attributes?.["P1"]);
    obj.P2 = parseTwoarray(node?.attributes?.["P2"]);
    obj.P3 = parseTwoarray(node?.attributes?.["P3"]);
    obj.Radius = parsePositivefloat(node?.attributes?.["Radius"]);
    
    if (!isAnimationSystem(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePhysicalDescriptions(node: XMLNode, parent?: Partial<PhysicalDescriptions>): PhysicalDescriptions {
    const obj: Partial<PhysicalDescriptions> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Emitters":
                if (!obj.Emitters) {
                    obj.Emitters = [];
                }
                obj.Emitters.push(parseEmitters(elem));
                break;
                
            case "Filters":
                if (!obj.Filters) {
                    obj.Filters = [];
                }
                obj.Filters.push(parseFilters(elem));
                break;
                
            case "ColorSpace":
                if (!obj.ColorSpace) {
                    obj.ColorSpace = [];
                }
                obj.ColorSpace.push(parseColorSpace(elem));
                break;
                
            case "AdditionalColorSpaces":
                if (!obj.AdditionalColorSpaces) {
                    obj.AdditionalColorSpaces = [];
                }
                obj.AdditionalColorSpaces.push(parseAdditionalColorSpaces(elem));
                break;
                
            case "Gamuts":
                if (!obj.Gamuts) {
                    obj.Gamuts = [];
                }
                obj.Gamuts.push(parseGamuts(elem));
                break;
                
            case "DMXProfiles":
                if (!obj.DMXProfiles) {
                    obj.DMXProfiles = [];
                }
                obj.DMXProfiles.push(parseDMXProfiles(elem));
                break;
                
            case "CRIs":
                if (!obj.CRIs) {
                    obj.CRIs = [];
                }
                obj.CRIs.push(parseCRIs(elem));
                break;
                
            case "Connectors":
                if (!obj.Connectors) {
                    obj.Connectors = [];
                }
                obj.Connectors.push(parseConnectors(elem));
                break;
                
            case "Properties":
                if (!obj.Properties) {
                    obj.Properties = [];
                }
                obj.Properties.push(parseProperties(elem));
                break;
                
        }
    }
    if (!isPhysicalDescriptions(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseEmitters(node: XMLNode, parent?: Partial<Emitters>): Emitters {
    const obj: Partial<Emitters> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Emitter":
                if (!obj.Emitter) {
                    obj.Emitter = [];
                }
                obj.Emitter.push(parseEmitter(elem));
                break;
                
        }
    }
    if (!isEmitters(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseEmitter(node: XMLNode, parent?: Partial<Emitter>): Emitter {
    const obj: Partial<Emitter> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Color = parseColorcietype(node?.attributes?.["Color"]);
    obj.DominantWaveLength = parseFloat(node?.attributes?.["DominantWaveLength"]);
    obj.DiodePart = node?.attributes?.["DiodePart"];
    for (const elem of node.children) {
        switch(elem.type) {
            case "Measurement":
                if (!obj.Measurement) {
                    obj.Measurement = [];
                }
                obj.Measurement.push(parseEmitterMeasurement(elem));
                break;
                
        }
    }
    if (!isEmitter(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseEmitterMeasurement(node: XMLNode, parent?: Partial<EmitterMeasurement>): EmitterMeasurement {
    const obj: Partial<EmitterMeasurement> = parent ?? {};
    
    obj.Physical = parsePhysicaltype(node?.attributes?.["Physical"]);
    obj.LuminousIntensity = parseFloat(node?.attributes?.["LuminousIntensity"]);
    obj.InterpolationTo = parseInterpolationToEnum(node?.attributes?.["InterpolationTo"]);
    obj.Transmission = parseFloat(node?.attributes?.["Transmission"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "MeasurementPoint":
                if (!obj.MeasurementPoint) {
                    obj.MeasurementPoint = [];
                }
                obj.MeasurementPoint.push(parseMeasurementPoint(elem));
                break;
                
        }
    }
    if (!isEmitterMeasurement(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFilters(node: XMLNode, parent?: Partial<Filters>): Filters {
    const obj: Partial<Filters> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Filter":
                if (!obj.Filter) {
                    obj.Filter = [];
                }
                obj.Filter.push(parseFilter(elem));
                break;
                
        }
    }
    if (!isFilters(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFilter(node: XMLNode, parent?: Partial<Filter>): Filter {
    const obj: Partial<Filter> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Color = parseColorcietype(node?.attributes?.["Color"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "Measurement":
                if (!obj.Measurement) {
                    obj.Measurement = [];
                }
                obj.Measurement.push(parseFilterMeasurement(elem));
                break;
                
        }
    }
    if (!isFilter(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFilterMeasurement(node: XMLNode, parent?: Partial<FilterMeasurement>): FilterMeasurement {
    const obj: Partial<FilterMeasurement> = parent ?? {};
    
    obj.Physical = parsePhysicaltype(node?.attributes?.["Physical"]);
    obj.Transmission = parseFloat(node?.attributes?.["Transmission"]);
    obj.InterpolationTo = parseInterpolationToEnum(node?.attributes?.["InterpolationTo"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "MeasurementPoint":
                if (!obj.MeasurementPoint) {
                    obj.MeasurementPoint = [];
                }
                obj.MeasurementPoint.push(parseMeasurementPoint(elem));
                break;
                
        }
    }
    if (!isFilterMeasurement(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseMeasurementPoint(node: XMLNode, parent?: Partial<MeasurementPoint>): MeasurementPoint {
    const obj: Partial<MeasurementPoint> = parent ?? {};
    
    obj.WaveLength = parseFloat(node?.attributes?.["WaveLength"]);
    obj.Energy = parseFloat(node?.attributes?.["Energy"]);
    
    if (!isMeasurementPoint(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseColorSpace(node: XMLNode, parent?: Partial<ColorSpace>): ColorSpace {
    const obj: Partial<ColorSpace> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Mode = parseColorSpaceEnum(node?.attributes?.["Mode"]);
    obj.Red = parseColorcietype(node?.attributes?.["Red"]);
    obj.Green = parseColorcietype(node?.attributes?.["Green"]);
    obj.Blue = parseColorcietype(node?.attributes?.["Blue"]);
    obj.WhitePoint = parseColorcietype(node?.attributes?.["WhitePoint"]);
    
    if (!isColorSpace(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseAdditionalColorSpaces(node: XMLNode, parent?: Partial<AdditionalColorSpaces>): AdditionalColorSpaces {
    const obj: Partial<AdditionalColorSpaces> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "ColorSpace":
                if (!obj.ColorSpace) {
                    obj.ColorSpace = [];
                }
                obj.ColorSpace.push(parseColorSpace(elem));
                break;
                
        }
    }
    if (!isAdditionalColorSpaces(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseGamuts(node: XMLNode, parent?: Partial<Gamuts>): Gamuts {
    const obj: Partial<Gamuts> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Gamut":
                if (!obj.Gamut) {
                    obj.Gamut = [];
                }
                obj.Gamut.push(parseGamut(elem));
                break;
                
        }
    }
    if (!isGamuts(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseGamut(node: XMLNode, parent?: Partial<Gamut>): Gamut {
    const obj: Partial<Gamut> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Points = node?.attributes?.["Points"];
    
    if (!isGamut(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXProfiles(node: XMLNode, parent?: Partial<DMXProfiles>): DMXProfiles {
    const obj: Partial<DMXProfiles> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "DMXProfile":
                if (!obj.DMXProfile) {
                    obj.DMXProfile = [];
                }
                obj.DMXProfile.push(parseDMXProfile(elem));
                break;
                
        }
    }
    if (!isDMXProfiles(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXProfile(node: XMLNode, parent?: Partial<DMXProfile>): DMXProfile {
    const obj: Partial<DMXProfile> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "Point":
                if (!obj.Point) {
                    obj.Point = [];
                }
                obj.Point.push(parsePoint(elem));
                break;
                
        }
    }
    if (!isDMXProfile(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePoint(node: XMLNode, parent?: Partial<Point>): Point {
    const obj: Partial<Point> = parent ?? {};
    
    obj.DMXPercentage = parseFloat(node?.attributes?.["DMXPercentage"]);
    obj.CFC0 = parseFloat(node?.attributes?.["CFC0"]);
    obj.CFC1 = parseFloat(node?.attributes?.["CFC1"]);
    obj.CFC2 = parseFloat(node?.attributes?.["CFC2"]);
    obj.CFC3 = parseFloat(node?.attributes?.["CFC3"]);
    
    if (!isPoint(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseCRIs(node: XMLNode, parent?: Partial<CRIs>): CRIs {
    const obj: Partial<CRIs> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "CRIGroup":
                if (!obj.CRIGroup) {
                    obj.CRIGroup = [];
                }
                obj.CRIGroup.push(parseCRIGroup(elem));
                break;
                
        }
    }
    if (!isCRIs(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseCRIGroup(node: XMLNode, parent?: Partial<CRIGroup>): CRIGroup {
    const obj: Partial<CRIGroup> = parent ?? {};
    
    obj.ColorTemperature = parseFloat(node?.attributes?.["ColorTemperature"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "CRI":
                if (!obj.CRI) {
                    obj.CRI = [];
                }
                obj.CRI.push(parseCRI(elem));
                break;
                
        }
    }
    if (!isCRIGroup(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseCRI(node: XMLNode, parent?: Partial<CRI>): CRI {
    const obj: Partial<CRI> = parent ?? {};
    
    obj.CES = parseCESEnum(node?.attributes?.["CES"]);
    obj.ColorRenderingIndex = parseFloat(node?.attributes?.["ColorRenderingIndex"]);
    
    if (!isCRI(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseConnectors(node: XMLNode, parent?: Partial<Connectors>): Connectors {
    const obj: Partial<Connectors> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Connector":
                if (!obj.Connector) {
                    obj.Connector = [];
                }
                obj.Connector.push(parseConnector(elem));
                break;
                
        }
    }
    if (!isConnectors(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseConnector(node: XMLNode, parent?: Partial<Connector>): Connector {
    const obj: Partial<Connector> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Type = parseNametype(node?.attributes?.["Type"]);
    obj.DMXBreak = parsePositiveinteger(node?.attributes?.["DMXBreak"]);
    obj.Gender = parseFloat(node?.attributes?.["Gender"]);
    obj.Length = parsePositivefloat(node?.attributes?.["Length"]);
    
    if (!isConnector(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseProperties(node: XMLNode, parent?: Partial<Properties>): Properties {
    const obj: Partial<Properties> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "OperatingTemperature":
                if (!obj.OperatingTemperature) {
                    obj.OperatingTemperature = [];
                }
                obj.OperatingTemperature.push(parseOperatingTemperature(elem));
                break;
                
            case "Weight":
                if (!obj.Weight) {
                    obj.Weight = [];
                }
                obj.Weight.push(parseWeight(elem));
                break;
                
            case "PowerConsumption":
                if (!obj.PowerConsumption) {
                    obj.PowerConsumption = [];
                }
                obj.PowerConsumption.push(parsePowerConsumption(elem));
                break;
                
            case "LegHeight":
                if (!obj.LegHeight) {
                    obj.LegHeight = [];
                }
                obj.LegHeight.push(parseLegHeight(elem));
                break;
                
        }
    }
    if (!isProperties(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseOperatingTemperature(node: XMLNode, parent?: Partial<OperatingTemperature>): OperatingTemperature {
    const obj: Partial<OperatingTemperature> = parent ?? {};
    
    obj.Low = parseFloat(node?.attributes?.["Low"]);
    obj.High = parseFloat(node?.attributes?.["High"]);
    
    if (!isOperatingTemperature(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseWeight(node: XMLNode, parent?: Partial<Weight>): Weight {
    const obj: Partial<Weight> = parent ?? {};
    
    obj.Value = parseFloat(node?.attributes?.["Value"]);
    
    if (!isWeight(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePowerConsumption(node: XMLNode, parent?: Partial<PowerConsumption>): PowerConsumption {
    const obj: Partial<PowerConsumption> = parent ?? {};
    
    obj.Value = parseFloat(node?.attributes?.["Value"]);
    obj.PowerFactor = parseFloat(node?.attributes?.["PowerFactor"]);
    obj.Connector = parseNametype(node?.attributes?.["Connector"]);
    obj.VoltageLow = parseFloat(node?.attributes?.["VoltageLow"]);
    obj.VoltageHigh = parseFloat(node?.attributes?.["VoltageHigh"]);
    obj.FrequencyLow = parseFloat(node?.attributes?.["FrequencyLow"]);
    obj.FrequencyHigh = parseFloat(node?.attributes?.["FrequencyHigh"]);
    
    if (!isPowerConsumption(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseLegHeight(node: XMLNode, parent?: Partial<LegHeight>): LegHeight {
    const obj: Partial<LegHeight> = parent ?? {};
    
    obj.Value = parseFloat(node?.attributes?.["Value"]);
    
    if (!isLegHeight(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseModels(node: XMLNode, parent?: Partial<Models>): Models {
    const obj: Partial<Models> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Model":
                if (!obj.Model) {
                    obj.Model = [];
                }
                obj.Model.push(parseModel(elem));
                break;
                
        }
    }
    if (!isModels(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseModel(node: XMLNode, parent?: Partial<Model>): Model {
    const obj: Partial<Model> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Length = parseFloat(node?.attributes?.["Length"]);
    obj.Width = parseFloat(node?.attributes?.["Width"]);
    obj.Height = parseFloat(node?.attributes?.["Height"]);
    obj.PrimitiveType = parsePrimitiveTypeEnum(node?.attributes?.["PrimitiveType"]);
    obj.File = node?.attributes?.["File"];
    obj.SVGOffsetX = parseFloat(node?.attributes?.["SVGOffsetX"]);
    obj.SVGOffsetY = parseFloat(node?.attributes?.["SVGOffsetY"]);
    obj.SVGSideOffsetX = parseFloat(node?.attributes?.["SVGSideOffsetX"]);
    obj.SVGSideOffsetY = parseFloat(node?.attributes?.["SVGSideOffsetY"]);
    obj.SVGFrontOffsetX = parseFloat(node?.attributes?.["SVGFrontOffsetX"]);
    obj.SVGFrontOffsetY = parseFloat(node?.attributes?.["SVGFrontOffsetY"]);
    
    if (!isModel(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseGeometries(node: XMLNode, parent?: Partial<Geometries>): Geometries {
    const obj: Partial<Geometries> = parent ?? {};
    parseGeometryChildren(node, obj);
    
    
    if (!isGeometries(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseBasicGeometryAttributes(node: XMLNode, parent?: Partial<BasicGeometryAttributes>): BasicGeometryAttributes {
    const obj: Partial<BasicGeometryAttributes> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Model = parseNametype(node?.attributes?.["Model"]);
    obj.Position = parseMatrixtype(node?.attributes?.["Position"]);
    
    if (!isBasicGeometryAttributes(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseBasicGeometryType(node: XMLNode, parent?: Partial<BasicGeometryType>): BasicGeometryType {
    const obj: Partial<BasicGeometryType> = parent ?? {};
    
    
    
    if (!isBasicGeometryType(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseBeam(node: XMLNode, parent?: Partial<Beam>): Beam {
    const obj: Partial<Beam> = parent ?? {};
    
    
    
    if (!isBeam(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDisplay(node: XMLNode, parent?: Partial<Display>): Display {
    const obj: Partial<Display> = parent ?? {};
    
    
    
    if (!isDisplay(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseLaser(node: XMLNode, parent?: Partial<Laser>): Laser {
    const obj: Partial<Laser> = parent ?? {};
    
    
    
    if (!isLaser(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseProtocol(node: XMLNode, parent?: Partial<Protocol>): Protocol {
    const obj: Partial<Protocol> = parent ?? {};
    
    obj.Name = node?.attributes?.["Name"];
    
    if (!isProtocol(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseGeometryReference(node: XMLNode, parent?: Partial<GeometryReference>): GeometryReference {
    const obj: Partial<GeometryReference> = parent ?? {};
    
    
    
    if (!isGeometryReference(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseBreak(node: XMLNode, parent?: Partial<Break>): Break {
    const obj: Partial<Break> = parent ?? {};
    
    obj.DMXOffset = parseDmxaddresstype(node?.attributes?.["DMXOffset"]);
    obj.DMXBreak = parseFloat(node?.attributes?.["DMXBreak"]);
    
    if (!isBreak(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseWiringObject(node: XMLNode, parent?: Partial<WiringObject>): WiringObject {
    const obj: Partial<WiringObject> = parent ?? {};
    
    
    
    if (!isWiringObject(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePinPatch(node: XMLNode, parent?: Partial<PinPatch>): PinPatch {
    const obj: Partial<PinPatch> = parent ?? {};
    
    obj.ToWiringObject = parseNodetype(node?.attributes?.["ToWiringObject"]);
    obj.FromPin = parseFloat(node?.attributes?.["FromPin"]);
    obj.ToPin = parseFloat(node?.attributes?.["ToPin"]);
    
    if (!isPinPatch(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseInventory(node: XMLNode, parent?: Partial<Inventory>): Inventory {
    const obj: Partial<Inventory> = parent ?? {};
    
    
    
    if (!isInventory(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseStructure(node: XMLNode, parent?: Partial<Structure>): Structure {
    const obj: Partial<Structure> = parent ?? {};
    
    
    
    if (!isStructure(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSupport(node: XMLNode, parent?: Partial<Support>): Support {
    const obj: Partial<Support> = parent ?? {};
    
    
    
    if (!isSupport(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXModes(node: XMLNode, parent?: Partial<DMXModes>): DMXModes {
    const obj: Partial<DMXModes> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "DMXMode":
                if (!obj.DMXMode) {
                    obj.DMXMode = [];
                }
                obj.DMXMode.push(parseDMXMode(elem));
                break;
                
        }
    }
    if (!isDMXModes(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXMode(node: XMLNode, parent?: Partial<DMXMode>): DMXMode {
    const obj: Partial<DMXMode> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Geometry = parseNametype(node?.attributes?.["Geometry"]);
    obj.Description = node?.attributes?.["Description"];
    for (const elem of node.children) {
        switch(elem.type) {
            case "DMXChannels":
                if (!obj.DMXChannels) {
                    obj.DMXChannels = [];
                }
                obj.DMXChannels.push(parseDMXChannels(elem));
                break;
                
            case "Relations":
                if (!obj.Relations) {
                    obj.Relations = [];
                }
                obj.Relations.push(parseRelations(elem));
                break;
                
            case "FTMacros":
                if (!obj.FTMacros) {
                    obj.FTMacros = [];
                }
                obj.FTMacros.push(parseFTMacros(elem));
                break;
                
        }
    }
    if (!isDMXMode(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXChannels(node: XMLNode, parent?: Partial<DMXChannels>): DMXChannels {
    const obj: Partial<DMXChannels> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "DMXChannel":
                if (!obj.DMXChannel) {
                    obj.DMXChannel = [];
                }
                obj.DMXChannel.push(parseDMXChannel(elem));
                break;
                
        }
    }
    if (!isDMXChannels(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXChannel(node: XMLNode, parent?: Partial<DMXChannel>): DMXChannel {
    const obj: Partial<DMXChannel> = parent ?? {};
    
    obj.DMXBreak = parseDmxbreaktype(node?.attributes?.["DMXBreak"]);
    obj.Offset = parseOffsettype(node?.attributes?.["Offset"]);
    obj.InitialFunction = parseNodetype(node?.attributes?.["InitialFunction"]);
    obj.Highlight = parseDmxtype(node?.attributes?.["Highlight"]);
    obj.Geometry = parseNametype(node?.attributes?.["Geometry"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "LogicalChannel":
                if (!obj.LogicalChannel) {
                    obj.LogicalChannel = [];
                }
                obj.LogicalChannel.push(parseLogicalChannel(elem));
                break;
                
        }
    }
    if (!isDMXChannel(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseLogicalChannel(node: XMLNode, parent?: Partial<LogicalChannel>): LogicalChannel {
    const obj: Partial<LogicalChannel> = parent ?? {};
    
    obj.Attribute = parseNametype(node?.attributes?.["Attribute"]);
    obj.Snap = parseSnapEnum(node?.attributes?.["Snap"]);
    obj.Master = parseMasterEnum(node?.attributes?.["Master"]);
    obj.MibFade = parseFloat(node?.attributes?.["MibFade"]);
    obj.DMXChangeTimeLimit = parseFloat(node?.attributes?.["DMXChangeTimeLimit"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "ChannelFunction":
                if (!obj.ChannelFunction) {
                    obj.ChannelFunction = [];
                }
                obj.ChannelFunction.push(parseChannelFunction(elem));
                break;
                
        }
    }
    if (!isLogicalChannel(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseChannelFunction(node: XMLNode, parent?: Partial<ChannelFunction>): ChannelFunction {
    const obj: Partial<ChannelFunction> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Attribute = parseNametype(node?.attributes?.["Attribute"]);
    obj.OriginalAttribute = node?.attributes?.["OriginalAttribute"];
    obj.DMXFrom = parseDmxtype(node?.attributes?.["DMXFrom"]);
    obj.Default = parseDmxtype(node?.attributes?.["Default"]);
    obj.PhysicalFrom = parseFloat(node?.attributes?.["PhysicalFrom"]);
    obj.PhysicalTo = parseFloat(node?.attributes?.["PhysicalTo"]);
    obj.RealFade = parseFloat(node?.attributes?.["RealFade"]);
    obj.RealAcceleration = parseFloat(node?.attributes?.["RealAcceleration"]);
    obj.Wheel = parseNametype(node?.attributes?.["Wheel"]);
    obj.Emitter = parseNametype(node?.attributes?.["Emitter"]);
    obj.Filter = parseNametype(node?.attributes?.["Filter"]);
    obj.ColorSpace = parseNametype(node?.attributes?.["ColorSpace"]);
    obj.Gammut = parseNametype(node?.attributes?.["Gammut"]);
    obj.ModeMaster = parseNodetype(node?.attributes?.["ModeMaster"]);
    obj.ModeFrom = parseDmxtype(node?.attributes?.["ModeFrom"]);
    obj.ModeTo = parseDmxtype(node?.attributes?.["ModeTo"]);
    obj.DMXProfile = parseNodetype(node?.attributes?.["DMXProfile"]);
    obj.Min = parseFloat(node?.attributes?.["Min"]);
    obj.Max = parseFloat(node?.attributes?.["Max"]);
    obj.CustomName = node?.attributes?.["CustomName"];
    for (const elem of node.children) {
        switch(elem.type) {
            case "ChannelSet":
                if (!obj.ChannelSet) {
                    obj.ChannelSet = [];
                }
                obj.ChannelSet.push(parseChannelSet(elem));
                break;
                
            case "SubChannelSet":
                if (!obj.SubChannelSet) {
                    obj.SubChannelSet = [];
                }
                obj.SubChannelSet.push(parseSubChannelSet(elem));
                break;
                
        }
    }
    if (!isChannelFunction(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseChannelSet(node: XMLNode, parent?: Partial<ChannelSet>): ChannelSet {
    const obj: Partial<ChannelSet> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.DMXFrom = parseDmxtype(node?.attributes?.["DMXFrom"]);
    obj.PhysicalFrom = parseFloat(node?.attributes?.["PhysicalFrom"]);
    obj.PhysicalTo = parseFloat(node?.attributes?.["PhysicalTo"]);
    obj.WheelSlotIndex = parseFloat(node?.attributes?.["WheelSlotIndex"]);
    
    if (!isChannelSet(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSubChannelSet(node: XMLNode, parent?: Partial<SubChannelSet>): SubChannelSet {
    const obj: Partial<SubChannelSet> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.PhysicalFrom = node?.attributes?.["PhysicalFrom"];
    obj.PhysicalTo = node?.attributes?.["PhysicalTo"];
    obj.SubPhysicalUnit = parseNodetype(node?.attributes?.["SubPhysicalUnit"]);
    obj.DMXProfile = parseNodetype(node?.attributes?.["DMXProfile"]);
    
    if (!isSubChannelSet(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseRelations(node: XMLNode, parent?: Partial<Relations>): Relations {
    const obj: Partial<Relations> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Relation":
                if (!obj.Relation) {
                    obj.Relation = [];
                }
                obj.Relation.push(parseRelation(elem));
                break;
                
        }
    }
    if (!isRelations(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseRelation(node: XMLNode, parent?: Partial<Relation>): Relation {
    const obj: Partial<Relation> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.Master = parseNodetype(node?.attributes?.["Master"]);
    obj.Follower = parseNodetype(node?.attributes?.["Follower"]);
    obj.Type = parseRelationTypesEnum(node?.attributes?.["Type"]);
    
    if (!isRelation(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFTMacros(node: XMLNode, parent?: Partial<FTMacros>): FTMacros {
    const obj: Partial<FTMacros> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "FTMacro":
                if (!obj.FTMacro) {
                    obj.FTMacro = [];
                }
                obj.FTMacro.push(parseFTMacro(elem));
                break;
                
        }
    }
    if (!isFTMacros(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFTMacro(node: XMLNode, parent?: Partial<FTMacro>): FTMacro {
    const obj: Partial<FTMacro> = parent ?? {};
    
    obj.Name = parseNametype(node?.attributes?.["Name"]);
    obj.ChannelFunction = parseNodetype(node?.attributes?.["ChannelFunction"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "MacroDMX":
                if (!obj.MacroDMX) {
                    obj.MacroDMX = [];
                }
                obj.MacroDMX.push(parseMacroDMX(elem));
                break;
                
        }
    }
    if (!isFTMacro(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseMacroDMX(node: XMLNode, parent?: Partial<MacroDMX>): MacroDMX {
    const obj: Partial<MacroDMX> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "MacroDMXStep":
                if (!obj.MacroDMXStep) {
                    obj.MacroDMXStep = [];
                }
                obj.MacroDMXStep.push(parseMacroDMXStep(elem));
                break;
                
        }
    }
    if (!isMacroDMX(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseMacroDMXStep(node: XMLNode, parent?: Partial<MacroDMXStep>): MacroDMXStep {
    const obj: Partial<MacroDMXStep> = parent ?? {};
    
    obj.Duration = parseFloat(node?.attributes?.["Duration"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "MacroDMXValue":
                if (!obj.MacroDMXValue) {
                    obj.MacroDMXValue = [];
                }
                obj.MacroDMXValue.push(parseMacroDMXValue(elem));
                break;
                
        }
    }
    if (!isMacroDMXStep(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseMacroDMXValue(node: XMLNode, parent?: Partial<MacroDMXValue>): MacroDMXValue {
    const obj: Partial<MacroDMXValue> = parent ?? {};
    
    obj.Value = parseDmxtype(node?.attributes?.["Value"]);
    obj.DMXChannel = parseNodetype(node?.attributes?.["DMXChannel"]);
    
    if (!isMacroDMXValue(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseRevisions(node: XMLNode, parent?: Partial<Revisions>): Revisions {
    const obj: Partial<Revisions> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Revision":
                if (!obj.Revision) {
                    obj.Revision = [];
                }
                obj.Revision.push(parseRevision(elem));
                break;
                
        }
    }
    if (!isRevisions(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseRevision(node: XMLNode, parent?: Partial<Revision>): Revision {
    const obj: Partial<Revision> = parent ?? {};
    
    obj.Text = node?.attributes?.["Text"];
    obj.Date = node?.attributes?.["Date"];
    obj.UserID = parseFloat(node?.attributes?.["UserID"]);
    obj.ModifiedBy = node?.attributes?.["ModifiedBy"];
    
    if (!isRevision(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFTPresets(node: XMLNode, parent?: Partial<FTPresets>): FTPresets {
    const obj: Partial<FTPresets> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "FTPreset":
                if (!obj.FTPreset) {
                    obj.FTPreset = [];
                }
                obj.FTPreset.push(parseFTPreset(elem));
                break;
                
        }
    }
    if (!isFTPresets(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFTPreset(node: XMLNode, parent?: Partial<FTPreset>): FTPreset {
    const obj: Partial<FTPreset> = parent ?? {};
    
    
    
    if (!isFTPreset(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseProtocols(node: XMLNode, parent?: Partial<Protocols>): Protocols {
    const obj: Partial<Protocols> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "FTRDM":
                if (!obj.FTRDM) {
                    obj.FTRDM = [];
                }
                obj.FTRDM.push(parseFTRDM(elem));
                break;
                
            case "Art-Net":
                if (!obj.ArtNet) {
                    obj.ArtNet = [];
                }
                obj.ArtNet.push(parseArtNet(elem));
                break;
                
            case "sACN":
                if (!obj.sACN) {
                    obj.sACN = [];
                }
                obj.sACN.push(parseSACN(elem));
                break;
                
            case "PosiStageNet":
                if (!obj.PosiStageNet) {
                    obj.PosiStageNet = [];
                }
                obj.PosiStageNet.push(parsePosiStageNet(elem));
                break;
                
            case "OpenSoundControl":
                if (!obj.OpenSoundControl) {
                    obj.OpenSoundControl = [];
                }
                obj.OpenSoundControl.push(parseOpenSoundControl(elem));
                break;
                
            case "CITP":
                if (!obj.CITP) {
                    obj.CITP = [];
                }
                obj.CITP.push(parseCITP(elem));
                break;
                
        }
    }
    if (!isProtocols(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseArtNet(node: XMLNode, parent?: Partial<ArtNet>): ArtNet {
    const obj: Partial<ArtNet> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Map":
                if (!obj.Map) {
                    obj.Map = [];
                }
                obj.Map.push(parseMap(elem));
                break;
                
        }
    }
    if (!isArtNet(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseMap(node: XMLNode, parent?: Partial<Map>): Map {
    const obj: Partial<Map> = parent ?? {};
    
    obj.Key = parseFloat(node?.attributes?.["Key"]);
    obj.Value = parseFloat(node?.attributes?.["Value"]);
    
    if (!isMap(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSACN(node: XMLNode, parent?: Partial<sACN>): sACN {
    const obj: Partial<sACN> = parent ?? {};
    
    
    
    if (!isSACN(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePosiStageNet(node: XMLNode, parent?: Partial<PosiStageNet>): PosiStageNet {
    const obj: Partial<PosiStageNet> = parent ?? {};
    
    
    
    if (!isPosiStageNet(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseOpenSoundControl(node: XMLNode, parent?: Partial<OpenSoundControl>): OpenSoundControl {
    const obj: Partial<OpenSoundControl> = parent ?? {};
    
    
    
    if (!isOpenSoundControl(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseCITP(node: XMLNode, parent?: Partial<CITP>): CITP {
    const obj: Partial<CITP> = parent ?? {};
    
    
    
    if (!isCITP(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseFTRDM(node: XMLNode, parent?: Partial<FTRDM>): FTRDM {
    const obj: Partial<FTRDM> = parent ?? {};
    
    obj.ManufacturerID = parseHextype(node?.attributes?.["ManufacturerID"]);
    obj.DeviceModelID = parseHextype(node?.attributes?.["DeviceModelID"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "SoftwareVersionID":
                if (!obj.SoftwareVersionID) {
                    obj.SoftwareVersionID = [];
                }
                obj.SoftwareVersionID.push(parseSoftwareVersionID(elem));
                break;
                
        }
    }
    if (!isFTRDM(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseSoftwareVersionID(node: XMLNode, parent?: Partial<SoftwareVersionID>): SoftwareVersionID {
    const obj: Partial<SoftwareVersionID> = parent ?? {};
    
    obj.Value = parseHextype(node?.attributes?.["Value"]);
    for (const elem of node.children) {
        switch(elem.type) {
            case "DMXPersonality":
                if (!obj.DMXPersonality) {
                    obj.DMXPersonality = [];
                }
                obj.DMXPersonality.push(parseDMXPersonality(elem));
                break;
                
        }
    }
    if (!isSoftwareVersionID(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseDMXPersonality(node: XMLNode, parent?: Partial<DMXPersonality>): DMXPersonality {
    const obj: Partial<DMXPersonality> = parent ?? {};
    
    obj.Value = parseHextype(node?.attributes?.["Value"]);
    obj.DMXMode = parseNametype(node?.attributes?.["DMXMode"]);
    
    if (!isDMXPersonality(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parseGeometryChildren(node: XMLNode, parent?: Partial<GeometryChildren>): GeometryChildren {
    const obj: Partial<GeometryChildren> = parent ?? {};
    
    
    for (const elem of node.children) {
        switch(elem.type) {
            case "Geometry":
                if (!obj.Geometry) {
                    obj.Geometry = [];
                }
                obj.Geometry.push(parseBasicGeometryType(elem));
                break;
                
            case "Axis":
                if (!obj.Axis) {
                    obj.Axis = [];
                }
                obj.Axis.push(parseBasicGeometryType(elem));
                break;
                
            case "FilterBeam":
                if (!obj.FilterBeam) {
                    obj.FilterBeam = [];
                }
                obj.FilterBeam.push(parseBasicGeometryType(elem));
                break;
                
            case "FilterColor":
                if (!obj.FilterColor) {
                    obj.FilterColor = [];
                }
                obj.FilterColor.push(parseBasicGeometryType(elem));
                break;
                
            case "FilterGobo":
                if (!obj.FilterGobo) {
                    obj.FilterGobo = [];
                }
                obj.FilterGobo.push(parseBasicGeometryType(elem));
                break;
                
            case "FilterShaper":
                if (!obj.FilterShaper) {
                    obj.FilterShaper = [];
                }
                obj.FilterShaper.push(parseBasicGeometryType(elem));
                break;
                
            case "Beam":
                if (!obj.Beam) {
                    obj.Beam = [];
                }
                obj.Beam.push(parseBeam(elem));
                break;
                
            case "MediaServerLayer":
                if (!obj.MediaServerLayer) {
                    obj.MediaServerLayer = [];
                }
                obj.MediaServerLayer.push(parseBasicGeometryType(elem));
                break;
                
            case "MediaServerCamera":
                if (!obj.MediaServerCamera) {
                    obj.MediaServerCamera = [];
                }
                obj.MediaServerCamera.push(parseBasicGeometryType(elem));
                break;
                
            case "MediaServerMaster":
                if (!obj.MediaServerMaster) {
                    obj.MediaServerMaster = [];
                }
                obj.MediaServerMaster.push(parseBasicGeometryType(elem));
                break;
                
            case "Display":
                if (!obj.Display) {
                    obj.Display = [];
                }
                obj.Display.push(parseDisplay(elem));
                break;
                
            case "Laser":
                if (!obj.Laser) {
                    obj.Laser = [];
                }
                obj.Laser.push(parseLaser(elem));
                break;
                
            case "GeometryReference":
                if (!obj.GeometryReference) {
                    obj.GeometryReference = [];
                }
                obj.GeometryReference.push(parseGeometryReference(elem));
                break;
                
            case "WiringObject":
                if (!obj.WiringObject) {
                    obj.WiringObject = [];
                }
                obj.WiringObject.push(parseWiringObject(elem));
                break;
                
            case "Inventory":
                if (!obj.Inventory) {
                    obj.Inventory = [];
                }
                obj.Inventory.push(parseInventory(elem));
                break;
                
            case "Structure":
                if (!obj.Structure) {
                    obj.Structure = [];
                }
                obj.Structure.push(parseStructure(elem));
                break;
                
            case "Support":
                if (!obj.Support) {
                    obj.Support = [];
                }
                obj.Support.push(parseSupport(elem));
                break;
                
            case "Magnet":
                if (!obj.Magnet) {
                    obj.Magnet = [];
                }
                obj.Magnet.push(parseBasicGeometryType(elem));
                break;
                
        }
    }
    if (!isGeometryChildren(obj)) {
        throw new Error("");
    }   
    return obj;
}

function parsePositivefloat(node: XMLNode | string): positivefloat {

    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(`Field positivefloat is of an unexpected type ${typeof node}`)
    }
}


function parsePositiveinteger(node: XMLNode | string): positiveinteger {

    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(`Field positiveinteger is of an unexpected type ${typeof node}`)
    }
}


function parseHextype(node: XMLNode | string): hextype {
    return node as string
}


function parsePhysicaltype(node: XMLNode | string): physicaltype {

    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(`Field physicaltype is of an unexpected type ${typeof node}`)
    }
}


function parseTwoarray(node: XMLNode | string): twoarray {
    return node as string
}


function parseMatrixtype(node: XMLNode | string): matrixtype {
    return node as string
}


function parseRotationtype(node: XMLNode | string): rotationtype {
    return node as string
}


function parseColorcietype(node: XMLNode | string): colorcietype {
    return node as string
}


function parseOffsettype(node: XMLNode | string): offsettype {
    return node as string
}


function parseDmxtype(node: XMLNode | string): dmxtype {
    return node as string
}


function parseDmxaddresstype(node: XMLNode | string): dmxaddresstype {

    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(`Field dmxaddresstype is of an unexpected type ${typeof node}`)
    }
}


function parseNametype(node: XMLNode | string): nametype {
    return node as string
}


function parseFeaturetype(node: XMLNode | string): featuretype {
    return node as string
}


function parseNodetype(node: XMLNode | string): nodetype {
    return node as string
}


function parseDataversion(node: XMLNode | string): dataversion {

    if (typeof node === 'string') {
        return parseFloat(node);
    } else if (typeof node === 'number') {
        return node;
    } else {
        throw new Error(`Field dataversion is of an unexpected type ${typeof node}`)
    }
}


function parseGuidtype(node: XMLNode | string): guidtype {
    return node as string
}


function parseDmxbreaktype(node: XMLNode | string): dmxbreaktype {
    return node as string
}


function parsePhysicalUnitEnum(node: XMLNode | string): PhysicalUnitEnum {
    return node as string
}


function parseMasterEnum(node: XMLNode | string): MasterEnum {
    return node as string
}


function parsePrimitiveTypeEnum(node: XMLNode | string): PrimitiveTypeEnum {
    return node as string
}


function parseLampTypeEnum(node: XMLNode | string): LampTypeEnum {
    return node as string
}


function parseBeamTypeEnum(node: XMLNode | string): BeamTypeEnum {
    return node as string
}


function parseColorSpaceEnum(node: XMLNode | string): ColorSpaceEnum {
    return node as string
}


function parseInterpolationToEnum(node: XMLNode | string): InterpolationToEnum {
    return node as string
}


function parseSnapEnum(node: XMLNode | string): SnapEnum {
    return node as string
}


function parseYesNoEnum(node: XMLNode | string): YesNoEnum {
    return node as string
}


function parseRelationTypesEnum(node: XMLNode | string): RelationTypesEnum {
    return node as string
}


function parseCESEnum(node: XMLNode | string): CESEnum {
    return node as string
}


function parseSubPhysicalTypeEnum(node: XMLNode | string): SubPhysicalTypeEnum {
    return node as string
}


function parseLaserColorType(node: XMLNode | string): LaserColorType {
    return node as string
}


function parseWiringComponentType(node: XMLNode | string): WiringComponentType {
    return node as string
}


function parseWiringFuseRating(node: XMLNode | string): WiringFuseRating {
    return node as string
}


function parseWiringOrientation(node: XMLNode | string): WiringOrientation {
    return node as string
}


function parseStructureType(node: XMLNode | string): StructureType {
    return node as string
}


function parseCrossSectionType(node: XMLNode | string): CrossSectionType {
    return node as string
}


function parseSupportType(node: XMLNode | string): SupportType {
    return node as string
}


function isGDTF(obj: Partial<GDTF>): obj is GDTF {
    return true;
}    

function isFixtureType(obj: Partial<FixtureType>): obj is FixtureType {
    return true;
}

function isAttributeDefinitions(obj: Partial<AttributeDefinitions>): obj is AttributeDefinitions {
    return true;
}

function isActivationGroups(obj: Partial<ActivationGroups>): obj is ActivationGroups {
    return true;
}

function isFeatureGroups(obj: Partial<FeatureGroups>): obj is FeatureGroups {
    return true;
}

function isActivationGroup(obj: Partial<ActivationGroup>): obj is ActivationGroup {
    return true;
}

function isFeatureGroup(obj: Partial<FeatureGroup>): obj is FeatureGroup {
    return true;
}

function isFeature(obj: Partial<Feature>): obj is Feature {
    return true;
}

function isAttributes(obj: Partial<Attributes>): obj is Attributes {
    return true;
}

function isAttribute(obj: Partial<Attribute>): obj is Attribute {
    return true;
}

function isSubPhysicalUnit(obj: Partial<SubPhysicalUnit>): obj is SubPhysicalUnit {
    return true;
}

function isWheels(obj: Partial<Wheels>): obj is Wheels {
    return true;
}

function isWheel(obj: Partial<Wheel>): obj is Wheel {
    return true;
}

function isSlot(obj: Partial<Slot>): obj is Slot {
    return true;
}

function isFacet(obj: Partial<Facet>): obj is Facet {
    return true;
}

function isAnimationSystem(obj: Partial<AnimationSystem>): obj is AnimationSystem {
    return true;
}

function isPhysicalDescriptions(obj: Partial<PhysicalDescriptions>): obj is PhysicalDescriptions {
    return true;
}

function isEmitters(obj: Partial<Emitters>): obj is Emitters {
    return true;
}

function isEmitter(obj: Partial<Emitter>): obj is Emitter {
    return true;
}

function isEmitterMeasurement(obj: Partial<EmitterMeasurement>): obj is EmitterMeasurement {
    return true;
}

function isFilters(obj: Partial<Filters>): obj is Filters {
    return true;
}

function isFilter(obj: Partial<Filter>): obj is Filter {
    return true;
}

function isFilterMeasurement(obj: Partial<FilterMeasurement>): obj is FilterMeasurement {
    return true;
}

function isMeasurementPoint(obj: Partial<MeasurementPoint>): obj is MeasurementPoint {
    return true;
}

function isColorSpace(obj: Partial<ColorSpace>): obj is ColorSpace {
    return true;
}

function isAdditionalColorSpaces(obj: Partial<AdditionalColorSpaces>): obj is AdditionalColorSpaces {
    return true;
}

function isGamuts(obj: Partial<Gamuts>): obj is Gamuts {
    return true;
}

function isGamut(obj: Partial<Gamut>): obj is Gamut {
    return true;
}

function isDMXProfiles(obj: Partial<DMXProfiles>): obj is DMXProfiles {
    return true;
}

function isDMXProfile(obj: Partial<DMXProfile>): obj is DMXProfile {
    return true;
}

function isPoint(obj: Partial<Point>): obj is Point {
    return true;
}

function isCRIs(obj: Partial<CRIs>): obj is CRIs {
    return true;
}

function isCRIGroup(obj: Partial<CRIGroup>): obj is CRIGroup {
    return true;
}

function isCRI(obj: Partial<CRI>): obj is CRI {
    return true;
}

function isConnectors(obj: Partial<Connectors>): obj is Connectors {
    return true;
}

function isConnector(obj: Partial<Connector>): obj is Connector {
    return true;
}

function isProperties(obj: Partial<Properties>): obj is Properties {
    return true;
}

function isOperatingTemperature(obj: Partial<OperatingTemperature>): obj is OperatingTemperature {
    return true;
}

function isWeight(obj: Partial<Weight>): obj is Weight {
    return true;
}

function isPowerConsumption(obj: Partial<PowerConsumption>): obj is PowerConsumption {
    return true;
}

function isLegHeight(obj: Partial<LegHeight>): obj is LegHeight {
    return true;
}

function isModels(obj: Partial<Models>): obj is Models {
    return true;
}

function isModel(obj: Partial<Model>): obj is Model {
    return true;
}

function isGeometries(obj: Partial<Geometries>): obj is Geometries {
    return true;
}

function isBasicGeometryAttributes(obj: Partial<BasicGeometryAttributes>): obj is BasicGeometryAttributes {
    return true;
}

function isBasicGeometryType(obj: Partial<BasicGeometryType>): obj is BasicGeometryType {
    return true;
}

function isBeam(obj: Partial<Beam>): obj is Beam {
    return true;
}

function isDisplay(obj: Partial<Display>): obj is Display {
    return true;
}

function isLaser(obj: Partial<Laser>): obj is Laser {
    return true;
}

function isProtocol(obj: Partial<Protocol>): obj is Protocol {
    return true;
}

function isGeometryReference(obj: Partial<GeometryReference>): obj is GeometryReference {
    return true;
}

function isBreak(obj: Partial<Break>): obj is Break {
    return true;
}

function isWiringObject(obj: Partial<WiringObject>): obj is WiringObject {
    return true;
}

function isPinPatch(obj: Partial<PinPatch>): obj is PinPatch {
    return true;
}

function isInventory(obj: Partial<Inventory>): obj is Inventory {
    return true;
}

function isStructure(obj: Partial<Structure>): obj is Structure {
    return true;
}

function isSupport(obj: Partial<Support>): obj is Support {
    return true;
}

function isDMXModes(obj: Partial<DMXModes>): obj is DMXModes {
    return true;
}

function isDMXMode(obj: Partial<DMXMode>): obj is DMXMode {
    return true;
}

function isDMXChannels(obj: Partial<DMXChannels>): obj is DMXChannels {
    return true;
}

function isDMXChannel(obj: Partial<DMXChannel>): obj is DMXChannel {
    return true;
}

function isLogicalChannel(obj: Partial<LogicalChannel>): obj is LogicalChannel {
    return true;
}

function isChannelFunction(obj: Partial<ChannelFunction>): obj is ChannelFunction {
    return true;
}

function isChannelSet(obj: Partial<ChannelSet>): obj is ChannelSet {
    return true;
}

function isSubChannelSet(obj: Partial<SubChannelSet>): obj is SubChannelSet {
    return true;
}

function isRelations(obj: Partial<Relations>): obj is Relations {
    return true;
}

function isRelation(obj: Partial<Relation>): obj is Relation {
    return true;
}

function isFTMacros(obj: Partial<FTMacros>): obj is FTMacros {
    return true;
}

function isFTMacro(obj: Partial<FTMacro>): obj is FTMacro {
    return true;
}

function isMacroDMX(obj: Partial<MacroDMX>): obj is MacroDMX {
    return true;
}

function isMacroDMXStep(obj: Partial<MacroDMXStep>): obj is MacroDMXStep {
    return true;
}

function isMacroDMXValue(obj: Partial<MacroDMXValue>): obj is MacroDMXValue {
    return true;
}

function isRevisions(obj: Partial<Revisions>): obj is Revisions {
    return true;
}

function isRevision(obj: Partial<Revision>): obj is Revision {
    return true;
}

function isFTPresets(obj: Partial<FTPresets>): obj is FTPresets {
    return true;
}

function isFTPreset(obj: Partial<FTPreset>): obj is FTPreset {
    return true;
}

function isProtocols(obj: Partial<Protocols>): obj is Protocols {
    return true;
}

function isArtNet(obj: Partial<ArtNet>): obj is ArtNet {
    return true;
}

function isMap(obj: Partial<Map>): obj is Map {
    return true;
}

function isSACN(obj: Partial<sACN>): obj is sACN {
    return true;
}

function isPosiStageNet(obj: Partial<PosiStageNet>): obj is PosiStageNet {
    return true;
}

function isOpenSoundControl(obj: Partial<OpenSoundControl>): obj is OpenSoundControl {
    return true;
}

function isCITP(obj: Partial<CITP>): obj is CITP {
    return true;
}

function isFTRDM(obj: Partial<FTRDM>): obj is FTRDM {
    return true;
}

function isSoftwareVersionID(obj: Partial<SoftwareVersionID>): obj is SoftwareVersionID {
    return true;
}

function isDMXPersonality(obj: Partial<DMXPersonality>): obj is DMXPersonality {
    return true;
}

function isGeometryChildren(obj: Partial<GeometryChildren>): obj is GeometryChildren {
    return true;
}

function isPositivefloat(obj: any): obj is positivefloat {
    return true;
}

function isPositiveinteger(obj: any): obj is positiveinteger {
    return true;
}

function isHextype(obj: any): obj is hextype {
    return true;
}

function isPhysicaltype(obj: any): obj is physicaltype {
    return true;
}

function isTwoarray(obj: any): obj is twoarray {
    return true;
}

function isMatrixtype(obj: any): obj is matrixtype {
    return true;
}

function isRotationtype(obj: any): obj is rotationtype {
    return true;
}

function isColorcietype(obj: any): obj is colorcietype {
    return true;
}

function isOffsettype(obj: any): obj is offsettype {
    return true;
}

function isDmxtype(obj: any): obj is dmxtype {
    return true;
}

function isDmxaddresstype(obj: any): obj is dmxaddresstype {
    return true;
}

function isNametype(obj: any): obj is nametype {
    return true;
}

function isFeaturetype(obj: any): obj is featuretype {
    return true;
}

function isNodetype(obj: any): obj is nodetype {
    return true;
}

function isDataversion(obj: any): obj is dataversion {
    return true;
}

function isGuidtype(obj: any): obj is guidtype {
    return true;
}

function isDmxbreaktype(obj: any): obj is dmxbreaktype {
    return true;
}

function isPhysicalUnitEnum(obj: any): obj is PhysicalUnitEnum {
    return true;
}

function isMasterEnum(obj: any): obj is MasterEnum {
    return true;
}

function isPrimitiveTypeEnum(obj: any): obj is PrimitiveTypeEnum {
    return true;
}

function isLampTypeEnum(obj: any): obj is LampTypeEnum {
    return true;
}

function isBeamTypeEnum(obj: any): obj is BeamTypeEnum {
    return true;
}

function isColorSpaceEnum(obj: any): obj is ColorSpaceEnum {
    return true;
}

function isInterpolationToEnum(obj: any): obj is InterpolationToEnum {
    return true;
}

function isSnapEnum(obj: any): obj is SnapEnum {
    return true;
}

function isYesNoEnum(obj: any): obj is YesNoEnum {
    return true;
}

function isRelationTypesEnum(obj: any): obj is RelationTypesEnum {
    return true;
}

function isCESEnum(obj: any): obj is CESEnum {
    return true;
}

function isSubPhysicalTypeEnum(obj: any): obj is SubPhysicalTypeEnum {
    return true;
}

function isLaserColorType(obj: any): obj is LaserColorType {
    return true;
}

function isWiringComponentType(obj: any): obj is WiringComponentType {
    return true;
}

function isWiringFuseRating(obj: any): obj is WiringFuseRating {
    return true;
}

function isWiringOrientation(obj: any): obj is WiringOrientation {
    return true;
}

function isStructureType(obj: any): obj is StructureType {
    return true;
}

function isCrossSectionType(obj: any): obj is CrossSectionType {
    return true;
}

function isSupportType(obj: any): obj is SupportType {
    return true;
}

