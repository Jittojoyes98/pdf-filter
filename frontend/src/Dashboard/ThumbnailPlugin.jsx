import React from "react";

const ThumbnailPlugin = (props) => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps) => {
      let { slot } = renderProps;

      slot.children = PageThumbnail;

      // Reset the sub slot
      slot.subSlot.attrs = {};
      slot.subSlot.children = React.createElement(React.Fragment);

      return slot;
    },
  };
};

export default ThumbnailPlugin;
