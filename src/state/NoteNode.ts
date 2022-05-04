export type GraphNoteNode = {id: number, label: string, color?: string, size?: number};

export type NoteNodePlain = {
    id: number,
    title: string,
    content: string,
    updatedAt: Array<string>
}

export class NoteNode {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly updatedAt: Array<string>
    ) {
    }

    static fromPlain(obj: NoteNodePlain): NoteNode {
        const now = new Date().toISOString();
        return new NoteNode(obj.id, obj.title, obj.content, [now, ...obj.updatedAt]);
    }

    getGraph(): GraphNoteNode {
        return {
            label: this.getReadableTitle(),
            id: this.id
        }
    }

    asPlain(): NoteNodePlain {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            updatedAt: this.updatedAt
        }
    }

    getReadableTitle(): string {
        const maxLength = 25;
        if (this.title.length > maxLength) {
            return this.title.slice(0, maxLength - 3) + '...';
        }

        return this.title;
    }
}

