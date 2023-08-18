import styles from "../styles/Home.module.css";
import axios from "axios";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API;

export default function Home() {
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const router = useRouter();

  const collumns = [
    { field: "date", headerName: "DATA", width: 120 },
    { field: "name", headerName: "EVENTO", width: 150 },
  ];

  function handleEventClick(e) {
    sessionStorage.setItem("eventId", e.id)
    router.push({ pathname: "/codes"});
  }

  React.useEffect(() => {
    axios.get(`${baseApiUrl}/events`).then((data) => {
      setEvents(data.data);
      setIsDataFetched(true);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        {isDataFetched && (
          <DataGrid
            columns={collumns}
            rows={events}
            hideFooter
            style={{ maxHeight: 500 }}
            onRowClick={handleEventClick}
            loading={!isDataFetched}
            initialState={{
              sorting: { sortModel: [{ field: "date", sort: "desc" }] },
            }}
          />
        )}
      </div>
    </div>
  );
}
