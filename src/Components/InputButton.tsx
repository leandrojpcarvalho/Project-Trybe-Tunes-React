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
    <form>
      <input
        type="text"
        data-testid={ `${type}-${obj.input}-input` }
        onChange={ (event) => handleOnChange(event) }
      />
      <button
        id="Herick"
        data-testid={ `${type}-${obj.button}-button` }
        disabled={ isDisabled }
        type="submit"
        onClick={ (event) => handleOnClick(event) }
      >
        {innerHTML}
      </button>
    </form>
  );
}

export default InputButton;
