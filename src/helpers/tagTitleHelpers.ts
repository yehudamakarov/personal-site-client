import { RouteComponentProps } from "@reach/router";
import { Tag } from "../store/entities/tags/actions/api";

export class TagTitleHelpers {
    public static getTagTitle(props: RouteComponentProps<{ tagId: Tag["tagId"] }>): Tag["tagId"] {
        const tagId = props.tagId;
        const href = props.location ? props.location.href : null;
        if (href && href.indexOf("#") !== -1) {
            return href.slice(href.lastIndexOf("/") + 1);
        }
        return tagId ? tagId : "";
    }
}
