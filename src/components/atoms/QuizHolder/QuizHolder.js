import styled from 'styled-components';

const QuizHolder = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  overflow-y: hidden;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export default QuizHolder;
