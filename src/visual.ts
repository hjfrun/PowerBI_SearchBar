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
    private keyword_input: HTMLElement;
    private search_button: HTMLElement;
    private outer_div: HTMLElement;
    private search_base_url: string;
    private marketString: string;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        if (document) {
            this.outer_div = document.createElement("div");
            this.keyword_input = document.createElement("input");
            this.keyword_input.setAttribute("type", "text");
            this.keyword_input.setAttribute("placeholder", "Search keyword...");
            this.keyword_input.setAttribute("id", "keyword-input");
            this.keyword_input.addEventListener("keyup", (e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    document.getElementById("search-button").click();
                }
            });
            this.outer_div.appendChild(this.keyword_input);

            this.search_button = document.createElement("button");
            this.search_button.setAttribute("type", "button");
            this.search_button.setAttribute("id", "search-button");
            this.search_button.appendChild(document.createTextNode("Search"));
            this.search_button.addEventListener("click", () => {
                var keyword = (<HTMLInputElement>document.getElementById("keyword-input")).value;
                var url = this.search_base_url + '/#/search?keywords=' + keyword + '&market=' + this.marketString;
                console.log('url: ', url);
                options.host.launchUrl(url);
            })
            this.outer_div.appendChild(this.search_button);
            this.target.appendChild(this.outer_div);
        }
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        this.marketString = this.parseMarketSelections(options && options.dataViews && options.dataViews[0]);
    
        // set the text input style
        this.keyword_input.style.fontSize = `${this.settings.textInputSettings.fontSize}px`;
        this.search_base_url = this.settings.textInputSettings.baseUrl;
        this.keyword_input.style.width = `${this.settings.textInputSettings.textInputWidth}%`;

        // set the button style
        this.search_button.style.color = this.settings.buttonSettings.textColor;
        this.search_button.style.backgroundColor = this.settings.buttonSettings.backgroundColor;
        this.search_button.style.fontSize = `${this.settings.buttonSettings.fontSize}px`;
        this.search_button.style.width = `${this.settings.buttonSettings.buttonWidth}px`;
        this.search_button.style.height = `${this.settings.buttonSettings.buttonHeight}px`;
        this.search_button.style.marginLeft = `${this.settings.buttonSettings.marginLeft}px`;
        this.search_button.style.marginTop = `${this.settings.buttonSettings.marginTop}px`;
        this.search_button.style.borderRadius = `${this.settings.buttonSettings.borderRadius}px`;

    }

    private parseMarketSelections(dataView: DataView): string {
        var markets = dataView.categorical.categories[0].values;
        var marketString = markets.join(',').replace(/ /g, '%20');

        return marketString;
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