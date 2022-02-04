import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, showAddTask, onAdding }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button
                onClick={onAdding}
                text={showAddTask ? 'Close' : 'Add'}
                color={showAddTask ? 'red' : 'green'}
            />
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker'
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
