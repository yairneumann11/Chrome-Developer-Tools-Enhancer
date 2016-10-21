
import React from "react";
import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import Sidebar from "./Sidebar";
import CodeTable from "./CodeTable";




class ContentCode extends React.Component {

  constructor(props){
    super(props);
    console.log(this);

    this.setSelectedSite = this.setSelectedSite.bind(this);

  }

  componentWillMount(){

    let firstSite = Object.keys(this.props.code)[0];
    this.setState({
      selectedSite: firstSite,
      capture: false,
      captureClassName:'content_container'
    })
  }

  componentDidMount(){
    this.props.componentLoaded();
  }

  componentDidUpdate(){
    console.log("componentWillUpdate");
    let siteCode = Object.keys(this.props.code);

    if( siteCode.length === 1 && !this.state.selectedSite){
      this.setState({
        selectedSite: siteCode[0]
      })
    }


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
            <Sidebar code={this.props.code} setSelectedSite={this.setSelectedSite.bind(this)} capture={this.state.capture}  toggleCapture={this.showCapture.bind(this)}/>
          </div>
          <div className="col-sm-8">
            <CodeTable code={this.props.code} selectedSite={this.state.selectedSite} />
          </div>
        </div>
      </div>
    );
  }
}

export default ContentCode;
