import React from "react";
import { useGetYoutubeQuery } from "../../../../Services/Setting";

const YoutubeSection = () => {
  const { data } = useGetYoutubeQuery();
  return (
    <div className="ss-trade_front_youtube_hero_wrapper">
      <div className="container videoContainer">
        <div className="ss-trade_front_youtube_hero_container">
          <div className="video_container">
            <iframe
              width="100%"
              height="100%"
              src={data?.video_link}
              title="youtube video"
              allow="accelerometer"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeSection;
