"use client";

import { useEffect, useState } from "react";
import Search from "./search";

interface Props {
  listSeminar?: any;
  filter?: any;
  setFilter?:(value: any)=>void;
}

export default function TabAll({ listSeminar,setFilter ,filter}: Props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(listSeminar);
  }, [listSeminar]);
  console.log({ listSeminar: list });
  return <div className=" grid grid-cols-5">
    <div className="col-span-2">
    <Search setFilter={setFilter} filter={filter}/>
    </div>
    <div className="col-span-3">asdasdsa</div>
  </div>;
}
