import { render, waitFor, fireEvent } from 'test-utils/testUtils';
import redux from 'react-redux';
import { Form } from 'antd';
import Strategy from '../Strategy';
import { strategyOptions } from '../../../utils/constants';

jest.mock('react-redux', () => ({
  useDispatch: () => () => { },
}));

const form = {};
const dispatchSpy = jest.spyOn(redux, 'useDispatch');

const options = strategyOptions.NDF;
const onChangeAfterEffects = jest.fn();

const defaultProps = {
  form,
  options,
  onChangeAfterEffects,
};

describe('<Strategy />', () => {
  test('It Renders ', () => {
    const { container } = render(<Form><Strategy {...defaultProps} /></Form>);
    expect(container).toMatchSnapshot();
  });

  test('Switch to NDF Spread', async () => {
    const { getByTestId } = render(<Form><Strategy {...defaultProps} /></Form>);
    const rdoStrategySpread = await waitFor(() => getByTestId('rdoStrategySpread'));
    fireEvent.click(rdoStrategySpread);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(onChangeAfterEffects).toHaveBeenCalled();
  });

  test('Switch to NDF Outright', async () => {
    const { getByTestId } = render(<Form><Strategy {...defaultProps} /></Form>);
    const rdoStrategyOutright = await waitFor(() => getByTestId('rdoStrategyOutright'));
    fireEvent.click(rdoStrategyOutright);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(onChangeAfterEffects).toHaveBeenCalled();
  });

  test('Switch to FWD Forward', async () => {
    const { getByTestId } = render(<Form><Strategy {...defaultProps} options={strategyOptions.FWD} /></Form>);
    const rdoStrategyForward = await waitFor(() => getByTestId('rdoStrategyForward'));
    fireEvent.click(rdoStrategyForward);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(onChangeAfterEffects).toHaveBeenCalled();
  });

  test('Switch to FWD Forward Forward', async () => {
    const { getByTestId } = render(<Form><Strategy {...defaultProps} options={strategyOptions.FWD} /></Form>);
    const rdoStrategyForward = await waitFor(() => getByTestId('rdoStrategyForward Forward'));
    fireEvent.click(rdoStrategyForward);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(onChangeAfterEffects).toHaveBeenCalled();
  });

  test('Switch to FWD Outright', async () => {
    const { getByTestId } = render(<Form><Strategy {...defaultProps} options={strategyOptions.FWD} /></Form>);
    const rdoStrategyOutright = await waitFor(() => getByTestId('rdoStrategyOutright'));
    fireEvent.click(rdoStrategyOutright);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(onChangeAfterEffects).toHaveBeenCalled();
  });
});
