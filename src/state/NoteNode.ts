export type GraphNoteNode = {id: number, label: string, color?: string, size?: number};

export enum GraphNodeSize {
    NORMAL = 10,
    BIG = 20
}

export type NoteNodePlain = {
    id: number,
    title: string,
    content: string,
    updatedAt: Array<string>,
    stared: boolean,
    done: boolean
}

export class NoteNode {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly updatedAt: Array<string>,
        public readonly stared: boolean,
        public readonly done: boolean
    ) {
    }

    static fromPlain(obj: NoteNodePlain): NoteNode {
        const now = new Date().toISOString();
        return new NoteNode(
            obj.id,
            obj.title,
            obj.content,
            [now, ...obj.updatedAt],
            !!obj.stared,
            !!obj.done
        );
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
            updatedAt: this.updatedAt,
            done: this.done,
            stared: this.stared
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

