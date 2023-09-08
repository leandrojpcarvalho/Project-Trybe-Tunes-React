import styled from 'styled-components';
import gear from '../../images/gear.png';
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
    type: string;
  };
};

const validFormGrid = (
  data: [fr: number, repeat: number],
  type: string,
) => {
  const [fr, repeat] = data;
  const key = `grid-template-${type}`;
  const value = `repeat(${repeat}, ${fr}fr)`;
  return { [key]: value };
};

const formType = ({ defaultValue }:PropFormGrid, resolution: string) => {
  if (!defaultValue) return '';
  switch (defaultValue.form.concat(resolution)) {
    case 'edit-after-900':
      return ({
        'justify-items': 'center',
      });
    case 'edit-before-900':
      console.log('ui');
      return ({
        'grid-template-rows': '1fr 1fr',
        'grid-template-columns': '1fr 2fr',
        'justify-items': 'center',
        'min-width': '900px',
        button: {
          'grid-column': '1/3',
          'min-width': '760px',
          'margin-top': '20px',
        },
      });
    case 'search-before-900':
      return ({
        'align-content': 'center',
        'grid-template-columns': '4fr 1fr',
      });
    case 'search-after-900':
      return ({
        'align-items': 'center',
        'justify-items': 'stretch',
        ...validFormGrid(defaultValue.rows, 'rows'),
      });
    case ('login-after-900'):
    case 'login-before-900':
      return ({
        'align-content': 'space-evenly',
        'justify-content': 'center',
        ...validFormGrid(defaultValue.rows, 'rows'),
      });
    default:
      return console.log(`${resolution} nao encotrou case`);
  }
};

export const Form = styled.form`
    display: grid;
    margin: 0 auto;
    gap: 10px;
    width: max-content;
    align-items: center;

  @media screen  and (max-width: 900px){
  ${({ defaultValue }: PropFormGrid) => formType(defaultValue, '-after-900')};
  }
  @media screen and (min-width: 900px) {
    background-color: #ffffffcb;
    border-radius: 10px;
    margin-top: 20px;
    max-width: max-content;
    min-width: 690px;
    max-height: 50px;
    ${({ defaultValue }: PropFormGrid) => formType(defaultValue, '-before-900')};
    img {
      width: 300px;
      height: 300px;
    }
    div {
      display: flex;
      margin: 0 auto;
      justify-items: center;
    }
    div > div{
      display:flex;
      flex-flow: column wrap;
      text-align: center;
      label{
        color: #1a0202;
        font-weight: bolder;
      }
    }
  }

  /* margin: 15px 10px; */
`;

/* export const FormGridLayout = styled.div`
  grid-template-columns: ${({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue, 'columns')};
  grid-template-rows: ${({ defaultValue }: PropFormGrid) => validFormGrid(defaultValue, 'rows')}
`; */
export const Input = styled.input`
  min-width: inherit;
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  outline: 0;
  border: 1px solid transparent;
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;
`;
export const Button = styled.button`
  text-decoration: none;
  background-color: #ffb855;
  color: black;
  font-weight: bolder;
  box-shadow: 1px 1px 3px darkgray;
  padding:10px 20px;
  font-size: 1.5rem;
  border-radius: 10px 0;
`;

export const ShowList = styled.div`
  overflow: hidden;
  height: 75vh;
  min-width: 320px;
  .show{
    @media screen and (min-width: 900px){
      margin: 0 auto;
      max-width: 900px;
      min-width: 900px;
    }
    height: 56vh;
    margin: 0 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px darkgray;
    width: auto;
    overflow: auto;
  }
`;

type PropColor = {
  color: string;
};

export const Banner = styled.div`
  margin: 0 auto;
  min-width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: ${({ defaultValue }: string) => generateColor(defaultValue || '#000000')};
  background-color: ${({ defaultValue }: string) => (defaultValue || '#000000')};
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px white;
  /* height: 100%; */
  @media screen and (min-width: 900px){
    max-width: 900px;
    min-width: 900px;
    height: inherit;
  }
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

export const ConfigurationButton = styled.div`
  display: flex;
  border: 3px solid transparent;
  border-radius: 10px;
  width: 30px;
  height: 30px;
  background-image: ${({ defaultValue }) => `url(${defaultValue})`};
  background-position: center;
  background-size: cover;
  cursor: pointer;
  &:hover {
    border: 3px solid #f5af53
  }
`;

export const ModalWrapper = styled.div`
  position: relative;
  z-index: 2;
  margin: 0 auto;
  display: flex;
  border: 2px solid transparent;
  box-shadow: 1px 1px 3px gray;
  border-radius: 10px;
  background-color: #fcd4b0;
  padding: 10px;
  .wrapped-container{
    display: flex;
    flex-flow: row wrap;
    .wrapped-element{
      flex-grow: 1;
      background-position: center;
      background-color: white;
      border: 3px solid ${({ defaultValue }) => (
    defaultValue ? defaultValue.color : 'transparent')};
      &:hover{
        flex-grow:4;
        transition: 0.25s ease-in-out;
        border: 3px solid #ffa352;
      }
    }
  }
  .close {
    position: relative;
    right: 7px;
    bottom: 20px;
    grid-column: none;
  }
  `;

export const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  justify-items: center;
  padding: 10px;
  a{
    text-decoration: none;
    border: 1px solid transparent;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    color: #000000e2;
    box-shadow: 1px 2px 3px gray;
  }
`;
