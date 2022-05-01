import {atom} from "recoil";
import {Node} from "./Node";

export const selectedNodeAtom = atom({
    key: 'nodes/selected',
    default: new Node(-1, '', '', new Date().toISOString())
});

