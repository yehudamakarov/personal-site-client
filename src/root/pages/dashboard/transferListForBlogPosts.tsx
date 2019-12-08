import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facadeSelector, IFacade } from "../../../store/entities/projects/ui/selectors";
import { ITag } from "../../../store/entities/tags/actions/api";
import { setCheckedBlogPostsAction } from "../../../store/entities/tagsTransferList/actions/setCheckedBlogPosts";
import { setLeftBlogPostsAction } from "../../../store/entities/tagsTransferList/actions/setLeftBlogPosts";
import { setRightBlogPostsAction } from "../../../store/entities/tagsTransferList/actions/setRightBlogPosts";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferListBase } from "./transferListBase";

export const TransferListForBlogPosts = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();

    const blogPostFacades = useSelector(
        facadeSelector((state: IApplicationState) =>
            state.blogPosts.blogPostData.map((blogPost) => ({
                id: blogPost.id,
                tagIds: blogPost.tagIds,
                title: blogPost.title,
            })),
        ),
    );

    const checked = useSelector((state: IApplicationState) => state.tagsTransferList.blogPosts.checked);
    const left = useSelector((state: IApplicationState) => state.tagsTransferList.blogPosts.left);
    const right = useSelector((state: IApplicationState) => state.tagsTransferList.blogPosts.right);

    const setChecked = (blogPosts: IFacade[]) => dispatch(setCheckedBlogPostsAction(blogPosts));
    const setRight = (blogPosts: IFacade[]) => dispatch(setRightBlogPostsAction(blogPosts));
    const setLeft = (blogPosts: IFacade[]) => dispatch(setLeftBlogPostsAction(blogPosts));

    useEffect(() => {
        const mappedToTag = blogPostFacades.filter(
            (blogPostFacade) => blogPostFacade.tagIds && blogPostFacade.tagIds.some((tagId) => tagId === props.tagId),
        );
        const availableToMapToTag = blogPostFacades.filter(
            (blogPostFacade) =>
                blogPostFacade.tagIds === null || blogPostFacade.tagIds.every((tagId) => tagId !== props.tagId),
        );
        dispatch(setLeft(mappedToTag));
        dispatch(setRight(availableToMapToTag));
    }, [blogPostFacades.length]);

    return (
        <TransferListBase
            title={"BlogPosts"}
            checked={checked}
            left={left}
            right={right}
            setChecked={setChecked}
            setRight={setRight}
            setLeft={setLeft}
        />
    );
};
