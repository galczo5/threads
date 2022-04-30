// https://nivo.rocks/calendar/
// https://visjs.github.io/vis-network/examples/network/data/scalingNodesEdgesLabels.html

import * as vis from 'vis';

function App() {

    setTimeout(() => {
        new vis.Network(
            document.getElementById('tree'),
            {
                nodes: [
                    { id: 1, label: 'A' },
                    { id: 2, label: 'B' },
                    { id: 3, label: 'C' },
                    { id: 4, label: 'D' },
                    { id: 5, label: 'E' },
                    { id: 6, label: 'E' },
                    { id: 7, label: 'E' }

                ],
                edges: [
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 2, to: 4 },
                    { from: 3, to: 4 },
                    { from: 4, to: 5 },
                    { from: 6, to: 7 }
                ]
            },
            {
                nodes: {
                    shape: "dot",
                    borderWidth: 0
                },
                edges: {
                    arrows: {
                        to: true
                    },
                    dashes: true
                }
            }
        );

    }, 500)

    return (
        <div style={{
            height: '100vh',
            width: '100vw'
        }} id={'tree'}></div>
    );
}

export default App
