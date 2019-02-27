import webData from './web-data'

import {getCurrentScript} from "./utils"

(function (win) {

    function PredemWebSdk() {

        this.sendEvent = function (eventName: string, eventData: string) {
            return predem.sendEvents([{eventName: eventName, eventData: eventData}]);
        };

        this.sendEvents = function (events: any[]) {
            return predem.sendEvents(events);

        };
    }

    win["predem"] = new PredemWebSdk();


})(window);


const APP_KEY_LENGTH = 24;
const APP_ID_LENGTH = 8;


class Predem {

    constructor() {
        const currentScript = getCurrentScript();
        if (!currentScript) {
            console.error("没有获取pre-dem-web script!");
        }
        const appKey = currentScript.getAttribute("data-app-key");
        if (appKey.length != APP_KEY_LENGTH) {
            console.error("appKey error");
            return
        }
        const domain = currentScript.getAttribute("data-domain");
        if (domain.length == 0) {
            console.error("domain can not be null");
            return
        }
        const appId = appKey.substring(0, APP_ID_LENGTH);

        webData.init(appId, domain);

    }

    sendEvents(events: any[]): any {
        if (!(events instanceof Array)) {
            console.log("Custom data need type Array");
            return
        }

        if (events.length === 0) {
            console.error("Custom data can not be empty");
            return
        }
        const event = events[0];
        if (event.eventName === "undefine" || event.eventData === "undefine") {
            console.error("Custom data must have eventName and eventData");
            return;
        }

        return webData.sendEventData(events);

    }





}


const predem = new Predem();

module.exports = predem;




