import PropTypes from 'prop-types';

const Button = ({color, text, onClick}) => {
    
    return <button onClick = {onClick} style={{background: color}}className='btn'>{text}</button>

}

Button.defaultProps = {
    color: 'black',
}
Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default Button