import React from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../store'
import Modal from 'react-modal'
import moment from 'moment'
import history from '../history'


const mapState = state => ({
  modalIsOpen: state.ageverif
})

const mapDispatch = dispatch => ({
    toggleModal: () => event => {
      dispatch(toggleModal(false))
    },
    tooYoung: () => event => {
      dispatch(toggleModal(false))
      history.push('/tooyoung')
    }
})

const customStyles = {
  content : {
    borderRadius: '0px',
    border: '3px solid #232b2b',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const AgeVerif = (props) => {
    return (
      <Modal
          isOpen={props.modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={props.toggleModal()}
      >
          <h1>Are you 21 or over?</h1>
          You must be born on or before {moment().subtract(21, 'years').calendar()} to visit this site.
          <div className="minor-margin">
          <button onClick={props.toggleModal()}> Yes </button>
          <button onClick={props.tooYoung()}> No </button>
          </div>
        </Modal>
    )
}

const AgeVerifContainer = connect(mapState, mapDispatch)(AgeVerif)

export default AgeVerifContainer