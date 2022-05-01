import {useRecoilState} from "recoil";
import {calendarVisibilityAtom} from "../state/CalendarVisibilityAtom";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {Node} from "../state/Node";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {Logo} from "../logo/Logo";
import {useRef} from "react";
import {Link} from "react-router-dom";
import {filePathAtom} from "../state/FilePathAtom";

export function Header() {

    const [calendarVisible, setCalendarVisible] = useRecoilState(calendarVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);
    const [calendarVisibility, setCalendarVisibility] = useRecoilState(editorVisibilityAtom);
    const [filePath] = useRecoilState(filePathAtom);

    const inputRef = useRef<HTMLInputElement>(null);

    const openEditor = () => {
        setSelectedNode(new Node(0, '', '', new Date().toISOString()));
        setCalendarVisibility(true);
    };

    return (
        <div className='app-header'>
            <div className='app-header__notes-name'>
                <strong>
                    {filePath}
                </strong>
            </div>
            <div className='app-header__buttons'>
                <Link to={'/'}>
                    <button>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </Link>
                <button onClick={() => openEditor()}>
                    <i className="fa-solid fa-plus"/>
                </button>
                <input className='app-header__search'
                       type="text"
                       placeholder='search...'
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
            <div className='app-header__logo'>
                <Logo size={100}/>
            </div>
        </div>
    );
}
