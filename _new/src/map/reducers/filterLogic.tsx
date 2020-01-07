import { DemoData, DataFilter } from '../../assets/data/dataType';

//Create a list of Unique Values to filter on
export function getToFilterValues(services: DemoData[]): any {
  const provider = new Set(services.map(service => service.provider));
  const category = new Set();
  services.map(service => service.category.forEach(cat => category.add(cat)));

  return {
    provider: Array.from(provider),
    category: Array.from(category)
  };
}

export function serviceFilter(
  services: DemoData[],
  filterSet: DataFilter
): DemoData[] {
  let filtered = false;

  //filter provider
  if (Array.isArray(filterSet.provider) && filterSet.provider.length) {
    filtered = true;
    services = services.filter((s: DemoData) =>
      filterSet.provider.includes(s.provider)
    );
  }

  //Filter for all arry like values
  for (const filter in filterSet) {
    if (
      Array.isArray(filterSet[filter as keyof typeof filterSet]) &&
      filterSet[filter as keyof typeof filterSet].length &&
      Array.isArray(services[0][filter as keyof typeof filterSet])
    ) {
      filtered = true;

      services = services.filter((s: DemoData) => {
        const serviceValues = s[filter as keyof typeof filterSet] as Array<
          string
        >;
        const filterValues = filterSet[
          filter as keyof typeof filterSet
        ] as Array<string>;

        return filterValues.some(elem => serviceValues.indexOf(elem) > -1);
      });
    }
  }
  return filtered ? services : [];
}
