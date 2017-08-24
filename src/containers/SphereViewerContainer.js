import React from 'react';
import { connect } from 'react-redux'
import SphereViewer from '../components/SphereViewer';
import { showSiblingSphere } from '../actions'

const mapStateToProps = (state, ownProps) => ({
	pathname: state.get('pathname')
});

const ComponentWrapper = (props) => <SphereViewer {...props} pathname={ props.pathname } />;

const mapDispatchToProps = (dispatch, ownProps) => ({
	onPrevClick: () => dispatch(showSiblingSphere(-1)),
	onNextClick: () => dispatch(showSiblingSphere(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);