import {connect} from "react-redux";
import Home from "./Home";

const mapStateToProps = (state) => {
  const props = {
    displayAuthentication: state.app.displayAuthentication
  };
  return props;
};

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
