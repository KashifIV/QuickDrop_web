import React, { Component } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";
import {getFileList, downloadFile, uploadFiles} from '../../redux/actions'; 
import {connect} from 'react-redux'; 
import Dropzone from 'react-dropzone'; 


class Dropped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: this.props.fileNames.map((item, index) => ({title: item, id: index})),
      WarningMessageOpen: false,
      WarningMessageText: "",
      token: this.props.token, 
    };
    if (this.props.token != "")
      this.props.getFiles(this.props.token); 
    console.log(this.state.gridTextAssets);
    this.onClickItem = this.onClickItem.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }
  componentDidUpdate(prevProps){
    if (this.props.token != prevProps.token){
      this.setState({token: this.props.token}); 
      if (this.props.token != ""){
          this.props.getFiles(this.props.token);
      }
    }
    if (this.props.fileNames.length > 0 && this.props.fileNames != prevProps.fileNames){
      const assets = this.props.fileNames.map((item, index) => ({title: item, id: index}));
      console.log(assets);
      this.setState({
        gridTextAssets: assets
      });
    }
  }
  onClickItem(key){
    console.log(key);
    this.props.downloadFile(this.state.gridTextAssets[key].title, this.state.token); 
  }
  onDropFiles = (files) => {
    console.log(files); 
    this.props.uploadFiles(files, this.state.token); 
  }
  render() {

    const {
      gridTextAssets,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main id="mainContent">

       
          <Dropzone onDrop={(files) => this.onDropFiles(files)}>
            {({getRootProps, getInputProps}) => (

                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={classnames("text-center", styles.header)}>
                      <h1>Quickdrop</h1>
                      <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  </div>
              )}
          </Dropzone>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>Files you've Dropped</h1>
          </div>

          <div className="row justify-content-around text-center">
            {gridTextAssets.map(textAssets => (
              <GridComponent
                key={textAssets.id}
                id = {textAssets.id}
                header={textAssets.title}
                callback = {this.onClickItem}
              />
            ))}
          </div>
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth, 
  fileNames: state.fileNames
})
const mapDispatchToProps = dispatch => {
  return {
    getFiles: (token) => dispatch(getFileList(token)),
    downloadFile: (name, token) => dispatch(downloadFile(name, token)), 
    uploadFiles: (files,token) => dispatch(uploadFiles(files, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropped); 