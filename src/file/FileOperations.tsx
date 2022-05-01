import {useRecoilState, useRecoilValue} from "recoil";
import {fileDataSelector} from "../state/FileDataSelector";
import {Api} from "../Api";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {useEffect} from "react";
import {filePathAtom} from "../state/FilePathAtom";
import {useNavigate} from "react-router-dom";

export function FileOperations() {

    const navigate = useNavigate();
    const fileJson = useRecoilValue(fileDataSelector);
    const [filePath, setFilePath] = useRecoilState(filePathAtom);

    useEffect(
        () => {
            Api.saveFile(filePath, fileJson);
        },
        [fileJson, filePath]
    );

    const [nodes, setNodes] = useRecoilState(noteNodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);

    Api.onNoteOpen((path, file) => {
        if (!path) {
            return;
        }

        let item = localStorage.getItem('files') || '[]';
        const recentlyOpenedFiles = JSON.parse(item);
        const uniqueFilePaths = Array.from(new Set([...recentlyOpenedFiles, path]));
        localStorage.setItem('files', JSON.stringify(uniqueFilePaths));

        setFilePath(path);
        setNodes(file.nodes);
        setEdges(file.edges);

        navigate('/note/' + btoa(path));
    });

    return <></>;
}
