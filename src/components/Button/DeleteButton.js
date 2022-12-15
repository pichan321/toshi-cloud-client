import React from "react";
import Button from 'rsuite/Button';

export default class DownloadButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      }
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.setState({loading: true})
        this.props.clicked(this.props.data);
        setTimeout(() => { this.setState({loading: false}) }, 1000)
    }
    render() {
      return (
        <Button appearance="primary" color="red" onClick={this.btnClickedHandler} loading={this.state.loading}>Delete</Button>
      )
    }
  }