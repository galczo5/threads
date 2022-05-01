import {Header} from "./Header";
import {Graph} from "./Graph";
import {Editor} from "./Editor";
import {Calendar} from "./Calendar";

export function Note() {
    return (
        <>
            <Header/>
            <Graph/>
            <Editor/>
            <Calendar/>
        </>
    );
}
