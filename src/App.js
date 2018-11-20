import React, { Component } from 'react';
import './App.css';
import { debounce } from 'lodash';

class App extends Component {

  state = { data:[]}
  static URL = 'https://www.deksuan.com/api/search/?q='

  search = (event) => {
    this.searchAPI(event.target.value)
   }

   searchAPI = debounce((text)=>{
    fetch(App.URL + text)
    .then(res => res.json())
    .then(json => this.setState({data:json.data}))
  },500)
  
  render() {
    return (
      <div>
        <h1 class="mt-5 mb-3 text-center"><i class="fab fa-react"></i><br/>SSRU API</h1>
        <input type='text' onKeyUp={(event, value) => this.search(event,value)} class="form-control" placeholder="Search..."/>
        <ul class="list-group mt-3">
        { this.state.data.map(
          data => 
            <li class="list-group-item list-group-item-action">
              <strong>{data.fname} {data.lname}</strong>&nbsp;<span class="text-danger">({data.id})</span>
              <br/>
              <small class="text-muted"><i class="fas fa-graduation-cap"></i> { data.major } , { data.faculty }</small>
            </li>
        ) }
      </ul>
     </div>
    );
  }
}

export default App;
