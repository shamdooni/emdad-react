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
      height                : '590px',
      marginRight           : '-40%',
      transform             : 'translate(-50%, -50%)',
    }
  };

export class NeedFormModal extends Component {
    state = {
        name: '',
        title: '',
        needs: ''
    }

    componentWillMount() {
        localStorage.setItem('location', '')
    }

    clickButton(e) {
        e.preventDefault()
        const {lat, lng} = JSON.parse(localStorage.getItem('location'))
        const {name, title, needs} = this.state
        const sendObject = { lat, lng, name, title, needs}
        apiCaller.postNeeds(sendObject).then((res)=>{
            this.props.closeModal()
        }).catch((err)=> console.log(err))
    }

    setName(event) {
        this.setState({name: event.target.value})
    }
    
    setTitle(event) {
        this.setState({title: event.target.value})
    }

    setNeeds(event) {
        this.setState({needs: event.target.value})
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Dis Form Modal"
            >
                <p style={{fontSize: '0.6em'}}>پر کردن تمام فرم ها الزامی است</p>
                <form>
                    <div className="form-div">
                        <input className="shamdooni-input input-100" placeholder="نام شما" onChange={this.setName.bind(this)} value={this.state.name}/>
                        <input className="shamdooni-input input-100" placeholder="عنوان شما ( امدادرسان هلال احمر، شهروند و ... )" onChange={this.setTitle.bind(this)} value={this.state.title} />
                        <textarea className="shamdooni-textarea input-100" placeholder="توضیحات اجناس مورد نیاز" onChange={this.setNeeds.bind(this)} >{this.state.needs}</textarea>
                    </div>
                    <SelectMap />
                    <button className="submit-button" onClick={this.clickButton.bind(this)}>ثبت نیازها</button>
                </form>
            </Modal>
        )
    }
}