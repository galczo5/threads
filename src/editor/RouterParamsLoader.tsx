import {useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {filePathAtom} from "../state/FilePathAtom";
import {useEffect} from "react";
import {Api} from "../Api";

export function RouterParamsLoader() {

    const searchParams = useParams();
    const [filePath, setFilePath] = useRecoilState(filePathAtom);

    useEffect(
        () => {
            if (!filePath && searchParams && searchParams.id) {
                const fileToOpen = atob(searchParams.id);
                setFilePath(fileToOpen);
                Api.load(fileToOpen);
            }
        },
        [filePath, searchParams]
    );

    return <></>;
}
