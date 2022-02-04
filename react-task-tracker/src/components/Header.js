import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAddTask }) => {
  const onClick = () => {
    console.log(`click`);
  };

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button
        text={showAddTask ? 'Close' : 'Add'}
        color={showAddTask ? '' : 'green'}
        onClick={onAdd}
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
