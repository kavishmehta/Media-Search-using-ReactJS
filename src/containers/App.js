import React, { Component, PropTypes } from 'react';

class App extends Component {
    render() {
        return (
            <div className="container-fluid text-center">
                { this.props.children }
            </div>
        );
    }   //render
}   //App

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;