import ReactMarkdown from "react-markdown";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {nodesAtom} from "../state/NodesAtom";
import {useEffect, useState} from "react";
import {Node} from "../state/Node";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {Edge} from "../state/Edge";

export function Editor() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [parent, setParent] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [selectedNode] = useRecoilState(selectedNodeAtom);

    useEffect(
        () => {
            setTitle(selectedNode.title);
            setContent(selectedNode.content);
        },
        [selectedNode]
    );


    const addNote = () => {
        const newNodeId = selectedNode.id ? selectedNode.id : nodes.length + 1;
        setNodes([
            ...nodes.filter(n => n.id !== newNodeId),
            new Node(newNodeId, title, content, new Date().toISOString())
        ]);
    };

    const addEdge = () => {
        setEdges([...edges, new Edge(parent, selectedNode.id)])
    };

    const template = <div className='app-editor'>
        <input className='app-editor__note-title'
               type="text"
               value={title}
               onChange={e => setTitle(e.target.value)}/>
        <div className='app-editor__buttons'>
            <button onClick={() => setEditorVisible(false)}
                    className='app-editor__close-button'>
                <i className="fa-solid fa-arrow-right"/>
            </button>

            <button className='active'
                    onClick={() => addNote()}>
                <i className='fa-solid fa-save'/>
                <span>save</span>
            </button>

            {selectedNode.id ?
                <button onClick={() => setEditMode(!editMode)}>
                    <i className='fa-solid fa-edit'/>
                </button>
                : <></>
            }

            {(selectedNode && selectedNode.id) ?
                <>
                    <button className='danger'>
                        <i className="fa-solid fa-trash"/>
                    </button>
                    <button>
                        <i className='fa-solid fa-plus'/>
                        <span>parent</span>
                    </button>
                    <select onChange={e => setParent(Number(e.target.value))}
                            style={{width: '100px'}}>
                        {
                            nodes.filter(n => n.id !== selectedNode.id).map(n =>
                                <option key={n.id} value={n.id}>{n.title}</option>
                            )
                        }
                    </select>
                    <button onClick={() => addEdge()}>
                        <i className='fa-solid fa-check'/>
                    </button>
                </>
                : <></>
            }
        </div>

        {(editMode || !selectedNode.id) ?
            <textarea className='app-editor__note-content'
                      rows={20}
                      value={content}
                      onChange={e => setContent(e.target.value)}/>
            : <></>
        }

        <ReactMarkdown>{content}</ReactMarkdown>
    </div>;

    return (editorVisible ? template : <></>);
}
