import styled from 'styled-components';

export const BgDiv = styled.div`
    background-image: url(src/images/bg-image.jpg);
    background-position: center;
    height: 100vh;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

export const H1 = styled.h1`
  font-size: 2.5rem;
  text-shadow: gray 2px 4px 3px;
  color: #ff9000;
  padding: 15px;
`;
export const H2 = styled.h2`
  font-size: 1.5rem;
  text-shadow: gray 2px 4px 3px;
  color: #ff9000;
  padding: 15px;
`;

export const Form = styled.form`
  display: grid;
  margin: 0 auto;
  gap: 10px;
  align-content: space-evenly;
  justify-content: center;
  align-items: center;
`;
export const Input = styled.input`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  outline: 0;
  width: 48vh;
  border: 1px solid gray;
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;
`;
export const Button = styled.button`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
`;

export const ShowList = styled.div`
      overflow: hidden;
      height: 50vh;
      .show{
        height:48vh;
        overflow: auto;
      }
`;

export const Banner = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  color: #fffffff3;
  font-weight: bold;
  text-shadow: 1px 1px 2px white;
  width:50vh;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MarginAuto = styled.div`
  margin: 0 auto;
  width: 95%;
  h2{
    margin: 10px 0;
    text-align: center;
  }
`;
