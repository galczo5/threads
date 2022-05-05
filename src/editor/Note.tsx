import {Header} from "./Header";
import {Graph} from "./Graph";
import {Editor} from "./Editor";
import {Calendar} from "./Calendar";
import {RouterParamsLoader} from "./RouterParamsLoader";
import {Log} from "./Log";

export function Note() {
    return (
        <>
            <RouterParamsLoader/>
            <Header/>
            <Graph/>
            <Editor/>
            <Calendar/>
            <Log/>
        </>
    );
}
