import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { UserProps } from 'src/types/user'; // Import UserProps

type Props = {
  row: UserProps & { status: string }; // Include derived status
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: Props) {
  const { name, userId, agentLevel, balance, isVerified, status } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelectRow} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell>{agentLevel}</TableCell>
      <TableCell align="right">{balance.toFixed(2)}</TableCell>
      <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell align="right">
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}