import React from "react";
import {Spin} from 'antd';
import Main from "./Main";
import Init from "./Init";


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                {
                    this.props.route === 'INIT' ?
                        <Init initStart={this.props.initStart} initFail={this.props.initFail}  initDB={this.props.initDB}/> :
                        this.props.route === 'MAIN' ?
                            <Main />
                            :
                            <div style={{
                                marginLeft: "50%",
                                marginTop: "200px"
                            }}><Spin/></div>

                }
            </div>
        );
    }
}

LandingPage.propTypes = {};

export default LandingPage;
