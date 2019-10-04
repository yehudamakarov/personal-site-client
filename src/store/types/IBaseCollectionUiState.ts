import { IErrorMap } from "./IErrorMap";
export interface IBaseCollectionUiState {
    allIsLoading: boolean;
    allIsError: boolean;
    singleIsError: IErrorMap;
    singleIsLoading: IErrorMap;
}
