import ReactMarkdown from "react-markdown";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {useEffect, useRef, useState} from "react";
import {NoteNode} from "../state/NoteNode";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {Edge} from "../state/Edge";

export function Editor() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [addParentMode, setAddParentMode] = useState(false);

    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [nodes, setNodes] = useRecoilState(noteNodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [selectedNode] = useRecoilState(selectedNodeAtom);

    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(
        () => {
            setTitle(selectedNode.title);
            setContent(selectedNode.content);
        },
        [selectedNode]
    );

    const saveNote = () => {
        const newNodeId = selectedNode.id ? selectedNode.id : new Date().getTime();
        const now = new Date().toISOString();

        setNodes([
            ...nodes.filter(n => n.id !== newNodeId),
            new NoteNode(newNodeId, title, content, [now])
        ]);

        setEditorVisible(false);
    };

    const addEdge = () => {
        const parent = selectRef.current?.value;
        if (parent) {
            setEdges([...edges, new Edge(Number(parent), selectedNode.id)]);
            setAddParentMode(false);
        }
    };

    const removeNode = () => {
        setNodes([...nodes.filter(n => n.id !== selectedNode.id)]);
        setEdges([...edges.filter(e => e.from !== selectedNode.id && e.to !== selectedNode.id)]);
        setEditorVisible(false);
    };

    const template = <div className='app-editor'>
        <input className='app-editor__note-title'
               type="text"
               value={title}
               onChange={e => setTitle(e.target.value)}/>
        <div className='app-editor__buttons'>
            <div className='app-editor__buttons-left'>
                <button onClick={() => setEditorVisible(false)}>
                    <i className="fa-solid fa-arrow-right"/>
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
                                <select ref={selectRef} style={{width: '100px'}}>
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

                <button className='active'
                        onClick={() => saveNote()}>
                    <i className='fa-solid fa-save'/>
                    <span>save</span>
                </button>
            </div>

            { selectedNode.id ?
                <button onClick={() => removeNode()} className='danger'>
                    <i className="fa-solid fa-trash"/>
                </button>
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
