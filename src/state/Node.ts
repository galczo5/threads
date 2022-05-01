export type GraphNode = {id: number, label: string};

export class Node {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly updatedAt: string
    ) {
    }

    getGraph(): GraphNode {
        return {
            label: this.title,
            id: this.id
        }
    }
}

