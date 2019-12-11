import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import API from 'utils/api';
import { createStructuredSelector } from 'reselect';
import { fetchCurrentUserProfile } from 'state/login/action';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import dummy from 'static/dummy.jpeg';
import { makePropic, makeUserId, makeUser } from 'state/login/selectors';
import { toastSuccess, toastError } from 'components/Toaster';
// import { UserRegisterModal } from 'components/Modals';
class Profile extends Component {
  static propTypes = {
    userDetails: PropTypes.any,
    profilePic: PropTypes.string,
    userId: PropTypes.number,
    fetchCurrentUserProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cpOpen: false,
      file: '',
      imagePreviewUrl: '',
      oldPassword: '',
      newPassword: '',
      confPassword: '',
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.onChangePassSubmit = this.onChangePassSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onUploadClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      file: '',
      imagePreviewUrl: '',
    }));
  };

  onEditProfileClick = () => {};

  onChangePasswordClick = () => {
    this.setState(prevState => ({
      cpOpen: !prevState.cpOpen,
      oldPassword: '',
      newPassword: '',
      confPassword: '',
    }));
  };

  async onChangePassSubmit(e) {
    e.preventDefault();
    const { oldPassword, newPassword, confPassword } = this.state;
    const userId = this.props.userId;
    const data = { userId, oldPassword, newPassword, confPassword };
    const uri = '/api/teacher/change/password';
    try {
      const res = await API.post(uri, data);
      toastSuccess(res);
    } catch (error) {
      console.log('Error', error);
      toastError(error.response.data);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async _handleSubmit(e) {
    e.preventDefault();

    const uri = `/api/teacher/upload/profile/picture`;
    const formData = new FormData();
    formData.append('profilePic', this.state.file);
    formData.append('userId', this.props.userId);
    try {
      const res = await API.post(uri, formData);
      toastSuccess(res);
      this.setState({ isOpen: false });
      this.props.fetchCurrentUserProfile();
    } catch (error) {
      console.log('Error', error);
      toastError('Problem occur while uploading picture.');
    }
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
    const { profilePic, userDetails } = this.props;
    const details = userDetails.toJS();
    const img =
      profilePic === '' ? dummy : `data:image/jpeg;base64, ${profilePic}`;

    const { isOpen, cpOpen } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="" src={imagePreviewUrl} />;
    }
    return (
      <div className="container">
        <div className="row ">
          <div className="col-12 text-center">
            <div className="imgView">
              <img src={img} alt="PP" />
            </div>
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
        <div className="row mt-2">
          <div className="m-auto col-10 lead">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>
                    {details.firstName} {details.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{details.email}</td>
                </tr>

                <tr>
                  <td>EIIN</td>
                  <td>{details.eiinNumber}</td>
                </tr>

                <tr>
                  <td>Permanent Address</td>
                  <td>{details.permanentAddress}</td>
                </tr>

                <tr>
                  <td>Current Address</td>
                  <td>{details.tempAddress}</td>
                </tr>
                <tr>
                  <td>Birth Date</td>
                  <td>
                    {moment
                      .unix(details.birthDate / 1000)
                      .format('DD MMM YYYY')}
                  </td>
                </tr>
                <tr>
                  <td>Join Date</td>
                  <td>
                    {moment.unix(details.joinDate / 1000).format('DD MMM YYYY')}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row m-auto">
              <div>
                {/* <button
                  className="btn btn-primary"
                  onClick={this.onEditProfileClick}
                >
                  Edit Profile
                </button> */}
                <button
                  className="btn btn-primary"
                  onClick={this.onChangePasswordClick}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal centered isOpen={isOpen} toggle={this.onUploadClick}>
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
        <Modal centered isOpen={cpOpen} toggle={this.onChangePasswordClick}>
          <ModalHeader toggle={this.onChangePasswordClick}>
            Change Password
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <form onSubmit={this.onChangePassSubmit}>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  required
                  name="oldPassword"
                  className="form-control"
                  type="password"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="newPassword">New Password</label>
                <input
                  required
                  name="newPassword"
                  className="form-control"
                  type="password"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="confPassword">Confirm Password</label>
                <input
                  required
                  name="confPassword"
                  className="form-control"
                  type="password"
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-md btn-success">Submit</button>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profilePic: makePropic(),
  userId: makeUserId(),
  userDetails: makeUser(),
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserProfile: () => dispatch(fetchCurrentUserProfile()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Profile);
