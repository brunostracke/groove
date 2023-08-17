import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import React from 'react';

const baseApiUrl = process.env.NEXT_PUBLIC_GROOVE_API

export default function Home() {
  const [codes, setCodes] = React.useState([]);
  const [isDataFetched, setIsDataFetched] = React.useState(false)
  

  React.useEffect( () => {
    console.log(baseApiUrl)
    axios.get(baseApiUrl)
    .then(data => {
      console.log(data.data)
      setCodes(data.data)
      setIsDataFetched(true)
    })

  }, [])

  if(codes.length === 0) return <div>loading</div>

  return (
    <div className={styles.container}>
      {isDataFetched && <div> {Object.keys(codes).map(code => <div key={code}>{code}: {codes[code]}</div>)}</div>}
    </div>
  )
}
