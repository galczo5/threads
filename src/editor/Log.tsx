import {useRecoilState} from "recoil";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import ReactMarkdown from "react-markdown";
import {logVisibilityAtom} from "../state/LogVisibilityAtom";

export function Log() {

    const [nodes] = useRecoilState(noteNodesAtom);
    const [logVisible, setLogVisible] = useRecoilState(logVisibilityAtom);

    const template = <div className='app-editor__log'>
        <div className='app-editor__log-buttons'>
            <strong>Recent notes</strong>
            <button onClick={() => setLogVisible(false)}>
                <i className="fa-solid fa-arrow-left"/>
            </button>
        </div>
        {
            nodes.map(n =>
                <div className='app-editor__log-row'>
                    <strong>{ n.title }</strong>
                    <br/>
                    <small>
                        { new Date(n.updatedAt[0]).toLocaleDateString() + ' ' + new Date(n.updatedAt[0]).toLocaleTimeString() }
                    </small>
                    <div className='app-editor__log-content'>
                        <ReactMarkdown>{n.content || 'EMPTY'}</ReactMarkdown>
                    </div>
                </div>
            )
        }
    </div>;

    return (logVisible ? template : <></>);
}
