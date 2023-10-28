import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Codes() {
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [isFilterBirthdayActive, setIsFilterBirthdayActive] =
    React.useState(false);
  const [fetchedData, setFetchedData] = React.useState();
  const router = useRouter();

  const collumns = [
    { field: "id", headerName: "CÓDIGO", width: 180 },
    { field: "quantity", headerName: "QUANTIDADE", width: 150 },
  ];

  React.useEffect(() => {
    const id = sessionStorage.getItem("eventId");
    axios.get(`${baseApiUrl}/participants/codes/${id}`).then((data) => {
      setFetchedData(data.data);
      setIsDataFetched(true);
    });
  }, []);

  function handleReturn(e) {
    router.push("/");
  }

  function handleSwitchChange() {
    setIsFilterBirthdayActive(!isFilterBirthdayActive);
  }

  function getCodes() {
    return isFilterBirthdayActive
      ? fetchedData.codesQuantity.filter(
          (code) => (!code.id.toLowerCase().includes("aniver") || !code.id.toLowerCase().includes("free"))
        )
      : fetchedData.codesQuantity;
  }

  return (
    <div className={styles.container}>
      {isDataFetched ? (
        <div>
          <Typography variant="button" gutterBottom>
            Quantidade de Ingressos: {fetchedData.count}
          </Typography>
          <br />
          <Typography variant="button" gutterBottom>
            Valor total:: R$ {fetchedData.revenue}
          </Typography>
          <br />
          <Typography variant="button" gutterBottom>
            Valor líquido: R$ {fetchedData.liquidRevenue}
          </Typography>
          <br />
          <Typography variant="button" gutterBottom>
            Ticket médio: R${" "}
            {(fetchedData.liquidRevenue / fetchedData.count).toFixed(2)}
          </Typography>
          <div className={styles.tableContainer}>
            <DataGrid
              columns={collumns}
              rows={getCodes()}
              hideFooter
              style={{ maxHeight: 380 }}
              loading={!isDataFetched}
            />
            <div>
              <FormControlLabel
                control={<Switch onChange={handleSwitchChange} />}
                label="Filtrar anivers"
              ></FormControlLabel>
            </div>
          </div>
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <div style={{ paddingTop: 10 }}>
        <Button variant="contained" onClick={handleReturn}>
          VOLTAR
        </Button>
      </div>
    </div>
  );
}
