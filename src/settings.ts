"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class ButtonSettings {
  public backgroundColor: string = "bisque";
  public fontSize: number = 16;
  public buttonWidth: number = 80;
  public buttonHeight: number = 40;
  public marginLeft: number = 20;
  public marginTop: number = 5;
  public borderRadius: number = 20;
}

export class VisualSettings extends DataViewObjectsParser {
  public buttonSettings: ButtonSettings = new ButtonSettings();
}

