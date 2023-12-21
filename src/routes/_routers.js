import React from "react";
import Page404 from "../containers/Page404NotFound/Page404";

const UserDashboard = React.lazy(() =>
  import("../containers/UserPages/HomePage/index")
);

const TopupHistoryByAdminPage = React.lazy(() =>
  import("../containers/AdminPages/AdminMemberPage/Topup.TopupHistoryPage")
);
const AdminTopupHistoryPage = React.lazy(() =>
  import("../containers/AdminPages/Admin.Topup/Admin.TopupHistoryPage")
);
// user profile
const MyProfile = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.MyProfile")
);
const UpDateProfile = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.UpdateProfile")
);
const UpDatePassword = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.UpdatePassword")
);
const UpDateEmail = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.UpdateEmail")
);
const AddBank = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.AddBank")
);

const AddKyc = React.lazy(() =>
  import("../containers/UserPages/UserProfilePage/User.AddKyc")
);

// wallet section
const wallet = React.lazy(() =>
  import("../containers/UserPages/Wallet/Wallet")
);
const DepositFund = React.lazy(() =>
  import("../containers/UserPages/Wallet/DepositFund")
);
const DepositHistory = React.lazy(() =>
  import("../containers/UserPages/Wallet/DepositFundHistory")
);
const FundReceivingHistory = React.lazy(() =>
  import("../containers/UserPages/Wallet/FundReceivingHistory")
);

//games section
const ColorGame = React.lazy(() =>
import("../containers/UserPages/Games/ColorGames/index")
)
const ColorGameHistory = React.lazy(() =>
import("../containers/UserPages/Games/UserBettingHistory/index")
)

// Team section
const DirectTeam = React.lazy(() =>
  import("../containers/UserPages/MyTeamPage/Team.DirectTeamPage")
);
const LevelTeam = React.lazy(() =>
  import("../containers/UserPages/MyTeamPage/Team.LevelTeam")
);
const UserTeamStatistics = React.lazy(() =>
  import("../containers/UserPages/MyTeamPage/Team.Statistics")
);
// topUp section
const TopUpAccount = React.lazy(() =>
  import("../containers/UserPages/TopupPage/Topup.AccountTopupPage")
);
const TopUpHistory = React.lazy(() =>
  import("../containers/UserPages/TopupPage/Topup.TopupHistoryPage")
);
// earning section
const LevelIncome = React.lazy(() =>
  import("../containers/UserPages/Earnings/Earning.LevelIncome")
);
const RankIncome = React.lazy(() =>
  import("../containers/UserPages/Earnings/Earning.RankIncome")
);
const RoiIncome = React.lazy(() =>
  import("../containers/UserPages/Earnings/Earning.RoiIncome")
);
const Reward = React.lazy(() =>
  import("../containers/UserPages/Earnings/Earning.Reward")
);

// withdraw section
const WithdrawFund = React.lazy(() =>
  import("../containers/UserPages/WithdrawPage/Withdraw.WithdrawFundsPage")
);
const WithdrawHistory = React.lazy(() =>
  import("../containers/UserPages/WithdrawPage/Withdraw.ReportStatusPage")
);

// Support section
const updates = React.lazy(() =>
  import("../containers/UserPages/SupportPage/Support.UpdateNews")
);
const supportTicket = React.lazy(() =>
  import("../containers/UserPages/SupportPage/Support.SupportTicketPage")
);
const TicketHistory = React.lazy(() =>
  import("../containers/UserPages/SupportPage/Support.TicketHistoryPage")
);
const ContactUs = React.lazy(() =>
  import("../containers/UserPages/SupportPage/Support.ContactPage")
);

/* ***************************** //admin// ************************** */
const AdminDashboard = React.lazy(() =>
  import("../containers/AdminPages/AdminHome/AdminHome")
);

// member section
const AllMember = React.lazy(() =>
  import("../containers/AdminPages/AdminMemberPage/Admin.AllMember")
);
const ActiveMember = React.lazy(() =>
  import("../containers/AdminPages/AdminMemberPage/Admin.ActiveMember")
);
const BlockedMember = React.lazy(() =>
  import("../containers/AdminPages/AdminMemberPage/Admin.BlockedMember")
);
const AdminTeamStatistics = React.lazy(() =>
  import("../containers/AdminPages/AdminMemberPage/Admin.TeamStatistics")
);

// deposit section
const AllDeposit = React.lazy(() =>
  import("../containers/AdminPages/AdminDepositReport/Admin.AllTransaction")
);
const SuccessfulDeposit = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminDepositReport/Admin.SuccessfulTransaction"
  )
);
const RejectedDeposit = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminDepositReport/Admin.RejectedTransaction"
  )
);

// withdraw section
const AllWithdraw = React.lazy(() =>
  import("../containers/AdminPages/AdminWithdrawReport/Admin.AllWithdraw")
);
const SuccessfulWithdraw = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminWithdrawReport/Admin.SuccessfulWithdraw"
  )
);
const RejectedWithdraw = React.lazy(() =>
  import("../containers/AdminPages/AdminWithdrawReport/Admin.RejectedWithdraw")
);

//admin KYC related routes

const AllKyc = React.lazy(() =>
  import("../containers/AdminPages/Admin.KYC/Admin.kyc.all")
);
const SuccessKyc = React.lazy(() =>
  import("../containers/AdminPages/Admin.KYC/Admin.kyc.success")
);
const RejectedKyc = React.lazy(() =>
  import("../containers/AdminPages/Admin.KYC/Admin.kyc.rejected")
);

// admin earnings
const AdminDirectIncome = React.lazy(() =>
  import("../containers/AdminPages/AdminEarningTrack/AdminEarning.DirectIncome")
);
const AdminLevelIncome = React.lazy(() =>
  import("../containers/AdminPages/AdminEarningTrack/AdminEarning.LevelIncome")
);
const AdminGlobalPoolIncome = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminEarningTrack/AdminEarning.GlobalPoolIncome"
  )
);
const AdminRankIncome = React.lazy(() =>
  import("../containers/AdminPages/AdminEarningTrack/AdminEarning.RankIncome")
);
const AdminStakingIncome = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminEarningTrack/AdminEarning.StakingIncome"
  )
);
const AdminStakingLevelIncome = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminEarningTrack/AdminEarning.StakingLevelIncome"
  )
);
const AdminBonusRewardIncome = React.lazy(() =>
  import(
    "../containers/AdminPages/AdminEarningTrack/AdminEarning.BonusRewardIncome"
  )
);
const AdminReward = React.lazy(() =>
  import("../containers/AdminPages/AdminFundTransfer/Admin.Reward")
);

// support section
const AdminCreateUpdate = React.lazy(() =>
  import("../containers/AdminPages/Admin.Support/CreateUpdate")
);
const AdminCreateUs = React.lazy(() =>
  import("../containers/AdminPages/Admin.Support/Admin.ContactUs")
);
const AdminTicketData = React.lazy(() =>
  import("../containers/AdminPages/Admin.Support/Admin.TicketData")
);

//games dashboard for admin
const AdminGameDashBoard = React.lazy(() =>
import("../containers/AdminPages/Game/AdminDashBoard/index")
)

// settings section
const AdminChangePassword = React.lazy(() =>
  import("../containers/AdminPages/Admin.Setting/Admin.ChangePassword")
);
const WiningPercentage = React.lazy(() =>
  import("../containers/AdminPages/Admin.Setting/Admin.WiningPercentage")
);
const AdminChangeEmail = React.lazy(() =>
  import("../containers/AdminPages/Admin.Account/Admin.ChangeEmail")
);
// const AdminPopUpImage = React.lazy(() =>
//   import("../containers/AdminPages/Admin.Setting/PopupImage")
// );
const AdminPDFController = React.lazy(() =>
  import("../containers/AdminPages/Admin.Setting/Admin.PDFController")
);

export const routers = [
  // { path: '/user/logout', name: 'Logout', permission: ['user','admin'], component: Logout },
  /****************************user routes *****************************************/
  {
    path: "*",
    exact: true,
    name: "Error",
    permission: ["user", "admin"],
    component: Page404,
  },
  // Dashboard
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    permission: ["user"],
    component: UserDashboard,
  },

  //###### SETTINGS CATEGORY#########################################
  // SETTINGS=>Profile Section
  {
    path: "/profile",
    name: "Welcome",
    permission: ["user"],
    component: MyProfile,
    exact: true,
  },
  {
    path: "/profile/my-profile",
    name: "My Profile",
    permission: ["user"],
    component: MyProfile,
  },
  {
    path: "/profile/edit-profile",
    name: "Update Profile",
    permission: ["user"],
    component: UpDateProfile,
  },
  {
    path: "/profile/update-email",
    name: "Update Email",
    permission: ["user"],
    component: UpDateEmail,
  },
  {
    path: "/profile/update-password",
    name: "Update Email",
    permission: ["user"],
    component: UpDatePassword,
  },
  // {
  //   path: "/profile/update-trxPassword",
  //   name: "Update Email",
  //   permission: ["user"],
  //   component: UpDateTrxPassword,
  // },
  {
    path: "/profile/add-bank",
    name: "Update Email",
    permission: ["user"],
    component: AddBank,
  },
  {
    path: "/profile/add-kyc",
    name: "Update Email",
    permission: ["user"],
    component: AddKyc,
  },

  // wallet section
  {
    path: "/wallet/my-wallet",
    name: "Update Email",
    permission: ["user"],
    component: wallet,
  },
  {
    path: "/wallet/deposit-fund",
    name: "Update Email",
    permission: ["user"],
    component: DepositFund,
  },
  {
    path: "/wallet/deposit-history",
    name: "Update Email",
    permission: ["user"],
    component: DepositHistory,
  },
  {
    path: "/wallet/fund-receiving-history",
    name: "Fund Receiving History",
    permission: ["user"],
    component: FundReceivingHistory,
  },

  // games section
  {
    path: "/games/color-game",
    name: "Color Game",
    permission: ["user"],
    component: ColorGame,
  },
  {
    path: "/games/color-game/betting-history",
    name: "Betting History",
    permission: ["user"],
    component: ColorGameHistory,
  },

  // Team section
  {
    path: "/team",
    name: "direct team",
    permission: ["user"],
    component: DirectTeam,
  },
  {
    path: "/team/direct-team",
    name: "direct team",
    permission: ["user"],
    component: DirectTeam,
  },
  {
    path: "/team/level-team",
    name: "level team",
    permission: ["user"],
    component: LevelTeam,
  },
  {
    path: "/team/team-business",
    name: "Team Business",
    permission: ["user"],
    component: UserTeamStatistics,
  },
  // top-up
  {
    path: "/topup",
    name: "direct team",
    permission: ["user"],
    component: TopUpAccount,
  },
  {
    path: "/topup/topup-account",
    name: "direct team",
    permission: ["user"],
    component: TopUpAccount,
  },
  {
    path: "/topup/topup-history",
    name: "direct team",
    permission: ["user"],
    component: TopUpHistory,
  },
  // earning section
  {
    path: "/earnings/level-income",
    name: "Profit Share",
    permission: ["user"],
    component: LevelIncome,
  },
  {
    path: "/earnings/roi-income",
    name: "Reward Income",
    permission: ["user"],
    component: RoiIncome,
  },
  {
    path: "/earnings/rank-income",
    name: "Rank Income",
    permission: ["user"],
    component: RankIncome,
  },
  {
    path: "/earnings/reward",
    name: " Actinic Bonus",
    permission: ["user"],
    component: Reward,
  },

  // withdraw section
  {
    path: "/withdraw/withdraw-fund",
    name: "withdraw funds",
    permission: ["user"],
    component: WithdrawFund,
  },
  {
    path: "/withdraw/withdraw-history",
    name: "withdraw history",
    permission: ["user"],
    component: WithdrawHistory,
  },

  // Settings =>Support
  {
    path: "/support/updates",
    name: "updates",
    permission: ["user"],
    component: updates,
    exact: true,
  },
  {
    path: "/support/support-ticket",
    name: "support ticket",
    permission: ["user"],
    component: supportTicket,
    exact: true,
  },
  {
    path: "/support/ticket-history",
    name: "ticket history",
    permission: ["user"],
    component: TicketHistory,
    exact: true,
  },
  {
    path: "/support/contact-us",
    name: "Contact Us",
    permission: ["user"],
    component: ContactUs,
    exact: true,
  },

  /*******************************************admin routes *********************************************/
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    permission: ["admin"],
    component: AdminDashboard,
  },

  // member section
  {
    path: "/member/team-statistics",
    exact: true,
    name: "Team Statistics",
    permission: ["admin"],
    component: AdminTeamStatistics,
  },
  {
    path: "/member/all-member",
    exact: true,
    name: "All Member",
    permission: ["admin"],
    component: AllMember,
  },
  {
    path: "/member/active-member",
    exact: true,
    name: "Active Member",
    permission: ["admin"],
    component: ActiveMember,
  },
  {
    path: "/member/blocked-member",
    exact: true,
    name: "Blocked Member",
    permission: ["admin"],
    component: BlockedMember,
  },
  {
    path: "/member/member-topup-history/:level/:userid",
    exact: true,
    name: "Top-Up History",
    permission: ["admin"],
    component: TopupHistoryByAdminPage,
  },

  // deposit section
  {
    path: "/deposit/all-deposit",
    exact: true,
    name: "All Deposit",
    permission: ["admin"],
    component: AllDeposit,
  },
  {
    path: "/deposit/successful-deposit",
    exact: true,
    name: "Successful Deposit",
    permission: ["admin"],
    component: SuccessfulDeposit,
  },
  {
    path: "/deposit/rejected-deposit",
    exact: true,
    name: "Rejected Deposit",
    permission: ["admin"],
    component: RejectedDeposit,
  },
  {
    path: "/topup/all-top-up-history",
    exact: true,
    name: "All Top-Up",
    permission: ["admin"],
    component: AdminTopupHistoryPage,
  },

  // withdraw section
  {
    path: "/Withdraw/all-withdraw",
    exact: true,
    name: "All Withdraw",
    permission: ["admin"],
    component: AllWithdraw,
  },
  {
    path: "/Withdraw/successful-withdraw",
    exact: true,
    name: "Successful Withdraw",
    permission: ["admin"],
    component: SuccessfulWithdraw,
  },
  {
    path: "/Withdraw/rejected-withdraw",
    exact: true,
    name: "Rejected Withdraw",
    permission: ["admin"],
    component: RejectedWithdraw,
  },

  // earings
  {
    path: "/earnings/direct-income",
    name: "Direct Income",
    permission: ["admin"],
    component: AdminDirectIncome,
  },
  {
    path: "/earnings/level-income",
    name: "Profit Share",
    permission: ["admin"],
    component: AdminLevelIncome,
  },
  {
    path: "/earnings/global-pool-income",
    name: "Gloabl Pool Income",
    permission: ["admin"],
    component: AdminGlobalPoolIncome,
  },
  {
    path: "/earnings/rank-income",
    name: "Rank Income",
    permission: ["admin"],
    component: AdminRankIncome,
  },
  {
    path: "/earnings/staking-income",
    name: "Staking Income",
    permission: ["admin"],
    component: AdminStakingIncome,
  },
  {
    path: "/earnings/staking-level-income",
    name: "Staking Profit Share",
    permission: ["admin"],
    component: AdminStakingLevelIncome,
  },
  {
    path: "/earnings/bonus-reward-income",
    name: "Gloabl Pool Income",
    permission: ["admin"],
    component: AdminBonusRewardIncome,
  },
  {
    path: "/earnings/admin-reward",
    name: "Reward",
    permission: ["admin"],
    component: AdminReward,
  },

  // admin kyc routes
  {
    path: "/kyc/all",
    name: "All KYC",
    permission: ["admin"],
    component: AllKyc,
  },
  {
    path: "/kyc/all",
    name: "All KYC",
    permission: ["admin"],
    component: AllKyc,
  },
  {
    path: "/kyc/successfull",
    name: "All KYC",
    permission: ["admin"],
    component: SuccessKyc,
  },
  {
    path: "/kyc/rejected",
    name: "All KYC",
    permission: ["admin"],
    component: RejectedKyc,
  },

  // { path: '/change-email', name: 'Change Email', permission: ['admin'], component: RoyaltyIncome },

  // support section
  {
    path: "/create-update",
    name: "Create Update",
    permission: ["admin"],
    component: AdminCreateUpdate,
  },
  {
    path: "/wining-percentage",
    name: "Wining Percentage",
    permission: ["admin"],
    component: WiningPercentage,
  },
  {
    path: "/contact-us",
    name: "Contact Us",
    permission: ["admin"],
    component: AdminCreateUs,
  },
  {
    path: "/ticket-data",
    name: "Ticket Data",
    permission: ["admin"],
    component: AdminTicketData,
  },

  // game dashboard section
  {
    path: "/color-games",
    name: "Color Games",
    permission: ["admin"],
    component: AdminGameDashBoard,
  },

  // setting section
  // {
  //   path: "/popup-image",
  //   name: "Popup Image",
  //   permission: ["admin"],
  //   component: AdminPopUpImage,
  // },
  {
    path: "/change-password",
    name: "Change Password",
    permission: ["admin"],
    component: AdminChangePassword,
  },
  {
    path: "/change-email",
    name: "Change Email",
    permission: ["admin"],
    component: AdminChangeEmail,
  },
  {
    path: "/pdf-controller",
    name: "PDF Controller",
    permission: ["admin"],
    component: AdminPDFController,
  },
];
