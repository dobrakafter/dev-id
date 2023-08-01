import { IUser } from "./user";
import * as JQuery from "jquery";

declare namespace Models {

    export interface User extends IUser {
    }

    export interface InfoRequest {
        id: string;
    }

    export interface InfoResponse {
        width: number;
        height: number;
    }
}

export = Models
export as namespace Models;
