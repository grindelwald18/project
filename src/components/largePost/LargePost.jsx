export function LargePost (props) {
  return (
    <div className={`card ${props.cardType} d-flex flex-row my-2 overflow-hidden`}>
      <img src={props.image} style={{ objectFit: 'cover', width: '200px', height: '200px' }} className="card-img-right" />
      <div className="card-body" style={{ width: '60%' }}>
        <h5 className="card-title" >{props.title}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  )
}
