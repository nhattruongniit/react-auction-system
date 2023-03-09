import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// components
import FormDialog from "./FormDialog";

// types
import { IProduct } from "../../../types/product";

// helpers
import { numberToCurrency } from "../../../helpers/numberToCurrency";

type IListTable = React.PropsWithChildren & {
  index: number;
  data: IProduct[];
};

function ListTable({ index, data }: IListTable) {
  // states
  const [openDialog, setOpenDialog] = React.useState(false);
  const [product, setProduct] = React.useState<IProduct>({
    name: "",
    price: 0,
    status: "",
    time_window: "",
    _id: "",
  });

  const handleSetOpenDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };

  const handleSetProduct = (product: IProduct) => {
    setProduct(product);
  };

  if (data.length === 0) {
    return <>No data</>;
  }

  return (
    <>
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Bid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  const now = new Date(row.time_window);
                  const timeWindow = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}s`;
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{numberToCurrency(row.price)}</TableCell>
                      <TableCell>{timeWindow}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleSetProduct(row);
                            handleSetOpenDialog();
                          }}
                        >
                          Bid
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

      <FormDialog
        openDialog={openDialog}
        product={product}
        handleSetOpenDialog={handleSetOpenDialog}
      />
    </>
  );
}

export default ListTable;
