import {Header} from "./Header";
import {Graph} from "./Graph";
import {Editor} from "./Editor";
import {Calendar} from "./Calendar";
import {RouterParamsLoader} from "./RouterParamsLoader";
import {Log} from "./Log";
import {Logo} from "../logo/Logo";

export function Note() {
    return (
        <>
            <RouterParamsLoader/>
            <Header/>
            <Graph/>
            <Editor/>
            <Calendar/>
            <Log/>
            <div className='app-logo'>
                <Logo size={50}/>
            </div>
        </>
    );
}
