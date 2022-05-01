export type GraphNode = {id: number, label: string};

export type NodePlain = {
    id: number,
    title: string,
    content: string,
    updatedAt: string
}

export class Node {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly updatedAt: string
    ) {
    }

    static fromPlain(obj: NodePlain): Node {
        return new Node(obj.id, obj.title, obj.content, obj.updatedAt);
    }

    getGraph(): GraphNode {
        return {
            label: this.title,
            id: this.id
        }
    }

    asPlain(): NodePlain {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            updatedAt: this.updatedAt
        }
    }
}

