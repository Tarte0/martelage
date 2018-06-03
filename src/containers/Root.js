import {connect} from "react-redux";
import LandingPage from "../components/LandingPage";
import {initDbThunk} from "../thunks/data";

export default connect((state, props) => ({
    route : state.getIn(['route','route']),
    initStart : state.getIn(['data','initStart']),
    initFail : state.getIn(['data','initFail'])
}),(dispatch, props) => ({
    initDB : ()=>{
        dispatch(initDbThunk())
    }
}))(LandingPage);
