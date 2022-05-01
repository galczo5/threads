import {useEffect, useRef} from "react";
import * as vis from "vis";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {nodesAtom} from "../state/NodesAtom";
import {GraphNode} from "../state/Node";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {GraphEdge} from "../state/Edge";

export function Graph() {

    const ref = useRef(null);
    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);

    const [nodes] = useRecoilState(nodesAtom);
    const [edges] = useRecoilState(edgesAtom);

    const options = {
        nodes: {
            shape: "dot",
            borderWidth: 0,
            font: {color: '#e2e8f0'},
            color: '#a3a3a3'
        },
        edges: {
            arrows: {
                to: true
            }
        },
    };

    let network: vis.Network | null = null;
    let nodesDataSet: vis.DataSet<GraphNode> = new vis.DataSet<GraphNode>();
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
