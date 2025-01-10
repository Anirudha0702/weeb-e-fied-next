import { TStatus } from "../types";

export const status:Record<string,TStatus>={
    RELEASING:"RELEASING",
    NOT_YET_RELEASED:"NOT_YET_RELEASED",
    CANCELLED:"CANCELLED",
    FINISHED:"FINISHED",
    HIATUS:"HIATUS"
}