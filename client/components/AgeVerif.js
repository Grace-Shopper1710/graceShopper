import React from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../store'
import Modal from 'react-modal'

const mapState = state => ({
  modalIsOpen: state.ageverif
})

const mapDispatch = dispatch => ({
    toggleModal: () => event => {
      dispatch(toggleModal(false))
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
          <h1>Are you over 21</h1>
        </Modal>
    )
}

const AgeVerifContainer = connect(mapState, mapDispatch)(AgeVerif)

export default AgeVerifContainer