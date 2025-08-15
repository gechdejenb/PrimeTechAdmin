// src/utils/table.ts
import { UserProps } from 'src/types/user';

export function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: UserProps[];
  comparator: (a: UserProps, b: UserProps) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as [UserProps, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let filteredData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    filteredData = filteredData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return filteredData;
}

export function getComparator(order: 'asc' | 'desc', orderBy: string) {
  return order === 'desc'
    ? (a: UserProps, b: UserProps) => descendingComparator(a, b, orderBy)
    : (a: UserProps, b: UserProps) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a: UserProps, b: UserProps, orderBy: keyof UserProps | 'status') {
  if (orderBy === 'status') {
    const aStatus = a.lastActive ? 'active' : 'inactive';
    const bStatus = b.lastActive ? 'active' : 'inactive';
    return bStatus < aStatus ? -1 : bStatus > aStatus ? 1 : 0;
  }
  if (orderBy in a && orderBy in b) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
  }
  return 0;
}

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}