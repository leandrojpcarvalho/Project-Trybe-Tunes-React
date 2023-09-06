import { styled } from "styled-components";
import { Button, Form, Input } from "./StyledComponents/style";

type InputButtonType = {
  type: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isDisabled: boolean;
  innerHTML: string;
};

function InputButton(props:InputButtonType) {
  const { type, handleOnChange, handleOnClick, isDisabled, innerHTML } = props;
  const obj = {
    input: 'name',
    button: 'submit',
  };
  if (type === 'search') {
    obj.button = 'artist';
    obj.input = 'artist';
  }
  return (
    <Form>
      <Input
        type="text"
        data-testid={ `${type}-${obj.input}-input` }
        onChange={ (event) => handleOnChange(event) }
        placeholder={ innerHTML === 'Pesquisar'
          ? 'Digite o nome do artista' : 'Digite seu nome' }
      />
      <Button
        id="Herick"
        data-testid={ `${type}-${obj.button}-button` }
        disabled={ isDisabled }
        type="submit"
        onClick={ (event) => handleOnClick(event) }
      >
        {innerHTML}
      </Button>
    </Form>
  );
}

export default InputButton;
