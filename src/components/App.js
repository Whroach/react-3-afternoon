import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(resolve => {
      alert('Sucessfully added Posts') 
      this.setState({posts: resolve.data})
    })
    .catch(error => {alert('Failed at fetching Posts')

    })

  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(resolve => {
      alert('Successfully updated text')
      this.setState({posts: resolve.data})
    })

    .catch(error =>{
      alert('Failed at updating Text')
    })

  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(resolve => {
      alert('Successfully deleted Post')
      this.setState({posts: resolve.data})
    })

    .catch(error =>{
      alert('Failed at deleting Post')
    })



  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts',{text})
    .then(resolve => {
      alert('Successful Post')
      this.setState({posts: resolve.data})
    })

    .catch(error =>{
      alert('Failed to Post')
    })

  }

  render() {
    const { posts } = this.state;

    // const mappedPosts = this.state.posts.map((element,index) => {
    //   return <Compose key={index} info={element}/>
    // })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map(element => (
              <Post 
              key={element.id} 
              text={element.text} 
              date={element.date}
              updatePostFn={this.updatePost}
              id = {element.id}
              deletePostFn ={this.deletePost}
              

              
              />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
