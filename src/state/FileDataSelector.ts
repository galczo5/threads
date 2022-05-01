import { selector } from "recoil";
import {noteNodesAtom} from "./NoteNodesAtom";
import {edgesAtom} from "./EdgesAtom";
import {File} from "../file/File";

export const fileDataSelector = selector({
    key: 'file/data',
    get: ({get}) => {
        const nodes = get(noteNodesAtom);
        const edges = get(edgesAtom);

        const file = new File(nodes, edges);
        return file.asJson();
    }
})
