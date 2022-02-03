import PropTypes from 'prop-types';

const Button = ({ text, color }) => {
    return (
        <button className='btn' style={{background: color}}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button
