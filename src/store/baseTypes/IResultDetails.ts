import { ResultStatus } from "./ResultStatus";

export interface IResultDetails {
    resultStatus: ResultStatus;
    message: string;
    staleEntity: StaleEntity;
}

export class StaleEntity {
    public nextData: any | null = null;
    public previousData: any | null = null;
    public propertyName: string | null = null;
}
