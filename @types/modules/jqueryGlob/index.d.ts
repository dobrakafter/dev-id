import * as Models from "models";

export interface IngParams {
    name: "select" | "open" | "close" | "unselect";
    prevented: boolean;
}

export type JQueryEventHandlerBase<TContext, T> =
    (this: TContext, t: T, ...args: any[]) => void | false;

export interface Event<TElement, T> extends BaseJQueryEventObject {
    params: T;
}

export interface Trigger {
    type: "select2:select";
    params: {
        data: string;
    };
}

declare global {

    interface JQuery<TElement = HTMLElement> {
        trigger(events: Trigger): void;
        on(events: "kucing", handler?: JQueryEventHandlerBase<TElement, Event<TElement, IngParams>>): this;
        on(events: "sapi", handler?: (ev: _Event, data: Models.User) => void): void;
        on(events: "wedus", handler?: (ev: _Event, response: Models.InfoResponse, user: Models.User) => void): void;
    }
}
