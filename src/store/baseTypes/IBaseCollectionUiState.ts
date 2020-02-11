import { IBooleanMap } from "./IBooleanMap";

export interface IBaseCollectionUiState {
    allIsLoading: boolean;
    allIsError: boolean;
    singleIsError: IBooleanMap;
    singleIsLoading: IBooleanMap;
}
