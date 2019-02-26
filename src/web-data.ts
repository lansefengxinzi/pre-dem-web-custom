/**
 * Created by sunfei on 2017/9/8.
 */

import {_window} from './detection'
import * as reqwest from "reqwest";

import {
    getCookier, setCookier, generateUUID
    , localStorageIsSupported
} from './utils'


const packageJson = require('../package.json');
const VERSION = packageJson.version;


export class WebData {
    appId: string;
    domain: string;
    tag: string;
    uuid: string;
    appVersion: string;

    constructor() {
        this.appId = "";
        this.domain = "";
        this.tag = "";
        this.appVersion = "1.0.0";

        let predemUuid = "";

        if (localStorageIsSupported()) {
            predemUuid = window.localStorage["predemUuid"];
        } else {
            predemUuid = getCookier(predemUuid);

        }

        if (predemUuid !== undefined && predemUuid !== null && predemUuid.length > 0) {
            this.uuid = predemUuid;
        } else {
            predemUuid = generateUUID();
            if (localStorageIsSupported()) {
                window.localStorage["predemUuid"] = predemUuid;
            } else {
                setCookier("predemUuid", predemUuid);
            }
            this.uuid = predemUuid;
        }
    }

    init(appId: string, domain: string): void {
        this.appId = appId;
        this.domain = domain;
    }

    setTag(tag: string): void {
        this.tag = tag;
    }

    setVersion(version: string): void {
        this.appVersion = version;
    }

    sendEventData(batchData: any[]): any {
        const url = `${this.domain}/v2/${this.appId}/custom-events`;
        let data = "";
        batchData.map((event: any) => {
            const eventData = JSON.stringify(event.eventData);
            const eventstr = this.initCustomEvent(this.tag, event.eventName, eventData);
            data += JSON.stringify(eventstr) + "\n"
        });
        return this.request(url, 'POST', 'text/plain', data);
    }

    request(url: string, method: string, ContentType: string, data: any): any {
        if (_window._origin_fetch) {
            return _window._origin_fetch(url, {
                method: method,
                headers: {
                    'Content-Type': ContentType,
                },
                body: data,
            });
        } else {
            return reqwest({
                url: url,
                method: method,
                headers: {
                    'Content-Type': ContentType,
                },
                body: data,
            })
        }
    }

    getRequestFun(url: string, type: string, result: string): any {
        this.request(url, 'POST', 'application/json', result);
    }

    initCustomEvent(tag: string, name: string, content: string): any {
        return {
            time: Date.now(),
            type: "custom",
            name: name,
            app_version: this.appVersion,
            sdk_version: VERSION,
            sdk_id: this.uuid,
            tag: tag,
            content: content,
        }
    }

}

const webData = new WebData();

export default webData;
