export type GraphEdge = { from: number, to: number };

export type EdgePlain = { from: number, to: number };

export class Edge {
    constructor(
        public readonly from: number,
        public readonly to: number
    ) {
    }

    static fromPlain(obj: EdgePlain): Edge {
        return new Edge(obj.from, obj.to);
    }

    getGraph(): GraphEdge {
        return {
            to: this.to,
            from: this.from
        };
    }

    asPlain(): EdgePlain {
        return {
            to: this.to,
            from: this.from
        };
    }
}
