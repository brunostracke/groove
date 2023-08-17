import styles from "../styles/Home.module.css";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Home() {
  const [codes, setCodes] = React.useState([]);
  const [isDataFetched, setIsDataFetched] = React.useState(false);

  const collumns = [
    { field: "code", headerName: "CODE" },
    { field: "quantity", headerName: "QUANTIDADE" },
  ];

  React.useEffect(() => {
    axios.get(baseApiUrl).then((data) => {
      setCodes(data.data);
      setIsDataFetched(true);
    });
  }, []);

  if (codes.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {isDataFetched && (
        <DataGrid columns={collumns} rows={codes} hideFooterPagination autoHeight />
      )}
    </div>
  );
}
