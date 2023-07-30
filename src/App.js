import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
//npm i react-router-dom@latest--used this
//npm install --save react-top-loading-bar
class App extends Component {
  //yaha constructor aur function defined karte hai
  //this.props.var_name se props define karte hai render ke bahar
  // `${var_name}` aise var deifine karte hai render ke bahar

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    //render ke andar  variable aur props  define karte hai iske bahar nahi
    //constructor aur function render ke bahar define karte hai
    // comment section of fetching news categorywise

    let pageSize = 1
    let apiKey="05988ff6836243059fcd3a0c1d537d0a";
    //process.env.REACT_APP_VARNAME;
    return (
      <div>
            {/*used Routes instead of switch*/}
            {/*npm i react-router-dom@latest--used this*/}
            {/* path=''general or General dono sahi hai */}
            
  <Router>
         <Navbar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
     <Routes>
<Route exact path="/" element={<News apiKey={apiKey} setProgress={this.setProgress} key="general" pageSize={pageSize} country="in" category="general" /> } ></Route>
<Route exact path="/sports" element={<News apiKey={apiKey} setProgress={this.setProgress} key="sports" pageSize={pageSize} country="in" category="sports" /> } ></Route>
<Route exact path="/science" element={<News apiKey={apiKey} setProgress={this.setProgress} key="science" pageSize={pageSize} country="in" category="science" /> } ></Route>
<Route exact path="/health" element={<News apiKey={apiKey} setProgress={this.setProgress} key="health" pageSize={pageSize} country="in" category="health" /> } ></Route>
<Route exact path="/technology" element={<News apiKey={apiKey} setProgress={this.setProgress} key="technology" pageSize={pageSize} country="in" category="technology" /> } ></Route>
<Route exact path="/business" element={<News apiKey={apiKey} setProgress={this.setProgress} key="business" pageSize={pageSize} country="in" category="business" /> } ></Route>
<Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={this.setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" /> } ></Route>
<Route exact path="/general" element={<News apiKey={apiKey}  setProgress={this.setProgress} key="general" pageSize={pageSize} country="in" category="general" /> } ></Route>
      </Routes>
  </Router>  
 
 
      </div>
    );
  }
}

export default App;
