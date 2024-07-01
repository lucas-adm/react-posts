import '../styles/pages/greetings.scss';

import Art from '../components/art/Art';
import MessageHeader from '../components/message/MessageHeader'

import { Link } from 'react-router-dom'

const Greetings = () => {
  return (
    <Art component={
      <div className="container-greetings">
        <div className="message">
          <MessageHeader text="Conta ativada!" />
          <p>Agradecemos pela confirmação do email!</p>
          <div className="emote">🎉🎉🎉</div>
          <p>Nossa única regra é não seguir outras regras.</p>
          <p>Para acessar o site basta realizar <Link to={'/login'}>login.</Link></p>
        </div>
      </div>
    }>
    </Art>
  )
}

export default Greetings