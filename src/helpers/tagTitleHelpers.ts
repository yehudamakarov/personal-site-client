import { RouteComponentProps } from "@reach/router";
import { ITag } from "../store/entities/tags/actions/api";

export class TagTitleHelpers {
    public static getTagTitle(props: RouteComponentProps<{ tagId: ITag["tagId"] }>): ITag["tagId"] {
        const tagId = props.tagId;
        const href = props.location ? props.location.href : null;
        if (href && href.indexOf("#") !== -1) {
            return href.slice(href.lastIndexOf("/") + 1);
        }
        return tagId ? tagId : "";
    }
}
