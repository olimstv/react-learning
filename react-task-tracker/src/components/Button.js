import PropTypes from 'prop-types';

const Button = ({ text, color, onClick }) => {
  return (
    <button className='btn' style={{ background: color }} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};

export default Button;
