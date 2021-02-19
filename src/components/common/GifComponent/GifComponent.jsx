import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif, Grid } from "@giphy/react-components";
import ResizeObserver from "react-resize-observer";

const giphyFetch = new GiphyFetch("twf9O7mMvbaMMyNGSoGpEKYQBQKKJaWM");

function GridDemo({ onGifClick, name }) {
  const fetchGifs = (offset) =>
    giphyFetch.search(`${name} game of thrones`, { offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <>
      <Grid
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </>
  );
}

const GifComponent = (props) => {
  const [modalGif, setModalGif] = useState();
  return (
    <>
      <GridDemo
        name={props.name}
        onGifClick={(gif, e) => {
          e.preventDefault();
          setModalGif(gif);
        }}
      />
      {modalGif && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, .8)",
          }}
          onClick={(e) => {
            e.preventDefault();
            setModalGif(undefined);
          }}
        >
          <Gif gif={modalGif} width={200} />
        </div>
      )}
    </>
  );
};

export default GifComponent;
