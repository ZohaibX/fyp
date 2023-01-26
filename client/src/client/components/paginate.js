import _ from 'lodash';

export const Paginate = (ads, adsInSinglePage, currentPage) => {
  const index = (currentPage - 1) * adsInSinglePage;
  return _(ads).slice(index).take(adsInSinglePage).value();
};
