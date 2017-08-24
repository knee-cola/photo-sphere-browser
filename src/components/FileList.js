import React from 'react';
import FileIcon from './FileIcon';
import Request from 'superagent';

const FileList = ({ files }) =>
	<div className="fileList">
		{
			_rednerList(files)
		}
	</div>;

var _rednerList = (files) => {

	if(files === null) {
		return(<p className="msg">loading</p>);
	} else if(files.length === 0) {
		return(<p className="msg">folder is empty</p>);
	} else {
		return(files.map(el => <FileIcon type={el.type} date={el.date} name={el.name} key={el.name} filePath={el.filePath} openState={el.openState} />))
	}
} // _rednerList() {...}

export default FileList;