import {connect} from "react-redux";
import {withRouter} from 'react-router';
import Main from "../components/Main";
import {push} from "react-router-redux"

export default withRouter(connect((state, props) => ({
}),(dispatch, props) => ({
    changePage(page){
        dispatch(push(page))
    }
}))(Main));
