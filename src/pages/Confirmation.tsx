import '../styles/pages/confirmation.scss';

import Art from '../components/art/Art';
import MessageHeader from '../components/message/MessageHeader'

const Confirmation = () => {
  return (
    <Art component={
      <div className="container-confirm">
        <div className="message">
          <MessageHeader text="Ative sua conta!" />
          <p>Uma mensagem de confirmação foi enviada ao seu email de cadastro.</p>
          <p>Caso tenha utilizado o Gmail a mensagem levará cerca de 10 minutos para ser enviada.</p>
          <img src="/svgs/mail.svg" alt="Mail SVG" />
          <p>Ative sua conta para começar a gerar intrigas!</p>
          <p>É necessário ativar a conta para realizar o login, caso contrário entre como convidado.</p>
        </div>
      </div>
    }>
    </Art>
  )
}

export default Confirmation