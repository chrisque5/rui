import PropTypes from 'prop-types';

const CLSRenderer = ({ value, node, column }) => {
  const checkbox = document.createElement('input');

  Object.assign(checkbox, {
    type: 'checkbox',
    id: node.data.instrumentId,
    checked: value,
    className: 'custom-checkbox',
    onchange: (e) => {
      node.setDataValue(column.colId, e.target.checked);
    },
    value,
  });

  return checkbox;
};

CLSRenderer.propTypes = {
  value: PropTypes.bool.isRequired,
  node: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
};

export default CLSRenderer;
