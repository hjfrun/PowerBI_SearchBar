"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        if (document) {
            // add outer div
            const outer_div: HTMLElement = document.createElement("div");
            outer_div.setAttribute("id", "outer");

            // create the input
            const keyword_input: HTMLElement = document.createElement("input");
            keyword_input.setAttribute("type", "text");
            keyword_input.setAttribute("placeholder", "Searching keyword...");
            keyword_input.setAttribute("name", "keyword");
            keyword_input.setAttribute("id", "keyword-input");

            // add the text input
            outer_div.appendChild(keyword_input);

            // create the search button
            const search_button: HTMLElement = document.createElement("button");
            search_button.appendChild(document.createTextNode("Search"));
            search_button.setAttribute("type", "button");
            search_button.addEventListener("click", () => {
                var keyword = (<HTMLInputElement>document.getElementById("keyword-input")).value;
                var url = "http://www.google.com/search?q=" + keyword;
                console.log('url: ', url);
                options.host.launchUrl(url);
            })
            
            // add the search button
            outer_div.appendChild(search_button);

            // add outer div to window
            this.target.appendChild(outer_div);
        }
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}