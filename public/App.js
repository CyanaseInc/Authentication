import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import "./app.css";
import { Div, StyleReset, ThemeProvider } from "atomize";
import { Fragment } from "react/cjs/react.production.min";
import Login from "../src/auth/login";
import Signup from "../src/auth/signup";
import Forgot from "../src/auth/forgot";
import Verify from "../src/auth/verify";




const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
// 1. Create a client engine instance
const engine = new Styletron();


const theme = {
  colors: {
    black900: "#1d1d1e"
  }
};

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    
    this.fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();  // removing the spinner element
        this.setState({ loading: false }); // showing the app
      }
    });
  }

  fakeRequest = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  };

  render() {
    if (this.state.loading) {
      return null; //app is not ready (fake request is in process)
    }

     return (
  
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <ThemeProvider theme={theme}>
          <StyleReset />
        <Router>
        <Fragment>
  
      <Routes>
        <Route  path='/' exact element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      
     </Fragment>
    </Router>
  

        </ThemeProvider>
      </StyletronProvider>
  
     
    );
  }
}
export default App;