
import React from "react";
import Communication from "../common/communication";
import Storage from "../common/storage";
import Events from "../common/events";
import Sidebar from "./Sidebar";
import CodeTable from "./CodeTable";




class ContentCode extends React.Component {

  constructor(props){
    super(props);
    console.log(this);

    this.setSelectedSite = this.setSelectedSite.bind(this);

  }

  componentWillMount(){

    // let firstSite = Object.keys(this.props.code)[0];
    //
    //
    // if( !firstSite ){
    //   Storage.getCode().then((code)=>{
    //     console.log("first code", code);
    //
    //     firstSite = Object.keys(code)[0];
    //     this.setState({
    //       selectedSite: this.props.selectedSite,
    //       capture: false,
    //       captureClassName:'content_container'
    //     })
    //   })
    // }

    this.setState({
      selectedSite: this.props.selectedSite,
      capture: false,
      captureClassName:'content_container'
    })

  }

  componentDidMount(){
    console.log("componentDidMount!!!!!!");
  }

  setSelectedSite(site) {

    this.setState({
      selectedSite: site
    });

    console.log(this);

  }
  showCapture() {

    if(this.state.capture){
      this.setState({
          captureClassName:'content_container',
          capture:false
        })
    }else{
      this.setState({
          captureClassName:'content_container capture-frame',
          capture:true
        })
    }

    console.log(this);

  }



  render() {
    return (
      <div className={this.state.captureClassName}>
        <div className="row">
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Sidebar code={this.props.code} setSelectedSite={this.props.setSelectedSite} capture={this.state.capture}  toggleCapture={this.showCapture.bind(this)}/>
          </div>
          <div className="col-sm-8">
            <CodeTable code={this.props.code} selectedSite={this.props.selectedSite}  />
          </div>
        </div>
      </div>
    );
  }
}

export default ContentCode;
