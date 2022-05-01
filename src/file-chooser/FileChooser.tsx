import './FileChooser.css';
import {Logo} from "../logo/Logo";
import {Api} from "../Api";
import {useState} from "react";

export function FileChooser() {

    const MAX_FILES_ON_LIST = 5;

    const createFile = () => Api.createFile();
    const openFile = () => Api.open();
    const loadFile = (filePath: string) => Api.load(filePath);
    const [filer, setFilter] = useState('');

    const recentlyOpenedFiles: Array<string> = JSON.parse(localStorage.getItem('files') || '[]');

    return (
        <div className='app-file-chooser'>
            <div className='app-file-chooser__list'>
                <div className='app-file-chooser__brand'>
                    <Logo size={100}/>
                    <div>
                        <h1>Threads</h1>
                        <h3>Note app for multithreading people</h3>
                    </div>
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', maxHeight: '50vh', overflow: 'auto', padding: '20px'}}>
                    <div className='separator-margin' style={{display: 'flex', gap: '5px', width: '100%'}}>
                        <input style={{flexGrow: '1'}}
                               type="text"
                               placeholder='search...'
                               value={filer}
                               onChange={event => setFilter(event.target.value)}/>
                        <button>
                            <i className="fa-solid fa-search app-file-chooser__file-icon"/>
                        </button>
                    </div>

                    <div className='app-file-chooser__file' onClick={() => createFile()}>
                        <i className="fa-solid fa-plus app-file-chooser__file-icon"/>
                        Create file
                    </div>
                    <div className='app-file-chooser__file separator-margin' onClick={() => openFile()}>
                        <i className="fa-solid fa-file-download app-file-chooser__file-icon"/>
                        Open new file
                    </div>
                    {
                        recentlyOpenedFiles
                            .filter(x => x.toLocaleLowerCase().includes(filer ? filer.toLocaleLowerCase() : ''))
                            .map((fileName, i) => {
                                return (
                                    <div className='app-file-chooser__file' onClick={() => loadFile(fileName)}>
                                        <i className="fa-solid fa-file app-file-chooser__file-icon"/>
                                        {fileName}
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    )
}
