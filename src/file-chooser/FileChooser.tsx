import './FileChooser.css';
import {Logo} from "../logo/Logo";
import {Link} from "react-router-dom";

export function FileChooser() {
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

                <div style={{display: 'flex', gap: '5px'}}>
                    <input style={{width: '300px'}} type="text" placeholder='search...'/>
                    <button>
                        <i className="fa-solid fa-search"></i>
                    </button>
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                    <div className='app-file-chooser__file app-file-chooser__file--active'>
                        <i className="fa-solid fa-3x fa-file-download app-file-chooser__file-icon"></i>
                        Open new file
                    </div>
                    {
                        new Array(5).fill(0).map((x, i) => {
                            return (
                                <Link key={i} to={'/note/asd'}>
                                    <div className='app-file-chooser__file'>
                                        <i className="fa-solid fa-3x fa-file app-file-chooser__file-icon"></i>
                                        note.json
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
