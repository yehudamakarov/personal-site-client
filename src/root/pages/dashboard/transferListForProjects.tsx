import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facadeSelector, IFacade } from "../../../store/entities/projects/ui/selectors";
import { ITag } from "../../../store/entities/tags/actions/api";
import { setCheckedProjectsAction } from "../../../store/entities/tagsTransferList/actions/setCheckedProjects";
import { setLeftProjectsAction } from "../../../store/entities/tagsTransferList/actions/setLeftProjects";
import { setRightProjectsAction } from "../../../store/entities/tagsTransferList/actions/setRightProjects";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferListBase } from "./transferListBase";

export const TransferListForProjects = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();
    const projectFacades = useSelector(
        facadeSelector((state: IApplicationState) =>
            state.projects.projectsData.map((project) => ({
                id: project.githubRepoDatabaseId,
                tagIds: project.tagIds,
                title: project.projectTitle,
            })),
        ),
    );

    const checked = useSelector((state: IApplicationState) => state.tagsTransferList.projects.checked);
    const left = useSelector((state: IApplicationState) => state.tagsTransferList.projects.left);
    const right = useSelector((state: IApplicationState) => state.tagsTransferList.projects.right);

    const setChecked = (projects: IFacade[]) => dispatch(setCheckedProjectsAction(projects));
    const setRight = (projects: IFacade[]) => dispatch(setRightProjectsAction(projects));
    const setLeft = (projects: IFacade[]) => dispatch(setLeftProjectsAction(projects));

    useEffect(() => {
        const mappedToTag = projectFacades.filter(
            (projectFacade) => projectFacade.tagIds && projectFacade.tagIds.some((tagId) => tagId === props.tagId),
        );
        const availableToMapToTag = projectFacades.filter(
            (projectFacade) =>
                projectFacade.tagIds === null || projectFacade.tagIds.every((tagId) => tagId !== props.tagId),
        );
        dispatch(setLeft(mappedToTag));
        dispatch(setRight(availableToMapToTag));
    }, [projectFacades.length]);

    return (
        <TransferListBase
            title={"Projects"}
            checked={checked}
            left={left}
            right={right}
            setChecked={setChecked}
            setRight={setRight}
            setLeft={setLeft}
        />
    );
};
