import '../styles/pages/not-found.scss';

import Art from '../components/art/Art';
import MessageHeader from '../components/message/MessageHeader'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Art component={
      <div className="container-not-found">
        <div className="message">
          <Link to={'/'}><MessageHeader text="" /></Link>
          <p>404</p>
        </div>
      </div>
    }>
    </Art>
  )
}

export default NotFound