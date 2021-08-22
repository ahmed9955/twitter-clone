import axios from 'axios';
import React from 'react'
class Form extends React.Component {
    
    constructor(){
        super()
        this.state = {
            input: ''
        }
    }    

    send() {        

        var formdata = new FormData();

        formdata.append( "avatar", this.state.input )

        var requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': localStorage.getItem('token')
          },
          body: formdata,
          redirect: 'follow'
        };
        
        fetch( "http://localhost:2000/avatar" , requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))

    }

    render() {
      return (
        <div>
          <form >
            
            <input onChange={ (e) => this.setState({ input : e.target.files[0] })} id = 'im-empty' type="file" accept='image/*' name="im-empty" />
          </form>
          <button onClick={() => this.send()}>Send</button>
        </div>
      );
    }
  }

export default Form