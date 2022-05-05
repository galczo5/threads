import {useEffect, useRef} from "react";
import * as vis from "vis";
import {useRecoilState} from "recoil";
import {editorVisibilityAtom} from "../state/EditorVisibilityAtom";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {GraphNodeSize, GraphNoteNode, NoteNode} from "../state/NoteNode";
import {selectedNodeAtom} from "../state/SelectedNodeAtom";
import {edgesAtom} from "../state/EdgesAtom";
import {GraphEdge} from "../state/Edge";
import {Colors} from "../Colors";
import {filterAtom} from "../state/FilterAtom";
import {DataSet, Network, Options} from "vis";

export function Graph() {

    const ref = useRef(null);
    const [editorVisible, setEditorVisible] = useRecoilState(editorVisibilityAtom);
    const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);
    const [filter] = useRecoilState(filterAtom);

    const [nodes] = useRecoilState(noteNodesAtom);
    const [edges] = useRecoilState(edgesAtom);

    const colors = Colors.get();
    const options: Options = {
        nodes: {
            shape: "dot",
            borderWidth: 0,
            font: {color: colors.getTextColor()},
            color: colors.getAccentColor(),
            size: GraphNodeSize.NORMAL,
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

            const nodesToRemove: Array<number> = [];
            nodesDataSet.forEach(item => {
                if (!nodes.some(n => n.id === item.id)) {
                    nodesToRemove.push(item.id);
                }
            });

            nodesToRemove.forEach(id => nodesDataSet.remove(id));

            for (const node of nodes) {
                nodesDataSet.update(node.getGraph());
            }

            for (const edge of edges) {
                edgesDataSet.update(edge.getGraph());
            }

            for (const node of nodes) {
                setNodeProperties(network, node, filter, nodesDataSet, colors);
            }
        },
        [nodes, edges, ref, filter]
    )

    return <div className='app-graph' ref={ref}/>;

}


function setNodeProperties(network: Network, node: NoteNode, filter: string, nodesDataSet: DataSet<GraphNoteNode>, colors: Colors) {
    const predecessors = network.getConnectedNodes(node.id, 'from');
    const ancestors = network.getConnectedNodes(node.id, 'to');

    if (!filter) {
        const hasNoPredecessors = predecessors.length === 0;
        const hasNoAncestors = ancestors.length === 0;
        const isDone = node.done;
        const isStarred = node.stared;

        let size = GraphNodeSize.NORMAL;
        let color = colors.getAccentColor();

        if (isStarred || (hasNoAncestors && !hasNoPredecessors && !isDone)) {
            size = GraphNodeSize.BIG;
            color = colors.getLeafColor();
        } else if (isDone || hasNoPredecessors) {
            size = GraphNodeSize.NORMAL;
            color = colors.getForegroundColor();
        }

        nodesDataSet.update({
            ...node.getGraph(),
            color: color,
            size: size
        });
    } else {
        const loweredFilter = filter.toLocaleLowerCase();
        const titleFitsFilter = node.title.toLocaleLowerCase().includes(loweredFilter);
        const contentFitsFilter = node.content.toLocaleLowerCase().includes(loweredFilter);
        if (titleFitsFilter || contentFitsFilter) {
            nodesDataSet.update({
                ...node.getGraph(),
                color: colors.getLeafColor(),
                size: GraphNodeSize.BIG
            });
        } else {
            nodesDataSet.update({
                ...node.getGraph(),
                color: colors.getForegroundColor(),
                size: GraphNodeSize.NORMAL
            });
        }
    }
}
