import enGB from 'antd/lib/locale/en_GB';
import enUS from 'antd/lib/locale/en_US';

export const getLocale = () => {
  const lang = navigator.language || navigator.languages[0] || 'en-GB';
  if (lang === 'en-US') {
    return enUS;
  }
  return enGB;
};

export const dummy = 'dummy';
