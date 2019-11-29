import React from "react";
import {MdInsertDriveFile} from 'react-icons/md'
export default function GridComponent(props) {
  const {id, header,callback} = props;
  return (
    <div className="col-md-4 col-sm-12 p-5" onClick = {() => callback(id)}>
      <MdInsertDriveFile size={32} style={{color: 'white'}}/>
      <h3>{header}</h3>
    </div>
  );
}
