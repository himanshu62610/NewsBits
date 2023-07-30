import React, { Component } from 'react'

class newscomponent extends Component {
  render() {
    let {title,description,imageurl,newsurl}=this.props;
    return (
      <div>
       <div className="card">
  <img src={imageurl} class="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={newsurl} className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default newscomponent;
