import {atom} from "recoil";
import {NoteNode} from "./NoteNode";

export const noteNodesAtom = atom({
    key: 'nodes',
    default: [] as Array<NoteNode>
})
