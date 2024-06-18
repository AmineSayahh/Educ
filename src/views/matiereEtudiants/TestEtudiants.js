import React , {Component} from 'react'
import axios from 'axios'


class user extends Component{

    state = {
         users : [],
    };
    componentDidMount(){
         axios.get("http://localhost:3001/user/getAll").then(res=>{
            console.log(res)
            this.setState({users:res.data})
            console.log(this.state.users)
        })
    }

    render() {
        return (
            <ul>
            {this.state.users.map(user =><li>{user.nomuser} </li>)}
            </ul>
    )}
}
export default user;
