import {IpcRendererEvent} from 'electron'
import {File, FileJson} from './file/File'
import {NoteNode} from "./state/NoteNode";
import {Edge} from "./state/Edge";

type ElectronApi = {
    send: (channel: string, msg: string, data?: any) => void,
    listen: (channel: string, listener: (event: IpcRendererEvent, data: any) => void) => void
}

export class Api {
    private static getApi(): ElectronApi {
        // @ts-ignore
        const electron = window['electron'];

        if (!electron) {
            throw new Error('Cannot execute action. App executed not in Electron env.')
        }

        return electron;
    }

    static open() {
        this.getApi().send('open', 'open');
    }

    static load(filePath: string) {
        this.getApi().send('load', 'load', filePath);
    }

    static onNoteOpen(listener: (filePath: string, file: File) => void) {
        this.getApi().listen('open', (e, eventData: { filePath: string, data: string }) => {
            try {
                const parsed: Partial<FileJson> = JSON.parse(eventData.data);
                const nodes = parsed.nodes ? parsed.nodes.map(n => NoteNode.fromPlain(n)) : [];
                const edges = parsed.edges ? parsed.edges.map(n => Edge.fromPlain(n)) : [];

                listener(eventData.filePath, new File(nodes, edges))
                
            } catch (e) {
                
            }
        });
    }

    static createFile() {
        this.getApi().send('create', '')
    }

    static saveFile(path: string, json: string) {
        this.getApi().send('save', 'save', {
            path: path,
            json: json
        });
    }
}
