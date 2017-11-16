import React, { Component } from 'react'
import { DisFormModal, NeedFormModal, CampFormModal } from './'

export class Tools extends Component {
    constructor() {
        super()

        this.state = {
           modalIsOpen: false,
           needModalIsOpen: false,
           campModalIsOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openNeedModal = this.openNeedModal.bind(this);
        this.closeNeedModal = this.closeNeedModal.bind(this);
        this.openCampModal = this.openCampModal.bind(this);
        this.closeCampModal = this.closeCampModal.bind(this);

    }


    
    closeModal() {
        this.setState({modalIsOpen: false});
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeNeedModal() {
        this.setState({needModalIsOpen: false});
    }


    openNeedModal() {
        this.setState({needModalIsOpen: true});
    }

    closeCampModal() {
        this.setState({campModalIsOpen: false});
    }


    openCampModal() {
        this.setState({campModalIsOpen: true});
    }

    render() {
        return (
            <div className="tools">
                <div className="entry">
                    <button onClick={this.openModal.bind(this)}>ثبت مرسوله</button>
                    <DisFormModal 
                        modalIsOpen={this.state.modalIsOpen}
                        closeModal={this.closeModal}

                    />
                    <button onClick={this.openNeedModal.bind(this)}>ثبت نیازمندی</button>
                    <NeedFormModal 
                        modalIsOpen={this.state.needModalIsOpen}
                        closeModal={this.closeNeedModal}
                    />
                    <button onClick={this.openCampModal.bind(this)}>ثبت موقعیت کمپ</button>
                    <CampFormModal 
                        modalIsOpen={this.state.campModalIsOpen}
                        closeModal={this.closeCampModal}
                    />
                </div>
            </div>
        )
    }
}