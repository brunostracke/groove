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
} from "@mui/material";

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Codes() {
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [isFilterBirthdayActive, setIsFilterBirthdayActive] =
    React.useState(false);
  const [codes, setCodes] = React.useState();
  const router = useRouter();

  const collumns = [
    { field: "code", headerName: "CÓDIGO", width: 180 },
    { field: "quantity", headerName: "QUANTIDADE", width: 150 },
  ];

  React.useEffect(() => {
    const id = sessionStorage.getItem("eventId");
    axios.get(`${baseApiUrl}/participants/codes/${id}`).then((data) => {
      setCodes(data.data);
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
      ? codes.filter((code) => !code.code.toLowerCase().includes("aniver"))
      : codes;
  }

  return (
    <div className={styles.container}>
      {isDataFetched ? (
        <div className={styles.tableContainer}>
          <DataGrid
            columns={collumns}
            rows={getCodes()}
            hideFooter
            style={{ maxHeight: 500 }}
            loading={!isDataFetched}
          />
          <div>
            <FormControlLabel
              control={<Switch onChange={handleSwitchChange} />}
              label="Filtrar anivers"
            ></FormControlLabel>
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
