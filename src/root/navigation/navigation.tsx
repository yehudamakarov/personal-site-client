import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTagsLoadingAction } from "../../store/actions/tags/getTags/actions";
import { MainNavDrawer } from "./drawer/mainNavDrawer";
import { TopBar } from "./topBar/topBar";

export const Navigation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, []);

    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
        </React.Fragment>
    );
};
