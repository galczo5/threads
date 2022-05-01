import {NoteNode, NoteNodePlain} from "../state/NoteNode";
import {Edge, EdgePlain} from "../state/Edge";

export type FileJson = {
    nodes: Array<NoteNodePlain>,
    edges: Array<EdgePlain>
};

export class File {
    constructor(
        public readonly nodes: Array<NoteNode>,
        public readonly edges: Array<Edge>
    ) {
    }

    asJson(): string {
        const obj = {
            nodes: this.nodes.map(n => n.asPlain()),
            edges: this.edges.map(e => e.asPlain())
        };

        return JSON.stringify(obj, null, 2)
    }
}
