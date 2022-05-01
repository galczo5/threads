import {useRecoilState} from "recoil";
import {calendarVisibilityAtom} from "../state/CalendarVisibilityAtom";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {Node} from "../state/Node";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";

export function Header() {

    const [calendarVisible, setCalendarVisible] = useRecoilState(calendarVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);
    const [_, setCalendarVisibility] = useRecoilState(editorVisibilityAtom);

    const openEditor = () => {
        setSelectedNode(new Node(0, '', '', new Date().toISOString()));
        setCalendarVisibility(true);
    };

    return (
        <div className='app-header'>
            <div className='app-header__notes-name'>
                <strong>
                    Notes name
                </strong>
            </div>
            <div className='app-header__buttons'>
                <button onClick={() => openEditor()}>
                    <i className="fa-solid fa-plus"/>
                </button>
                <input className='app-header__search' type="text" placeholder='search...'/>
                <button>
                    <i className="fa-solid fa-search"/>
                </button>
                <button onClick={() => setCalendarVisible(!calendarVisible)}
                        className={calendarVisible ? 'active' : ''}>
                    <i className="fa-solid fa-calendar-check"/>
                </button>
                <button>
                    <i className="fa-solid fa-list-check"/>
                </button>
            </div>
        </div>
    );
}
