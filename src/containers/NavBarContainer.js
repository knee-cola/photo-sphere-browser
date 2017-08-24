import React from 'react';
import { connect } from 'react-redux'
import { NavBar } from '../components/NavBar'

const mapStateToProps = (state, ownProps) => ({
	pathname: state.get('pathname')
});

const ComponentWrapper = (props) => <NavBar {...props} pathname={ props.pathname } />;

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);