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
/*                          setAnyProjectIsDoneEditingAction                          */
/* -------------------------------------------------------------------------- */

export const SET_ANY_PROJECT_IS_DONE_EDITING =
    "SET_ANY_PROJECT_IS_DONE_EDITING";

export interface ISetAnyProjectIsDoneEditingAction {
    payload: string;
    type: typeof SET_ANY_PROJECT_IS_DONE_EDITING;
}

export const setAnyProjectIsDoneEditingAction = (
    projectId: string,
): ISetAnyProjectIsDoneEditingAction => ({
    payload: projectId,
    type: SET_ANY_PROJECT_IS_DONE_EDITING,
});

export type SetAnyProjectIsEditableActionTypes =
    | ISetAnyProjectIsEditableAction
    | ISetAnyProjectIsDoneEditingAction;
