// https://nivo.rocks/calendar/
// https://visjs.github.io/vis-network/examples/network/data/scalingNodesEdgesLabels.html

import * as vis from 'vis';
import {ResponsiveCalendar} from '@nivo/calendar';
import ReactMarkdown from 'react-markdown';
import {useState} from "react";

function App() {

    const [x, setX] = useState('');

    setTimeout(() => {
        new vis.Network(
            document.getElementById('tree')!,
            {
                nodes: [
                    {id: 1, label: 'A'},
                    {id: 2, label: 'B'},
                    {id: 3, label: 'C'},
                    {id: 4, label: 'D'},
                    {id: 5, label: 'E'},
                    {id: 6, label: 'E'},
                    {id: 7, label: 'E'}

                ],
                edges: [
                    {from: 1, to: 2},
                    {from: 2, to: 3},
                    {from: 2, to: 4},
                    {from: 3, to: 4},
                    {from: 4, to: 5},
                    {from: 6, to: 7}
                ]
            },
            {
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
                }
            }
        );

    }, 500)

    const data = [
        {
            "value": 355,
            "day": "2022-14-01"
        },
        {
            "value": 322,
            "day": "2022-04-29"
        },
        {
            "value": 296,
            "day": "2022-04-22"
        },
        {
            "value": 364,
            "day": "2022-04-14"
        }
    ];
    return (
        <>
            <div className='app-header'>
                <div className='app-header__notes-name'>
                    <strong>
                        Notes name
                    </strong>
                </div>
                <div className='app-header__buttons'>
                    <button>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <input className='app-header__search' type="text" placeholder='search...'/>
                    <button>
                        <i className="fa-solid fa-search"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-calendar-check"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-list-check"></i>
                    </button>
                </div>
            </div>
            <div className='app-graph' id={'tree'}></div>
            <div className='app-editor'>
                <input className='app-editor__note-title' type="text" value='Note title'/>
                <div className='app-editor__buttons'>
                    <button className='app-editor__close-button'>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <button className='active'>
                        <i className='fa-solid fa-save'></i>
                        <span>save</span>
                    </button>
                    <button>
                        <i className='fa-solid fa-edit'></i>
                    </button>
                    <button className='danger'>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button>
                        <i className='fa-solid fa-plus'></i>
                        <span>parent</span>
                    </button>
                </div>
                <textarea className='app-editor__note-content'
                          onChange={(event) => setX(event.target.value)}
                          rows={20}></textarea>
                <ReactMarkdown>{ x }</ReactMarkdown>
            </div>
            <div className='app-footer'>
                <div className="app-footer__calendar">
                    <ResponsiveCalendar data={data}
                                        from='2022-01-01'
                                        to='2022-05-01'
                                        dayBorderWidth={0}
                                        daySpacing={2}
                                        emptyColor="#737373"
                                        dayBorderColor="transparent"
                                        monthBorderColor="transparent"
                                        monthSpacing={20}
                                        isInteractive={false}
                                        monthLegendPosition={'before'}
                                        align={"bottom"}
                                        colors={['#a3a3a3']}
                                        theme={{
                                            textColor: '#e2e8f0'
                                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default App
