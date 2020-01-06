import { useSelector } from "react-redux";
import { authHelper } from "../../helpers/authHelpers";
import { roleType } from "../../store/entities/auth/actions/authReducer";
import { IApplicationState } from "../../store/rootReducer";

export const useAuth = (allowedRoles?: roleType[]) => {
    const isLoggedIn = useSelector((state: IApplicationState) => state.auth.loggedIn);
    const expiryTime = useSelector((state: IApplicationState) => state.auth.expiryTime);
    const role = useSelector((state: IApplicationState) => state.auth.role);

    return authHelper(isLoggedIn, expiryTime, role, allowedRoles);
};
