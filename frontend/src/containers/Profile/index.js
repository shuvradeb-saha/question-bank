import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserAvatar from 'react-user-avatar';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, file: '', imagePreviewUrl: '' };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  onUploadClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      file: '',
      imagePreviewUrl: '',
    }));
  };

  _handleSubmit(e) {
    e.preventDefault();
    console.log('this.state.file', this.state.file);

    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }
  render() {
    const { isOpen } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="" src={imagePreviewUrl} />;
    }
    return (
      <div className="container">
        <div className="row ">
          <div className="col-12 text-center">
            <div className="imgView"></div>
          </div>
          <div className="col-12 text-center">
            <button
              className="btn btn-outline-dark"
              onClick={this.onUploadClick}
            >
              Upload New Picture
            </button>
          </div>
        </div>
        <Modal centered isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Upload Profile Picture</ModalHeader>
          <ModalBody>
            <div className="previewComponent">
              <form onSubmit={this._handleSubmit}>
                <input
                  className="fileInput"
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={this._handleImageChange}
                />
                <button
                  className="submitButton"
                  type="submit"
                  onClick={this._handleSubmit}
                >
                  Upload Image
                </button>
              </form>
              <div className="imgPreview">{$imagePreview}</div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={this.onUploadClick}
              type="button"
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Profile;
