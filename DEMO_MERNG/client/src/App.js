import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MenuBar from "./components/Menu";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./untils/auth";
import { from } from 'apollo-link';
import AuthRoute from './untils/authRoute';
// import SinglePost from './SinglePost'
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          {/* <Route exact path="/posts/:postId" component={SinglePost}/> */}
        </Container>
      </Router>
     </AuthProvider>
  );
}

export default App;
