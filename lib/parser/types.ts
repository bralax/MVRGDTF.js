
export interface GDTF  {
   DataVersion: dataversion;
   FixtureType?: FixtureType[];
}


export interface FixtureType  {
   Name: nametype;
   ShortName?: string;
   LongName?: string;
   Manufacturer: string;
   Description: string;
   FixtureTypeID: guidtype;
   Thumbnail?: string;
   ThumbnailOffsetX?: number;
   ThumbnailOffsetY?: number;
   RefFT?: guidtype;
   CanHaveChildren?: YesNoEnum;
   AttributeDefinitions: AttributeDefinitions[];
   Wheels?: Wheels[];
   PhysicalDescriptions?: PhysicalDescriptions[];
   Models?: Models[];
   Geometries: Geometries[];
   DMXModes: DMXModes[];
   Revisions?: Revisions[];
   FTPresets?: FTPresets[];
   Protocols?: Protocols[];
}


export interface AttributeDefinitions  {
   ActivationGroups?: ActivationGroups[];
   FeatureGroups: FeatureGroups[];
   Attributes: Attributes[];
}


export interface ActivationGroups  {
   ActivationGroup?: ActivationGroup[];
}


export interface FeatureGroups  {
   FeatureGroup?: FeatureGroup[];
}


export interface ActivationGroup  {
   Name: nametype;

}


export interface FeatureGroup  {
   Name: nametype;
   Pretty: string;
   Feature?: Feature[];
}


export interface Feature  {
   Name: nametype;

}


export interface Attributes  {
   Attribute?: Attribute[];
}


export interface Attribute  {
   Name: nametype;
   Pretty: string;
   ActivationGroup?: string;
   Feature: featuretype;
   MainAttribute?: nametype;
   PhysicalUnit?: PhysicalUnitEnum;
   Color?: colorcietype;
   SubPhysicalUnit?: SubPhysicalUnit[];
}


export interface SubPhysicalUnit  {
   Type?: SubPhysicalTypeEnum;
   PhysicalUnit?: PhysicalUnitEnum;
   PhysicalFrom?: number;
   PhysicalTo?: number;

}


export interface Wheels  {
   Wheel?: Wheel[];
}


export interface Wheel  {
   Name?: nametype;
   Slot?: Slot[];
}


export interface Slot  {
   Name: string;
   Color?: colorcietype;
   Filter?: nametype;
   MediaFileName?: string;
   Facet: Facet[];
   AnimationSystem?: AnimationSystem[];
}


export interface Facet  {
   Color?: colorcietype;
   Rotation: rotationtype;

}


export interface AnimationSystem  {
   P1: twoarray;
   P2: twoarray;
   P3: twoarray;
   Radius: positivefloat;

}


export interface PhysicalDescriptions  {
   Emitters?: Emitters[];
   Filters?: Filters[];
   ColorSpace?: ColorSpace[];
   AdditionalColorSpaces?: AdditionalColorSpaces[];
   Gamuts?: Gamuts[];
   DMXProfiles?: DMXProfiles[];
   CRIs?: CRIs[];
   Connectors?: Connectors[];
   Properties?: Properties[];
}


export interface Emitters  {
   Emitter?: Emitter[];
}


export interface Emitter  {
   Name: nametype;
   Color?: colorcietype;
   DominantWaveLength?: number;
   DiodePart?: string;
   Measurement?: EmitterMeasurement[];
}


export interface EmitterMeasurement  {
   Physical: physicaltype;
   LuminousIntensity: number;
   InterpolationTo?: InterpolationToEnum;
   Transmission?: number;
   MeasurementPoint?: MeasurementPoint[];
}


export interface Filters  {
   Filter?: Filter[];
}


export interface Filter  {
   Name: nametype;
   Color?: colorcietype;
   Measurement?: FilterMeasurement[];
}


export interface FilterMeasurement  {
   Physical: physicaltype;
   Transmission: number;
   InterpolationTo?: InterpolationToEnum;
   MeasurementPoint?: MeasurementPoint[];
}


export interface MeasurementPoint  {
   WaveLength: number;
   Energy: number;

}


export interface ColorSpace  {
   Name?: nametype;
   Mode?: ColorSpaceEnum;
   Red?: colorcietype;
   Green?: colorcietype;
   Blue?: colorcietype;
   WhitePoint?: colorcietype;

}


export interface AdditionalColorSpaces  {
   ColorSpace?: ColorSpace[];
}


export interface Gamuts  {
   Gamut?: Gamut[];
}


export interface Gamut  {
   Name?: nametype;
   Points?: string;

}


export interface DMXProfiles  {
   DMXProfile?: DMXProfile[];
}


export interface DMXProfile  {
   Name?: nametype;
   Point?: Point[];
}


export interface Point  {
   DMXPercentage?: number;
   CFC0?: number;
   CFC1?: number;
   CFC2?: number;
   CFC3?: number;

}


export interface CRIs  {
   CRIGroup?: CRIGroup[];
}


export interface CRIGroup  {
   ColorTemperature?: number;
   CRI?: CRI[];
}


export interface CRI  {
   CES?: CESEnum;
   ColorRenderingIndex?: number;

}


export interface Connectors  {
   Connector?: Connector[];
}


export interface Connector  {
   Name: nametype;
   Type: nametype;
   DMXBreak?: positiveinteger;
   Gender?: number;
   Length?: positivefloat;

}


export interface Properties  {
   OperatingTemperature?: OperatingTemperature[];
   Weight?: Weight[];
   PowerConsumption?: PowerConsumption[];
   LegHeight?: LegHeight[];
}


export interface OperatingTemperature  {
   Low?: number;
   High?: number;

}


export interface Weight  {
   Value?: number;

}


export interface PowerConsumption  {
   Value?: number;
   PowerFactor?: number;
   Connector: nametype;
   VoltageLow?: number;
   VoltageHigh?: number;
   FrequencyLow?: number;
   FrequencyHigh?: number;

}


export interface LegHeight  {
   Value?: number;

}


export interface Models  {
   Model?: Model[];
}


export interface Model  {
   Name: nametype;
   Length?: number;
   Width?: number;
   Height?: number;
   PrimitiveType?: PrimitiveTypeEnum;
   File?: string;
   SVGOffsetX?: number;
   SVGOffsetY?: number;
   SVGSideOffsetX?: number;
   SVGSideOffsetY?: number;
   SVGFrontOffsetX?: number;
   SVGFrontOffsetY?: number;

}


export interface Geometries extends GeometryChildren {

}


export interface BasicGeometryAttributes  {
   Name: nametype;
   Model?: nametype;
   Position?: matrixtype;

}


export interface BasicGeometryType  {

}


export interface Beam  {

}


export interface Display  {

}


export interface Laser  {

}


export interface Protocol  {
   Name?: string;

}


export interface GeometryReference  {

}


export interface Break  {
   DMXOffset?: dmxaddresstype;
   DMXBreak?: number;

}


export interface WiringObject  {

}


export interface PinPatch  {
   ToWiringObject?: nodetype;
   FromPin?: number;
   ToPin?: number;

}


export interface Inventory  {

}


export interface Structure  {

}


export interface Support  {

}


export interface DMXModes  {
   DMXMode?: DMXMode[];
}


export interface DMXMode  {
   Name: nametype;
   Geometry: nametype;
   Description?: string;
   DMXChannels?: DMXChannels[];
   Relations?: Relations[];
   FTMacros?: FTMacros[];
}


export interface DMXChannels  {
   DMXChannel?: DMXChannel[];
}


export interface DMXChannel  {
   DMXBreak?: dmxbreaktype;
   Offset?: offsettype;
   InitialFunction?: nodetype;
   Highlight?: dmxtype;
   Geometry: nametype;
   LogicalChannel?: LogicalChannel[];
}


export interface LogicalChannel  {
   Attribute: nametype;
   Snap?: SnapEnum;
   Master?: MasterEnum;
   MibFade?: number;
   DMXChangeTimeLimit?: number;
   ChannelFunction?: ChannelFunction[];
}


export interface ChannelFunction  {
   Name?: nametype;
   Attribute?: nametype;
   OriginalAttribute?: string;
   DMXFrom?: dmxtype;
   Default: dmxtype;
   PhysicalFrom?: number;
   PhysicalTo?: number;
   RealFade?: number;
   RealAcceleration?: number;
   Wheel?: nametype;
   Emitter?: nametype;
   Filter?: nametype;
   ColorSpace?: nametype;
   Gammut?: nametype;
   ModeMaster?: nodetype;
   ModeFrom?: dmxtype;
   ModeTo?: dmxtype;
   DMXProfile?: nodetype;
   Min?: number;
   Max?: number;
   CustomName?: string;
   ChannelSet?: ChannelSet[];
   SubChannelSet?: SubChannelSet[];
}


export interface ChannelSet  {
   Name?: nametype;
   DMXFrom?: dmxtype;
   PhysicalFrom?: number;
   PhysicalTo?: number;
   WheelSlotIndex?: number;

}


export interface SubChannelSet  {
   Name?: nametype;
   PhysicalFrom?: string;
   PhysicalTo?: string;
   SubPhysicalUnit?: nodetype;
   DMXProfile?: nodetype;

}


export interface Relations  {
   Relation?: Relation[];
}


export interface Relation  {
   Name: nametype;
   Master: nodetype;
   Follower: nodetype;
   Type: RelationTypesEnum;

}


export interface FTMacros  {
   FTMacro?: FTMacro[];
}


export interface FTMacro  {
   Name: nametype;
   ChannelFunction?: nodetype;
   MacroDMX?: MacroDMX[];
}


export interface MacroDMX  {
   MacroDMXStep?: MacroDMXStep[];
}


export interface MacroDMXStep  {
   Duration?: number;
   MacroDMXValue?: MacroDMXValue[];
}


export interface MacroDMXValue  {
   Value: dmxtype;
   DMXChannel: nodetype;

}


export interface Revisions  {
   Revision?: Revision[];
}


export interface Revision  {
   Text?: string;
   Date?: string;
   UserID?: number;
   ModifiedBy?: string;

}


export interface FTPresets  {
   FTPreset?: FTPreset[];
}


export interface FTPreset  {

}


export interface Protocols  {
   FTRDM?: FTRDM[];
   ArtNet?: ArtNet[];
   sACN?: sACN[];
   PosiStageNet?: PosiStageNet[];
   OpenSoundControl?: OpenSoundControl[];
   CITP?: CITP[];
}


export interface ArtNet  {
   Map?: Map[];
}


export interface Map  {
   Key?: number;
   Value?: number;

}


export interface sACN  {

}


export interface PosiStageNet  {

}


export interface OpenSoundControl  {

}


export interface CITP  {

}


export interface FTRDM  {
   ManufacturerID?: hextype;
   DeviceModelID?: hextype;
   SoftwareVersionID?: SoftwareVersionID[];
}


export interface SoftwareVersionID  {
   Value?: hextype;
   DMXPersonality?: DMXPersonality[];
}


export interface DMXPersonality  {
   Value?: hextype;
   DMXMode?: nametype;

}


export interface GeometryChildren  {
   Geometry?: BasicGeometryType[];
   Axis?: BasicGeometryType[];
   FilterBeam?: BasicGeometryType[];
   FilterColor?: BasicGeometryType[];
   FilterGobo?: BasicGeometryType[];
   FilterShaper?: BasicGeometryType[];
   Beam?: Beam[];
   MediaServerLayer?: BasicGeometryType[];
   MediaServerCamera?: BasicGeometryType[];
   MediaServerMaster?: BasicGeometryType[];
   Display?: Display[];
   Laser?: Laser[];
   GeometryReference?: GeometryReference[];
   WiringObject?: WiringObject[];
   Inventory?: Inventory[];
   Structure?: Structure[];
   Support?: Support[];
   Magnet?: BasicGeometryType[];
}

export type positivefloat = number;

export type positiveinteger = number;

export type hextype = string;

export type physicaltype = number;

export type twoarray = string;

export type matrixtype = string;

export type rotationtype = string;

export type colorcietype = string;

export type offsettype = string;

export type dmxtype = string;

export type dmxaddresstype = number;

export type nametype = string;

export type featuretype = string;

export type nodetype = string;

export type dataversion = number;

export type guidtype = string;

export type dmxbreaktype = string;

export type PhysicalUnitEnum = string;

export type MasterEnum = string;

export type PrimitiveTypeEnum = string;

export type LampTypeEnum = string;

export type BeamTypeEnum = string;

export type ColorSpaceEnum = string;

export type InterpolationToEnum = string;

export type SnapEnum = string;

export type YesNoEnum = string;

export type RelationTypesEnum = string;

export type CESEnum = string;

export type SubPhysicalTypeEnum = string;

export type LaserColorType = string;

export type WiringComponentType = string;

export type WiringFuseRating = string;

export type WiringOrientation = string;

export type StructureType = string;

export type CrossSectionType = string;

export type SupportType = string;