import {useRecoilState} from "recoil";
import {calendarVisibilityAtom} from "../state/CalendarVisibilityAtom";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {NoteNode} from "../state/NoteNode";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {useRef} from "react";
import {Link} from "react-router-dom";
import {filePathAtom} from "../state/FilePathAtom";
import {filterAtom} from "../state/FilterAtom";

export function Header() {

    const [calendarVisible, setCalendarVisible] = useRecoilState(calendarVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);
    const [calendarVisibility, setCalendarVisibility] = useRecoilState(editorVisibilityAtom);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [filePath] = useRecoilState(filePathAtom);

    const inputRef = useRef<HTMLInputElement>(null);

    const openEditor = () => {
        const now = new Date().toISOString();

        setSelectedNode(new NoteNode(0, '', '', [now]));
        setCalendarVisibility(true);
    };

    return (
        <div className='app-header'>
            <div className='app-header__buttons'>
                <Link to={'/'}>
                    <button>
                        <i className="fa-solid fa-arrow-left"/>
                    </button>
                </Link>
                <button onClick={() => openEditor()}>
                    <i className="fa-solid fa-plus"/>
                </button>
                <input className='app-header__search'
                       type="text"
                       placeholder='search...'
                       value={filter}
                       onChange={event => setFilter(event.target.value)}
                       ref={inputRef}/>
                <button onClick={() => inputRef.current?.focus()}>
                    <i className="fa-solid fa-search"/>
                </button>
                <button onClick={() => setCalendarVisible(!calendarVisible)}
                        className={calendarVisible ? 'active' : ''}>
                    <i className="fa-solid fa-calendar-check"/>
                </button>
                {/*<button>*/}
                {/*    <i className="fa-solid fa-list-check"/>*/}
                {/*</button>*/}
            </div>
            <div className='app-header__notes-name'>
                <strong>
                    {filePath}
                </strong>
            </div>
        </div>
    );
}
