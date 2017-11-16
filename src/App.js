import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, Tools, Footer, MyFancyComponent } from './components'
import { setTimeout } from 'timers';
import { apiCaller } from './helpers/ApiCaller';

class App extends Component {
  state= {
    isTime: false
  }

  isTimeOut() {
    this.getData()
    setTimeout(() => {
      this.setState({isTime: true})
    }, 10000)
  }

  getData() {
    apiCaller.getAllCamps().then((res)=> {
      var data = res.data.map((dt) => {
        dt.type = 'camp'
        return dt
      })
      localStorage.setItem('camps', JSON.stringify(data))
    })
    apiCaller.getAllDist().then((res)=> {
      var data = res.data.map((dt) => {
        dt.type = 'dist'
        return dt
      })
      localStorage.setItem('dists', JSON.stringify(res.data))
    })
    apiCaller.getAllNeeds().then((res)=> {
      var data = res.data.map((dt) => {
        dt.type = 'need'
        return dt
      })
      localStorage.setItem('needs', JSON.stringify(res.data))
    })
  }

  itRenderTime() {
    {this.isTimeOut()}
    if(this.state.isTime) {
      return <MyFancyComponent />
    }
  }

  render() {
    const isTime = this.state.isTime
    return (
      <div className="App">
        <Header />
				{this.itRenderTime()}
				<div>
        
      </div>
				<Tools />
				<Footer />
      </div>
    );
  }
}

export default App;
