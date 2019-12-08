import { IFacade } from "../store/entities/projects/ui/selectors";

export class TransferListHelpers {
    public static not(a: IFacade[], b: IFacade[]) {
        return a.filter((value) => b.every((facade) => value.id !== facade.id));
    }

    public static intersection(a: IFacade[], b: IFacade[]) {
        return a.filter((value) => b.some((facade) => value.id === facade.id));
    }

    public static union(a: IFacade[], b: IFacade[]) {
        return [...a, ...this.not(b, a)];
    }
}
