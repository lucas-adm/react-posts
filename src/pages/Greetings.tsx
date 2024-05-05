import '../styles/pages/greetings.scss';

import MessageHeader from '../components/message/MessageHeader'

import { Link } from 'react-router-dom'

const Greetings = () => {
  return (
    <div className="container-confirm">
      <div className="top-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill-opacity="1" d="M0,288L60,282.7C120,277,240,267,360,240C480,213,600,171,720,176C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      <div className="message">
        <MessageHeader text="Conta ativada!" />
        <p>Agradecemos pela confirmação de email!</p>
        <div className="emote">🎉🎉🎉</div>
        <p>Nossa única regra é não seguir outras regras.</p>
        <p>Para acessar o site basta realizar <Link to={'/login'}>login.</Link></p>
      </div>
      <div className="bot-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill-opacity="1" d="M0,288L60,282.7C120,277,240,267,360,240C480,213,600,171,720,176C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  )
}

export default Greetings