/* -------------------------------------------------------------------------- */
/*                          setAnyProjectIsEditableAction                          */
/* -------------------------------------------------------------------------- */

export const SET_ANY_PROJECT_IS_EDITABLE = "SET_ANY_PROJECT_IS_EDITABLE";

export interface ISetAnyProjectIsEditableAction {
    payload: string;
    type: typeof SET_ANY_PROJECT_IS_EDITABLE;
}

export const setAnyProjectIsEditableAction = (
    projectId: string,
): ISetAnyProjectIsEditableAction => ({
    payload: projectId,
    type: SET_ANY_PROJECT_IS_EDITABLE,
});

/* -------------------------------------------------------------------------- */
/*                          setAnyProjectIsNotEditableAction                          */
/* -------------------------------------------------------------------------- */

export const SET_ANY_PROJECT_IS_NOT_EDITABLE = "SET_ANY_PROJECT_IS_NOT_EDITABLE";

export interface ISetAnyProjectIsNotEditableAction {
    payload: string;
    type: typeof SET_ANY_PROJECT_IS_NOT_EDITABLE;
}

export const setAnyProjectIsNotEditableAction = (
    projectId: string,
): ISetAnyProjectIsNotEditableAction => ({
    payload: projectId,
    type: SET_ANY_PROJECT_IS_NOT_EDITABLE,
});

export type SetAnyProjectIsEditableActionTypes = ISetAnyProjectIsEditableAction | ISetAnyProjectIsNotEditableAction;
