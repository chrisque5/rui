export default function getClearColumnFiltersMenu(params) {
  const menu = [
    'separator',
    {
      name: 'Clear Column Filters',
      action: () => {
        params.api.setFilterModel(null);
      },
    },
  ];
  return menu;
}
