import { RecoilRoot } from 'recoil';
import {Note} from "./editor/Note";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FileChooser} from "./file-chooser/FileChooser";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={FileChooser()}></Route>
                    <Route path={'/note/:id'} element={Note()}></Route>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App
