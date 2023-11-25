import React from "react";
import Loading from "../../../components/Loading/Loading";
import { useGetRewardHistoryUserQuery } from "../../../Services/earningApi";
import CardLayout from "../../../components/CardLayout";
const Reward = () => {
  const { data, isLoading: isLoadingBonusLoading } = useGetRewardHistoryUserQuery();
  if (isLoadingBonusLoading) {
    return <Loading />;
  }
  return (
    <>
      <CardLayout>
        <div
          className="ss-trade_homPage_wrapper"
          style={{ padding: "20px" }}
          id="pddfff"
        >
          <div className="ss-trade_section_title for_download_handle">
            <h2>Reward</h2>
          </div>
          <div className="first_row dashboard_content">
            <div className="ss-trade_dash_content_item">
              <div className="ss-trade_dash_content card_row">
                {data?.data?.map((d, i) => (
                  <div className="img_preview" key={i + 1} style={{width: "300px", height: "300px"}}>
                    <img
                      src={d?.image?.url}
                      className="popupimage"
                      alt="Popup_image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </>
  );
};

export default Reward;
