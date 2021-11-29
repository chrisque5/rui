import getClearColumnFiltersMenu from '../filters/ClearColumnFilters';

describe('<getClearColumnFiltersMenu/>', () => {
  test('ColumnFiltersMenu has the correct number of items', () => {
    expect(getClearColumnFiltersMenu({}).length).toEqual(2);
  });

  test('verify ColumnFiltersMenu has separator ', () => {
    const menu = getClearColumnFiltersMenu({});
    expect(menu[0]).toEqual('separator');
  });

  test('verify ColumnFiltersMenu name ', () => {
    const menu = getClearColumnFiltersMenu({});
    expect(menu[1].name).toEqual('Clear Column Filters');
  });
});
