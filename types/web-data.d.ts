/**
 * Created by sunfei on 2017/9/8.
 */
export declare class WebData {
    appId: string;
    domain: string;
    tag: string;
    uuid: string;
    appVersion: string;
    constructor();
    init(appId: string, domain: string): void;
    setTag(tag: string): void;
    setVersion(version: string): void;
    sendEventData(batchData: any[]): any;
    request(url: string, method: string, ContentType: string, data: any): any;
    getRequestFun(url: string, type: string, result: string): any;
    initCustomEvent(tag: string, name: string, content: string): any;
}
declare const webData: WebData;
export default webData;
