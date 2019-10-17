"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class TextInputSettings {
  public fontSize: number = 25;
  public baseUrl: string = "http://www.google.com/search?q=";
}

export class ButtonSettings {
  public backgroundColor: string = "bisque";
  public textColor: string = "white";
  public fontSize: number = 16;
  public buttonWidth: number = 80;
  public buttonHeight: number = 40;
  public marginLeft: number = 20;
  public marginTop: number = 5;
  public borderRadius: number = 20;
}

export class VisualSettings extends DataViewObjectsParser {
  public textInputSettings: TextInputSettings = new TextInputSettings();
  public buttonSettings: ButtonSettings = new ButtonSettings();
}

