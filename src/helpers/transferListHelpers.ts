import { FacadeIds } from "../store/entities/tagsTransferList/tagsTransferListReducer";

export class TransferListHelpers {
    public static not(a: FacadeIds, b: FacadeIds) {
        return a.filter((value) => b.every((facadeId) => value !== facadeId));
    }

    public static intersection(a: FacadeIds, b: FacadeIds) {
        return a.filter((value) => b.some((facadeId) => value === facadeId));
    }

    public static union(a: FacadeIds, b: FacadeIds): FacadeIds {
        return [...a, ...this.not(b, a)];
    }
}
