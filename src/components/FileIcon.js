import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const FileIcon = ({type, name, date, openState, filePath}) => <Link className={type+"Icon "+openState} title={date} to={filePath}>{name}</Link>;

export default FileIcon;