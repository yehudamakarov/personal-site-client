/* -------------------------------------------------------------------------- */
/*                          setAnyProjectIsEditableAction                          */
/* -------------------------------------------------------------------------- */

export const SET_ANY_PROJECT_IS_EDITABLE = "SET_ANY_PROJECT_IS_EDITABLE";

export interface ISetAnyProjectIsEditableAction {
    payload: boolean;
    type: typeof SET_ANY_PROJECT_IS_EDITABLE;
}

export const setAnyProjectIsEditableAction = (
    toggle: boolean
): ISetAnyProjectIsEditableAction => ({
    payload: toggle,
    type: SET_ANY_PROJECT_IS_EDITABLE,
});

export type SetAnyProjectIsEditableActionTypes = ISetAnyProjectIsEditableAction;
