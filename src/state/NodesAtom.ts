import {atom} from "recoil";
import {Node} from "./Node";

export const nodesAtom = atom({
    key: 'nodes',
    default: [
        new Node(1, 'A', '', new Date().toISOString()),
        new Node(2, 'B', '', new Date().toISOString()),
        new Node(3, 'C', '', new Date().toISOString()),
        new Node(4, 'D', '', new Date().toISOString()),
        new Node(5, 'E', '', new Date().toISOString()),
        new Node(6, 'F', '', new Date().toISOString())
    ]
})
