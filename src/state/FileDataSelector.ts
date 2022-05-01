import { selector } from "recoil";
import {nodesAtom} from "./NodesAtom";
import {edgesAtom} from "./EdgesAtom";
import {File} from "../file/File";

export const fileDataSelector = selector({
    key: 'file/data',
    get: ({get}) => {
        const nodes = get(nodesAtom);
        const edges = get(edgesAtom);

        const file = new File(nodes, edges);
        return file.asJson();
    }
})
