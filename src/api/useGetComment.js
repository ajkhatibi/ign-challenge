import React, { useState, useEffect } from "react";

export default function useGetComment(id) {
  const [count, setCount] = useState(0);
  const getCommentCount = async () => {
    const getFetchData = await fetch(
      `https://ign-apis.herokuapp.com/comments?ids=${id}`
    );
    const getFetchDataJSON = await getFetchData.json();
    setCount(getFetchDataJSON.content[0].count);
  };
  useEffect(() => {
    getCommentCount();
  }, [id]);
  return [count];
}
