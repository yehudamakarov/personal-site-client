import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facadeSelector, FacadeType, IFacade } from "../../../store/entities/projects/ui/selectors";
import { ITag } from "../../../store/entities/tags/actions/api";
import { setLeftAction } from "../../../store/entities/tagsTransferList/actions/setLeft";
import { setRightAction } from "../../../store/entities/tagsTransferList/actions/setRight";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferListBase } from "./transferListBase";

export const TransferListForProjects = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();
    const facades = useSelector(
        facadeSelector((state: IApplicationState) => {
            const fromProjects = state.projects.projectsData.map((project) => ({
                id: project.githubRepoDatabaseId,
                tagIds: project.tagIds,
                title: project.projectTitle,
                type: FacadeType.Project,
            }));
            const fromBlogPosts = state.blogPosts.blogPostData.map((blogPost) => ({
                id: blogPost.id,
                tagIds: blogPost.tagIds,
                title: blogPost.title,
                type: FacadeType.BlogPost,
            }));
            return [...fromProjects, ...fromBlogPosts];
        }),
    );

    useEffect(() => {
        const setRight = (elements: IFacade[]) => dispatch(setRightAction(elements));
        const setLeft = (elements: IFacade[]) => dispatch(setLeftAction(elements));
        const mappedToTag = facades.filter(
            (facade) => facade.tagIds && facade.tagIds.some((tagId) => tagId === props.tagId),
        );
        const availableToMapToTag = facades.filter(
            (facade) => facade.tagIds === null || facade.tagIds.every((tagId) => tagId !== props.tagId),
        );
        setLeft(mappedToTag);
        setRight(availableToMapToTag);
    }, [dispatch, facades.length, props.tagId]);

    return <TransferListBase title={"Projects"} />;
};
