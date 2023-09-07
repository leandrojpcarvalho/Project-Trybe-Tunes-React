import styled from 'styled-components';
import { generateColor } from '../../utils';

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

export type PropFormGrid = {
  defaultValue: {
    columns: [ fr: number, repeat: number];
    rows: [ fr: number, repeat: number],
    form: string;
  };
};

const validFormGrid = (
  data: [fr: number, repeat: number],
) => {
  const [fr, repeat] = data;
  if (!fr || !repeat) return 'none';
  return `repeat(${repeat}, ${fr}fr)`;
};

const formType = (type: string) => {
  switch (type) {
    case 'editar':
      return ('align-itens: stretch, justify-itens: center');
    case 'search':
      return ('align-itens: stretch, justify-itens: center');
    default:
      return '';
  }
};

export const Form = styled.form`
  grid-template-columns: ${
  ({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue.columns)};
  grid-template-rows: ${
  ({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue.rows)};
  display: grid;
  margin: 0 auto;
  gap: 10px;
  align-content: space-evenly;
  justify-content: center;
  align-items: ${(
    { defaultValue }: PropFormGrid,
  ) => (
    defaultValue.form === 'editar' ? 'stretch' : 'center')};
  justify-items: ${(
    { defaultValue }: PropFormGrid,
  ) => (
    defaultValue.form === 'editar' ? 'center' : 'stretch')};
  /* margin: 15px 10px; */
`;

/* export const FormGridLayout = styled.div`
  grid-template-columns: ${({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue, 'columns')};
  grid-template-rows: ${({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue, 'rows')}
`; */
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
  height: 75vh;
  .show{
    height:56vh;
    overflow: auto;
  }
`;

type PropColor = {
  color: string;
};

export const Banner = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: ${({ defaultValue }: string) => generateColor(defaultValue)};
  background-color: ${({ defaultValue }: string) => (defaultValue)};
  font-weight: bold;
  text-shadow: 1px 1px 2px white;
  width:50vh;
  height: 100%;
 `;

export const MarginAuto = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2{
    margin: 10px 0;
    text-align: center;
  }
`;
