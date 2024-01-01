import React, { useEffect, useState } from "react";
import team from "../../../assets/dashboardIcon/team2.png";
import directTeam from "../../../assets/dashboardIcon/directTeam.png";
import roiIcon from "../../../assets/dashboardIcon/roi.png";
import userListIcon from "../../../assets/dashboardIcon/level.png";
import teamIcon from "../../../assets/dashboardIcon/team.png";
import totalActiveTeam from "../../../assets/dashboardIcon/totalactiveTeam.png";
import Input from "../../../components/Input";
import HomeCard from "../../UserPages/HomePage/Home.Card";
import CardLayout from "../../../components/CardLayout";
import Button from "../../../components/Button";
import {
  useAddTeamStatisticsMutation,
  useGetLoginUserQuery,
} from "../../../Services/userApi";
import { Notification } from "../../../components/ToastNotification";
import { useNavigate } from "react-router-dom";

const TeamStatistics = () => {
  const { data: loginUserData } = useGetLoginUserQuery();
  const [
    addTeamStatistics,
    { data: TeamStatisticsResponse, isLoading, error },
  ] = useAddTeamStatisticsMutation();

  const [showTeam, setShowTeam] = useState(false);

  const [value, setValue] = useState({
    userId: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (TeamStatisticsResponse?.message) {
      Notification(TeamStatisticsResponse?.message, "success");
      setValue({
        userId: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, TeamStatisticsResponse]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      userId: value.userId,
    };
    await addTeamStatistics(obj);
    setShowTeam(true);
  };
  console.log({ TeamStatisticsResponse });
  // go to props
  const navigate = useNavigate();
  // const goToHistory = (level) =>
  //   navigate({
  //     pathname: "/dashboard/member/member-topup-history",
  //     state: {
  //       level: level,
  //       userId: value?.userId,
  //     }
  //   });

  const navigateWithParams = (param1, param2) => {
    navigate(`/dashboard/member/member-topup-history/${param1}/${param2}`);
  };

  return (
    <div className='tp_updatepassword_page_wrapper'>
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className='tp_accountpassword_card'
      >
        <div className='tp_accountpassword_title'>
          <h2>Users Info</h2>
        </div>
        <div className='tp_accountpassword_field'>
          <form onSubmit={handleSubmit}>
            <div className='form_group'>
              <Input
                label='User Id'
                type='text'
                value={value.userId}
                name='userId'
                placeholder='Search user id'
                onChange={handleChange}
                inputGroupClass='left'
              />
            </div>
            <div className='form_group'>
              <Button
                type='submit'
                className='submit_btn'
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
          </form>
        </div>
        {showTeam && TeamStatisticsResponse && (
          <div className='team_over_view'>
            <h2>User Info</h2>
            <div className='tp_dash_content_item'>
              <div className='tp_dash_content card_row'>
                {TeamStatisticsResponse?.data?.fullName ? (
                  <>
                    <HomeCard
                      cardName='Full Name'
                      cardValue={TeamStatisticsResponse?.data?.fullName}
                      icon={team}
                      bgColor='#38CAB3'
                      cardBottom={true}
                      cardBgColor='#0087F6'
                    />
                    <HomeCard
                      cardName='Self Investment'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?.investmentAmount
                          ? TeamStatisticsResponse?.data?.investmentAmount
                          : 0
                      }`}
                      icon={team}
                      bgColor='#38CAB3'
                      cardBottom={true}
                      cardBgColor='#F7941D'
                    />
                    <HomeCard
                      cardName='Total Team'
                      cardValue={
                        TeamStatisticsResponse?.data?.totalTeam
                          ? TeamStatisticsResponse?.data?.totalTeam
                          : "0"
                      }
                      icon={team}
                      bgColor='#38CAB3'
                      cardBottom={true}
                      cardBgColor='#0087F6'
                    />
                    <HomeCard
                      cardName='Total Active Team'
                      cardValue={
                        TeamStatisticsResponse?.data?.totalActiveTeam
                          ? TeamStatisticsResponse?.data?.totalActiveTeam
                          : "0"
                      }
                      icon={directTeam}
                      bgColor='#59CE8F'
                      cardBottom={true}
                      cardBgColor='#F7941D'
                    />
                    {TeamStatisticsResponse?.data?.teamStats?.map((d, i) => (
                      <HomeCard
                        key={i}
                        cardName={
                          d?.level == 1 ? "Direct Team" : `Level ${d?.level}`
                        }
                        cardValue={d?.totalTeam}
                        teamBusiness={d?.totalBusinessAmount || 0}
                        icon={totalActiveTeam}
                        bgColor='#42855B'
                        cardBottom={true}
                        cardBgColor={i % 2 === 0 ? "#0087F6" : "#F7941D"}
                        type='level'
                        role={loginUserData?.data?.role}
                        goToHistory={() =>
                          navigateWithParams(d?.level, value?.userId)
                        }
                      />
                    ))}
                    <HomeCard
                      cardName='Total Balance'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.totalIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.totalIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#38cab3'
                      cardBgColor='#F7941D'
                    />
                    <HomeCard
                      cardName='Active Income'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.activeIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.activeIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#38cab3'
                      cardBgColor='#0087F6'
                    />
                    <HomeCard
                      cardName='Main Wallet'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.totalIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.totalIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#F49D1A'
                      cardBgColor='#F7941D'
                    />
                    <HomeCard
                      cardName=' ROI Income'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.roiIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.roiIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={teamIcon}
                      linkText='view details'
                      bgColor='#38cab3'
                      cardBgColor='#0087F6'
                    />
                    <HomeCard
                      cardName='Level ROI'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.levelIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.levelIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={roiIcon}
                      linkText='view details'
                      bgColor='#ffbd5a'
                      cardBgColor='#F7941D'
                    />
                    {/* <HomeCard
                      cardName='Rank Income'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?.rankIncome
                          ? parseFloat(
                              TeamStatisticsResponse?.data?.rankIncome
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#38cab3'
                      cardBgColor='#fe9f43'
                    /> */}
                    <HomeCard
                      cardName='Total Withdraw'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?.totalWithdraw
                          ? parseFloat(
                              TeamStatisticsResponse?.data?.totalWithdraw
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#38cab3'
                      cardBgColor='#0087F6'
                    />
                    <HomeCard
                      cardName='Winning From Level'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.winingShare
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.winingShare
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={roiIcon}
                      bgColor='#38cab3'
                      cardBgColor='#F7941D'
                    />
                    <HomeCard
                      cardName='Winning Amount'
                      cardValue={`₹${
                        TeamStatisticsResponse?.data?._doc?.winingWallect
                          ? parseFloat(
                              TeamStatisticsResponse?.data?._doc?.winingWallect
                            ).toFixed(4)
                          : "0"
                      }`}
                      icon={userListIcon}
                      bgColor='#38cab3'
                      cardBgColor='#0087F6'
                    />
                  </>
                ) : (
                  "Not found"
                )}
              </div>
            </div>
          </div>
        )}
      </CardLayout>
    </div>
  );
};

export default TeamStatistics;
