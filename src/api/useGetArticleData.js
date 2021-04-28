import React, { useState, useEffect } from "react";

export default function useGetArticleData(url) {
  const [list, setListOfArticles] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(0);

  const getArticlesData = async () => {
    if (paginationIndex === 295) {
      return;
    }
    const getData = await fetch(
      `https://ign-apis.herokuapp.com/articles?startIndex=${paginationIndex}&count=5`
    );
    const getDataJSON = await getData.json();
    const concatListOfArticles = list.concat(getDataJSON.data);
    setListOfArticles(concatListOfArticles);
    setPaginationIndex((state) => state + 5);
  };
  useEffect(() => {
    getArticlesData();
  }, [url]);

  return [list];
}
