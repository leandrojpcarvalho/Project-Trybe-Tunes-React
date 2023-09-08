import styled from 'styled-components';

function Loading() {
  return (
    <MiddleDiv className="fade">
      <Carregando />
    </MiddleDiv>
  );
}

const Carregando = styled.span`
  width: 200px;
  height: 200px;
  background-color: transparent;
  border: 25px solid #ffb855;
  border-top: 25px solid transparent;
  border-radius: 100%;
  display :block;
  animation: rotating 1s ease-in-out infinite;

  @keyframes rotating {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
    
  }
`;

const MiddleDiv = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default Loading;
