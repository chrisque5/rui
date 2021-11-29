/* eslint-disable react/prop-types */
import { Component } from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import {
  ids, MAX_LIMITS,
} from '../../utils/constants';
import { parseValueAsBigNumber } from '../../utils/helper';

const TradeEconomics = (WrappedComponent) => {
  class HOC extends Component {
    rate1OnChange = (e, scalingFactor = 1) => {
      const rate1 = parseValueAsBigNumber(e.target.value);
      const dealType = (this.props.userInterface && this.props.userInterface.selectedDealType) ? this.props.userInterface.selectedDealType : 'NDF';

      if (rate1) {
        const rate2 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_2}`));
        const points = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.POINTS}`));

        if (!this.recalculateRates(ids.RATE_1, rate1, scalingFactor) && (rate2 || points)) {
          if (points) {
            this.props.form.setFieldsValue(
              {
                [ids.RATE_2]: math.number(math.add(rate1,
                  (points * scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION),
              },
            );
            this.props.form.validateFields([ids.RATE_2]);
          } else {
            this.props.form.setFieldsValue(
              { [ids.POINTS]: math.number(math.subtract(rate2, rate1) / scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION) },
            );
          }
        }
      }
    };

    rate2OnChange = (e, scalingFactor = 1) => {
      const rate2 = parseValueAsBigNumber(e.target.value);
      const dealType = (this.props.userInterface && this.props.userInterface.selectedDealType) ? this.props.userInterface.selectedDealType : 'NDF';

      if (rate2) {
        const rate1 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_1}`));
        const points = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.POINTS}`));

        if (!this.recalculateRates(ids.RATE_2, rate2, scalingFactor) && (rate1 || points)) {
          if (rate1) {
            this.props.form.setFieldsValue(
              {
                [ids.POINTS]: math.number(math.subtract(rate2,
                  rate1) / scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION),
              },
            );
            this.props.form.validateFields([ids.POINTS]);
          } else if (points) {
            this.props.form.setFieldsValue(
              {
                [ids.RATE_1]: math.number(math.subtract(rate2,
                  (points * scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION),
              },
            );
            this.props.form.validateFields([ids.RATE_1]);
          }
        }
      }
    };

    pointsOnChange = (e, scalingFactor = 1) => {
      const points = parseValueAsBigNumber(e.target.value);
      const dealType = (this.props.userInterface && this.props.userInterface.selectedDealType) ? this.props.userInterface.selectedDealType : 'NDF';

      if (points) {
        const rate1 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_1}`));
        const rate2 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_2}`));

        if (!this.recalculateRates(ids.POINTS, points, scalingFactor) && (rate1 || rate2)) {
          if (rate1) {
            this.props.form.setFieldsValue(
              {
                [ids.RATE_2]: math.number(math.add(rate1,
                  (points * scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION),
              },
            );
            this.props.form.validateFields([ids.RATE_2]);
          } else if (rate2) {
            this.props.form.setFieldsValue(
              {
                [ids.RATE_1]: math.number(math.subtract(rate2,
                  (points * scalingFactor).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION),
              },
            );
            this.props.form.validateFields([ids.RATE_1]);
          }
        }
      }
    };

    recalculateRates = (key, value, multiplier) => {
      const currentRate1 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_1}`));
      const currentRate2 = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.RATE_2}`));
      const currentPoints = parseValueAsBigNumber(this.props.form.getFieldValue(`${ids.POINTS}`));
      const dealType = (this.props.userInterface && this.props.userInterface.selectedDealType) ? this.props.userInterface.selectedDealType : 'NDF';

      if (currentRate1 && currentRate2 && currentPoints) {
        let calculatedValue = '';
        switch (key) {
          case ids.RATE_1:
            calculatedValue = math.number(math.add(value,
              (currentPoints * multiplier).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION);
            this.props.form.setFieldsValue(
              {
                [ids.RATE_2]: parseFloat(calculatedValue),
              },
            );
            this.props.form.validateFields([ids.RATE_2]);
            return true;
          case ids.RATE_2:
            calculatedValue = math.number(math.subtract(value,
              (currentPoints * multiplier).toFixed(MAX_LIMITS[dealType].POINTS.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION);
            this.props.form.setFieldsValue(
              {
                [ids.RATE_1]: parseFloat(calculatedValue),
              },
            );
            this.props.form.validateFields([ids.RATE_1]);
            return true;
          case ids.POINTS:
            calculatedValue = math.number(math.add(currentRate1,
              (value * multiplier).toFixed(MAX_LIMITS[dealType].RATE.PRECISION))).toFixed(MAX_LIMITS[dealType].RATE.PRECISION);

            this.props.form.setFieldsValue(
              {
                [ids.RATE_2]: parseFloat(calculatedValue),
              },
            );
            this.props.form.validateFields([ids.RATE_2]);
            return true;
          default:
            return false;
        }
      }
      return false;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          rate1OnChange={this.rate1OnChange}
          rate2OnChange={this.rate2OnChange}
          pointsOnChange={this.pointsOnChange}
        />
      );
    }
  }

  HOC.propTypes = {
    form: PropTypes.shape().isRequired,
  };

  return HOC;
};
export default TradeEconomics;
