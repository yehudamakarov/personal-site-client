import { IAuthState } from "../store/entities/auth/actions/authReducer";
import { IUiState } from "../store/ui/IUiState";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};
export const saveState = (savableState: { auth: IAuthState; ui: IUiState }) => {
    try {
        const serializedState = JSON.stringify(savableState);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
};
