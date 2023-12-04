import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import pageThumbnailPlugin from "./ThumbnailPlugin";

const Thumbnail = ({ fileUrl, pageIndex, pdfId }) => {
  const thumbnailPluginInstance = thumbnailPlugin({ thumbnailWidth: 150 });
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: React.createElement(Cover, {
      getPageIndex: () => pageIndex,
    }),
  });

  const handleOpenPdf = () => {
    console.log(pdfId);
  };

  return (
    <div className="thumbnail-wrapper" onClick={handleOpenPdf}>
      <Viewer
        fileUrl={fileUrl}
        plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
      />
    </div>
  );
};

export default Thumbnail;
