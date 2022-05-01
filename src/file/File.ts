import {Node, NodePlain} from "../state/Node";
import {Edge, EdgePlain} from "../state/Edge";

export type FileJson = {
    nodes: Array<NodePlain>,
    edges: Array<EdgePlain>
};

export class File {
    constructor(
        public readonly nodes: Array<Node>,
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
