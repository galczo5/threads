import {atom} from "recoil";
import {Edge} from "./Edge";

export const edgesAtom = atom({
    key: 'edges',
    default: [] as Array<Edge>
})
