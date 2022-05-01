import {atom} from "recoil";
import {NoteNode} from "./NoteNode";

const now = new Date().toISOString();
export const selectedNodeAtom = atom({
    key: 'nodes/selected',
    default: new NoteNode(-1, '', '', [now])
});

