import React, { Component } from 'react'
import Modal from 'react-modal';
import { SelectMap } from './'
import { apiCaller } from '../helpers/ApiCaller'

const customStyles = {
    overlay: {
        zIndex: 2000
    },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 : '90%',
      height                : '400px',
      marginRight           : '-40%',
      transform             : 'translate(-50%, -50%)',
    }
  };

export class CampFormModal extends Component {
    state = {
        name: '',
        title: '',
        goods: ''
    }

    componentWillMount() {
        localStorage.setItem('location', '')
    }

    clickButton(e) {
        e.preventDefault()
        const {lat, lng} = JSON.parse(localStorage.getItem('location'))
        const sendObject = { lat, lng}
        apiCaller.postCamps(sendObject).then((res)=>{
            this.props.closeModal()
        }).catch((err)=> console.log(err))
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Dis Form Modal"
            >
                <p style={{fontSize: '0.6em'}}>مکان کمپ رو رو نقشه مشخص کنید</p>
                <form>
                    <SelectMap />
                    <button className="submit-button" onClick={this.clickButton.bind(this)}>ثبت کمپ</button>
                </form>
            </Modal>
        )
    }
}