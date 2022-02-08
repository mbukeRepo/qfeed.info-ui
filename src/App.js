import Nav from "./components/Nav";
import {Switch, Route} from "react-router-dom"
import FeedList from "./pages/FeedList";
import FeedItem from "./pages/FeedItem";
import SharePage from "./pages/SharePage";
import {connect} from "react-redux";
import React from "react";
import { checkAuthState } from "./store/actions/authActions";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

class  App extends React.Component {
  componentDidMount = () => {
    this.props.checkAuth();
  }
  render(){
    return (
      <div className="main-layout">
        <Nav/>
        <div className="content">
         <Switch>
{this.props.isAuth ? <Route path="/share" component={SharePage} /> : null }
{!this.props.isAuth ? <Route path="/login" component={Login} />: null}
{!this.props.isAuth ? <Route path="/signup" component={SignUp} /> : null}
           <Route path="/:id" component={FeedItem}/>
           <Route path="/" component={FeedList} />
         </Switch>
        </div>
      </div>
     );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth   
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;
