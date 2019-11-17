import { useSelector } from "react-redux";
import { roleType } from "../../store/actions/auth/authReducer";
import { IApplicationState } from "../../store/rootReducer";

export const useAuth = (roles: roleType[]) => {
    const isLoggedIn = useSelector(
        (state: IApplicationState) => state.auth.loggedIn,
    );
    const expiryTime = useSelector(
        (state: IApplicationState) => state.auth.expiryTime,
    );
    const role = useSelector((state: IApplicationState) => state.auth.role);

    if (!isLoggedIn) {
        return false;
    }
    if (expiryTime && expiryTime * 1000 <= Date.now()) {
        return false;
    }
    return roles.some((possibleRole) => possibleRole === role);
};
