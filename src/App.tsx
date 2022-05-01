import { RecoilRoot } from 'recoil';
import {Note} from "./editor/Note";
import {Route, Routes, HashRouter} from "react-router-dom";
import {FileChooser} from "./file-chooser/FileChooser";
import {FileOperations} from "./file/FileOperations";

function App() {
    return (
        <RecoilRoot>
            <HashRouter>
                <FileOperations/>
                <Routes>
                    <Route path={'/'} element={FileChooser()}/>
                    <Route path={'/note/:id'} element={Note()}/>
                </Routes>
            </HashRouter>
        </RecoilRoot>
    );
}

export default App
