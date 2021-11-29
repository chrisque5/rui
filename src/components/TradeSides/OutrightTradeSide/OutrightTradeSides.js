import PropTypes from 'prop-types';
import CounterPartiesContainer from '../../CounterParties/CounterPartiesContainer';

const OutrightTradeSides = ({ form, dealType }) => (
  <CounterPartiesContainer
    columnData={[{ title: 'Buyer', formId: 'buyer' }, { title: 'Seller', formId: 'seller' }]}
    form={form}
    dealType={dealType}
  />
);

OutrightTradeSides.propTypes = {
  form: PropTypes.shape().isRequired,
  dealType: PropTypes.string.isRequired,
};

export default OutrightTradeSides;
