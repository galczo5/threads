export type GraphEdge = { from: number, to: number };

export class Edge {
    constructor(
        public readonly from: number,
        public readonly to: number
    ) {
    }

    getGraph(): GraphEdge {
        return {
            to: this.to,
            from: this.from
        };
    }
}
