import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import React from 'react';

async function getData() {
  try {
    const data = await axios.get("http://localhost:3010/")
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default function Home() {
  const [codes, setCodes] = React.useState([]);
  const [isDataFetched, setIsDataFetched] = React.useState(false)

  React.useEffect( () => {
    
    axios.get("http://localhost:3010/")
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
