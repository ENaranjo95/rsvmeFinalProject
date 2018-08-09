import React, { Component } from 'react'

class Home extends Component {

  state = {
    img: []
  }

  componentDidMount(){
    let images = ["../../img/table.jpg", "../../booth.jpg"]
    let image = ''
    let count = 0
    for(let i = 0; i < images.length; i++){

    }

    this.setState({
      img: images
    })
  }


  render() {
    return (
      <main>
        <img id="img" src={this.state.img} />
      </main>
    );
  }
}

export default Home
