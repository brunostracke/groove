import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { Button } from "@mui/material";

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Codes() {
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [codes, setCodes] = React.useState();
  const router = useRouter();

  const collumns = [
    { field: "code", headerName: "CÓDIGO", width: 180 },
    { field: "quantity", headerName: "QUANTIDADE", width: 150 },
  ];

  React.useEffect(() => {
    const { id } = router.query;
    axios.get(`${baseApiUrl}/participants/codes/${id}`).then((data) => {
      setCodes(data.data);
      setIsDataFetched(true);
    });
  }, []);

  function handleReturn(e) {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        {isDataFetched && (
          <DataGrid
            columns={collumns}
            rows={codes}
            hideFooter
            style={{ maxHeight: 500 }}
            loading={!isDataFetched}
          />
        )}
      </div>
      <div style={{ paddingTop: 10 }}>
        <Button variant="contained" onClick={handleReturn}>
          VOLTAR
        </Button>
      </div>
    </div>
  );
}
