import Header from "../Header";
import { Component } from "react";

const render = () => ({
    "initial" : "INITIAL",
    "loading":"LOADING",
    "success":"SUCCESS",
    "error":"ERROR",

})
class Home extends Component{
    state = {renderStatus:this.render.initial}
    render(){
        return <>
        <Header/>
        </>
    }
}

export default Home