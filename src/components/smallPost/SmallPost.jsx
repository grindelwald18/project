import React from 'react'
export class SmallPost extends React.Component {
  render () {
    return (
      <div className={`card ${this.props.cardType}`} style={{ width: '25%', height: '50%' }}>
        <div className="card-body" style={{ width: '60%' }}>
          <h5 className="card-title">{this.props.title}</h5>
        </div>
        <img src={'../../img/astronaut.jpg'} className="card-img-right" />
      </div>
    )
  }
}
