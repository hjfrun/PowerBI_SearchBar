"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class ButtonSettings {
  public backgroundColor: string = "bisque";
  public fontSize: number = 16;
}

export class VisualSettings extends DataViewObjectsParser {
  public buttonSettings: ButtonSettings = new ButtonSettings();
}

