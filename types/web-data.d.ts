/**
 * Created by sunfei on 2017/9/8.
 */
export declare class WebData {
    appId: string;
    domain: string;
    uuid: string;
    appVersion: string;
    tag: string;
    constructor();
    init(appId: string, domain: string): void;
    sendEventData(batchData: any[]): any;
    request(url: string, method: string, ContentType: string, data: any): any;
    getRequestFun(url: string, type: string, result: string): any;
    initCustomEvent(tag: string, name: string, content: string): any;
}
declare const webData: WebData;
export default webData;
