import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import { deleteMail, fetchMails } from "store/slices/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useNavigate } from "react-router-dom";
import { LoadingContainer } from "./EmailTable.styled";
import { CircularProgress } from "@mui/material";

interface Data {
  id: number;
  subject: string;
  recipient: string;
  body: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof Data;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "subject",
    numeric: false,
    disablePadding: true,
    label: "Subject",
  },
  {
    id: "recipient",
    numeric: true,
    disablePadding: false,
    label: "recipient(s)",
  },
  {
    id: "body",
    numeric: true,
    disablePadding: false,
    label: "Body",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <Box component="span">actions</Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar sx={{ justifyContent: "flex-end" }}>
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EmailTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [direction, setDirection] = useState<Order>("asc");
  const [sort, setSort] = useState<keyof Data>("subject");
  const [selected, setSelected] = useState<readonly number[]>([]);

  useEffect(() => {
    dispatch(fetchMails({ page, perPage, direction, sort }));
  }, [dispatch, page, perPage, direction, sort]);

  const { mails, loading } = useSelector((state: RootState) => state.mail);

  const handleDelete = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteMail(id));
  };

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = sort === property && direction === "asc";
    setDirection(isAsc ? "desc" : "asc");
    setSort(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = mails?.data.map((n) => n.id);
      if (!newSelected) return;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onRowClick = (id: number) => {
    const mail = mails?.data?.find((item) => item.id === id);
    navigate(`/${id}`, { state: mail });
  };

  if (loading || !mails?.data) {
    return (
      <LoadingContainer>
        <CircularProgress size="30px" />
      </LoadingContainer>
    );
  }

  if (!loading && !mails?.data.length) {
    return <LoadingContainer>No Data</LoadingContainer>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "0px",
      }}
    >
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer sx={{ maxHeight: "calc(100vh - 320px)" }}>
        <Table
          sx={{
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            orderBy={sort}
            order={direction}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={(_, colName) => {
              handleRequestSort(colName);
            }}
            rowCount={mails?.data?.length}
          />
          <TableBody>
            {mails.data.map((row) => {
              const isItemSelected = selected.includes(row.id);

              return (
                <TableRow
                  hover
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                  onClick={() => onRowClick(row.id)}
                >
                  <TableCell align="left">{row.subject}</TableCell>
                  <TableCell align="left">{row.recipient}</TableCell>
                  <TableCell align="left">{row.body}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={(e) => handleDelete(e, row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mails?.data?.length}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: "auto" }}
      />
    </Box>
  );
}
