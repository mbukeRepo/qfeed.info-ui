import "./Nav.css";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authActions";
function Nav(props) {
  const logoutApp = (event) => {
    props.logout()
  }
  return (
   <div className="main-nav">
     <div className="logo" style={{cursor: "pointer"}}>
     <Link to="/">
       <h3 style={{color:"rgb(226, 116, 13)"}}>Qfeed</h3>
       </Link>
     </div>
     <ul className="nav-list">
     {props.isAuth ? 
     <Link to="/share" >
       <li className="nav-list__item">
         
           <PlusOutlined style={{color: 'white', fontSize:'20px'}} />
         
       </li>
       </Link>: null
      }
       {props.isAuth ? 
         <li className="nav-list__item" onClick={logoutApp} style={{cursor: "pointer"}}>
            Logout  
         </li>
         :
         <Link to="/signup" > 
         <li className="nav-list__item">
           Sign Up
         </li>
         </Link>
       }
       

     </ul>
   </div> 
  );
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth   
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout : () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);