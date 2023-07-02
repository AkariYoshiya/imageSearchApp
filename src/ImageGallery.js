import React from "react";
import "./ImageGallery.css";

const ImageGallery = ({ fetchData }) => {
  return (
    <div>
      <div className="images-wrapper">
        {/* ()にしないと中にhtml作れないので注意{}ではない！ */}
        {fetchData.map((data) => (
          <div className="image" key={data.id}>
            <a href={data.pageURL} target="_blank">
              <img src={data.largeImageURL} alt=""></img>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
