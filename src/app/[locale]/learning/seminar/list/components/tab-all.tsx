"use client";

import { useEffect, useState } from "react";
import Search from "./search";

interface Props {
  listSeminar?: any;
  setFilter?:(value: any)=>void;
}

export default function TabAll({ listSeminar,setFilter }: Props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(listSeminar);
  }, [listSeminar]);
  console.log({ listSeminar: list });
  return <div>
    <Search setFilter={setFilter}/>
  </div>;
}
