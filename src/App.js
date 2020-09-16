import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className="App">
                <div className="app-content">
                    <p>
                        Hello, Project!
                    </p>
                </div>
            </div>
        );
    }
}

export default App;
