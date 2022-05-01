import ReactMarkdown from "react-markdown";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {useEffect, useState} from "react";
import {NoteNode} from "../state/NoteNode";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {Edge} from "../state/Edge";

export function Editor() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [parent, setParent] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [addParentMode, setAddParentMode] = useState(false);

    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [nodes, setNodes] = useRecoilState(noteNodesAtom);
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
        const now = new Date().toISOString();
        setNodes([
            ...nodes.filter(n => n.id !== newNodeId),
            new NoteNode(newNodeId, title, content, [now])
        ]);

        setEditorVisible(false);
    };

    const addEdge = () => {
        setEdges([...edges, new Edge(parent, selectedNode.id)]);
        setAddParentMode(false);
    };

    const template = <div className='app-editor'>
        <input className='app-editor__note-title'
               type="text"
               value={title}
               onChange={e => setTitle(e.target.value)}/>
        <div className='app-editor__buttons'>
            <div className='app-editor__buttons-left'>
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

                {selectedNode.id ?
                    <>
                        {!addParentMode &&
                            <button onClick={() => setAddParentMode(true)}>
                                <i className='fa-solid fa-plus'/>
                                <span>parent</span>
                            </button>
                        }
                        {addParentMode &&
                            <>
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
                        }
                    </>
                    : <></>
                }
            </div>

            { selectedNode.id &&
                <button className='danger'>
                    <i className="fa-solid fa-trash"/>
                </button>
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
