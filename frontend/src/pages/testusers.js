import React, {Component} from 'react';
import axios from "axios";

class Testusers extends Component {
    state = {details:[], }
    componentDidMount() {
        let data;
        axios.get("http://localhost:8000")
            .then(res =>{
                data = res.data;
                this.setState({
                    details: data
                });

            })
            .catch(err =>{
                console.log(err);
            })

    }
    render() {
        return (
            <div>
                <h1> Данные из джанго</h1>
                <hr/>
                {this.state.details.map((output, id) =>(
                    <div key={id}>
                        <div>
                            <h1>Пользователь {id+1}</h1>
                            <h2>{output.name}</h2>
                            <h2>{output.email}</h2>
                            <h2>{output.password}</h2>
                        </div>
                    </div>

                ))}

            </div>
        );
    }
}

export default Testusers;