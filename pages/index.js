import styles from "../styles/Home.module.css";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {useRouter} from 'next/router'

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Home() {
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [events, setEvents] = React.useState([])
  const router = useRouter()

  const collumns = [
    { field: "date", headerName: "DATA", width: 120},
    { field: "name", headerName: "NOME DO EVENTO", width: 150},
  ];

  function handleEventClick(e) {
    router.push({pathname: "/codes", query: {id: e.id}})
    console.log(e)
  }

  React.useEffect(() => {
    axios.get(`${baseApiUrl}/events`).then((data) => {
      setEvents(data.data);
      setIsDataFetched(true);
    });
  }, []);


  return (
    <div className={styles.container}>
      {isDataFetched && (
        <DataGrid columns={collumns} rows={events} hideFooterPagination autoHeight onRowClick={handleEventClick} loading={!isDataFetched} />
      )}
    </div>
  );
}
