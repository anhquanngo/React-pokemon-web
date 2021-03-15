import React from 'react';
import LoadingIcon from '../assets/images/loading.gif';
import './style.css';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as uiActions from '../redux/action/ui.action';

function GloballLoading(props) {
    const { showLoading } = props
    if (showLoading) {
        return (
            <div className="Loading">
                <div className="Loading__icon">
                    <img style={{ width: '150px' }} src={LoadingIcon} alt="Loading" />
                    <h2 style={{ marginLeft: 30 }}>Loading...</h2>
                </div>
            </div>
        )
    }
    return (
        null
    );
}

GloballLoading.prototype = {
    showLoading: Boolean
}

const mapStateToProps = state => {
    return {
        showLoading: state.ui.showLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(GloballLoading)