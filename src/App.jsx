import axios from "axios";
import { useEffect, useState } from "react";
import s from "./App.module.css";
import { ImageList } from "./components/ImageList/ImageList";
import { useScrollPosition } from "./hooks/useScrollPosition";

export function App() {
  const { isBottom } = useScrollPosition();
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageToFetch, setPageToFetch] = useState(1);

  async function fetchImagesByPage(pageNumber) {
    setIsLoading(true);
    const { data } = await axios(`https://picsum.photos/v2/list?page=${pageNumber}&limit=5`);
    setImageList([...imageList, ...data]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchImagesByPage(pageToFetch);
  }, [pageToFetch]);
  useEffect(() => {
    if (isBottom) increasePage();
  }, [isBottom]);

  function increasePage() {
    setPageToFetch(pageToFetch + 1);
    console.log(pageToFetch);
  }

  return (
    <div className={s.root}>
      <h1>Rand'images</h1>
      <h2>Download random open source images</h2>
      <ImageList imageList={imageList} />
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  );
}
