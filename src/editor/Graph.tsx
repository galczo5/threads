import {useEffect, useRef} from "react";
import * as vis from "vis";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {GraphNoteNode} from "../state/NoteNode";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {GraphEdge} from "../state/Edge";
import {Colors} from "../Colors";

export function Graph() {

    const ref = useRef(null);
    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);

    const [nodes] = useRecoilState(noteNodesAtom);
    const [edges] = useRecoilState(edgesAtom);

    const colors = Colors.get();
    const options = {
        nodes: {
            shape: "dot",
            borderWidth: 0,
            font: {color: colors.getTextColor()},
            color: colors.getAccentColor()
        },
        edges: {
            arrows: {
                to: true
            }
        },
    };

    let network: vis.Network | null = null;
    let nodesDataSet: vis.DataSet<GraphNoteNode> = new vis.DataSet<GraphNoteNode>();
    let edgesDataSet: vis.DataSet<GraphEdge> = new vis.DataSet<GraphEdge>();

    useEffect(
        () => {
            if (!ref || !network) {
                network = new vis.Network(
                    ref.current!,
                    {nodes: nodesDataSet, edges: edgesDataSet},
                    options
                );

                network.on("selectNode", event => {
                    if (!network) {
                        return;
                    }

                    const nodeToSelect = nodes.find(n => n.id === network?.getSelectedNodes()[0]);
                    if (nodeToSelect) {
                        setSelectedNode(nodeToSelect);
                        setEditorVisible(true);
                    }
                });
            }

            for (const node of nodes) {
                nodesDataSet.update(node.getGraph());
            }

            for (const edge of edges) {
                edgesDataSet.update(edge.getGraph());
            }
        },
        [nodes, edges, ref]
    )

    return <div className='app-graph' ref={ref}/>;

}
