import React, { useEffect, useState } from "react";
import "./table.css";
export default function Tabel() {
  const [url, setUrl] = useState(
    "https://stagingapi.enalo.in/inventory/get-items/"
  );
  const [data, setData] = useState(null);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        if (res.status === 200) {
          setData({ ...data });
          const no_page = data.count / 10;
          const temp_pages = [];
          for (let i = 0; i <= no_page; i++) {
            temp_pages.push(i);
          }
          setPages(temp_pages);
        }
      })
    );

    return () => {};
  }, [url]);

  function previousHandler() {
    if (data.previous) {
      setUrl(data.previous);
    }
  }
  function nextHandler() {
    if (data.next) {
      setUrl(data.next);
    }
  }
  function pageHandler(i) {
    const limit = 10;
    const offset = limit * i;
    setUrl(
      `https://stagingapi.enalo.in/inventory/get-items/?limit=${limit}&offset=${offset}`
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>item name</td>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((data, i) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.item_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="controls">
        <button onClick={previousHandler}>Previous</button>
        {pages.map((i) => (
          <button key={"page" + i} onClick={() => pageHandler(i)}>
            {i}
          </button>
        ))}
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
}
