import PropTypes from 'prop-types';
// @mui
import { Box, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useSelector } from '../../../../redux/store';

// routes

// hooks
import useTable, { emptyRows } from '../../../../hooks/useTable';
// components
import { TableNoData, TableSkeleton, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
// sections
import SupplierDebtTableRow from '../../../../sections/@dashboard/supplier/SupplierDebt/SupplierDebtTableRow';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'receiptCode', label: 'Mã phiếu', align: 'left' },
  { id: 'time', label: 'Thời gian', align: 'left' },
  { id: 'type', label: 'Loại', align: 'left' },
  { id: 'amount', label: 'Giá trị', align: 'right' },
  { id: 'totalDebt', label: 'Nợ phải trả', align: 'right' },
];

// ----------------------------------------------------------------------

SuppliersDebtList.propTypes = {
  supplier: PropTypes.shape({
    debtsReceiptList: PropTypes.arrayOf(),
  }),
};

export default function SuppliersDebtList({ debtsReceiptList }) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });
  const { isLoading } = useSelector((state) => state.receipt);

  const denseHeight = dense ? 60 : 80;

  const isNotFound = !debtsReceiptList?.length || (!isLoading && !debtsReceiptList?.length);

  return (
    <Box>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={debtsReceiptList?.length}
            numSelected={selected.length}
            onSort={onSort}
          />

          <TableBody>
            {(isLoading ? [...Array(rowsPerPage)] : debtsReceiptList)
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) =>
                row ? (
                  <SupplierDebtTableRow key={row.id} row={row} />
                ) : (
                  !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                )
              )}

            <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, debtsReceiptList?.length)} />

            <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={debtsReceiptList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
