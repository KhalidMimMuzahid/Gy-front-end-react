import {
  AiOutlineDashboard,
  AiOutlineToTop,
  AiOutlineWallet,
} from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { FiUser, FiSettings } from "react-icons/fi";
import {
  // GiReceiveMoney,
  GiTakeMyMoney,
} from "react-icons/gi";
import { GrGamepad } from "react-icons/gr";

import { MdOutlineSupportAgent } from "react-icons/md";
import { RiTeamLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { CgGames } from "react-icons/cg";
export const menus = [
  // ************************************* common dashboard menu ************************//
  {
    id: "337fwedkf",
    menu: "dashboard",
    icon: <AiOutlineDashboard />,
    route: "/dashboard",
    permission: ["user", "admin"],
  },
  // ************************************* admin dashboard menu ************************//
  {
    id: "7dfsegrr8srf",
    menu: "Member",
    icon: <FiUser />,
    permission: ["admin"],
    dropdown: [
      {
        id: "83agr89r4ifd",
        menu: "All Member",
        route: "/dashboard/member/all-member",
        permission: ["admin"],
      },
      {
        id: "838dga9r4ifd",
        menu: "Active Member",
        route: "/dashboard/member/active-member",
        permission: ["admin"],
      },
      {
        id: "838dga9ifd",
        menu: "Blocked Member",
        route: "/dashboard/member/blocked-member",
        permission: ["admin"],
      },
      {
        id: "838dga9ifd",
        menu: "Team Statistics",
        route: "/dashboard/member/team-statistics",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "7dfsrs8srf",
    menu: "Deposit Report",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "83bhi9r4ifd",
        menu: "All Transaction",
        route: "/dashboard/deposit/all-deposit",
        permission: ["admin"],
      },
      {
        id: "838dsoifd",
        menu: "Successful Report",
        route: "/dashboard/deposit/successful-deposit",
        permission: ["admin"],
      },
      {
        id: "8shbga9ifd",
        menu: "Rejected Report",
        route: "/dashboard/deposit/rejected-deposit",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "7dfsrs8srftopup",
    menu: "Topup Report",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "83bhi9r4ifdtpup",
        menu: "All Topup",
        route: "/dashboard/topup/all-top-up-history",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "ajjdrs8srf",
    menu: "withdraw",
    icon: <AiOutlineWallet />,
    permission: ["admin"],
    dropdown: [
      {
        id: "dajei9r4ifd",
        menu: "All Withdraw",
        route: "/dashboard/Withdraw/all-withdraw",
        permission: ["admin"],
      },
      {
        id: "ajobeoifd",
        menu: "Successful Withdraw",
        route: "/dashboard/Withdraw/successful-withdraw",
        permission: ["admin"],
      },
      {
        id: "aubia9ifd",
        menu: "Rejected Withdraw",
        route: "/dashboard/Withdraw/rejected-withdraw",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "4343qf3q2f",
    menu: "earning",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "34qqf43gq3hq",
        menu: "Levels",
        route: "/dashboard/earnings/level-income",
        permission: ["admin"],
      },
      // {
      //   id: "e7rfs5fhjubhjbhjbuguhjvgyffyg",
      //   // Might be change
      //   menu: "Game Wallet",
      //   route: "/dashboard/earnings/game-wallet",
      //   permission: ["admin"],
      // },
      {
        id: "f5sf5s8fs8f",
        menu: " ROI Income",
        route: "/dashboard/earnings/staking-income",
        permission: ["admin"],
      },
      {
        id: "f5sf5s8fs8zz",
        menu: "Winning Amount",
        route: "/dashboard/earnings/winning-amount",
        permission: ["admin"],
      },
      // Comment out unnessesary route
      // {
      //   id: "f5sf5s8fs8frank",
      //   menu: "Rank income",
      //   route: "/dashboard/earnings/rank-income",
      //   permission: ["admin"],
      // },
      // {
      //   id: "f5sf5s8fs8fnaj3w",
      //   menu: "Reward",
      //   route: "/dashboard/earnings/admin-reward",
      //   permission: ["admin"],
      // },
    ],
  },
  {
    id: "4343qf3q2g",
    menu: "KYC",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "f5sf5s8fs81",
        menu: " All KYC",
        route: "/dashboard/kyc/all",
        permission: ["admin"],
      },
      {
        id: "f5sf5s8fs82",
        menu: " Successfull KYC",
        route: "/dashboard/kyc/successfull",
        permission: ["admin"],
      },
      {
        id: "f5sf5s8fs83",
        menu: " Rejected KYC",
        route: "/dashboard/kyc/rejected",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "nf4au4awg43",
    menu: "Support",
    icon: <MdOutlineSupportAgent />,
    permission: ["admin"],
    dropdown: [
      {
        id: "98ay9uva",
        menu: "Contact Us",
        route: "/dashboard/contact-us",
        permission: ["admin"],
      },
      {
        id: "30ht9fwa",
        menu: "Ticket Data",
        route: "/dashboard/ticket-data",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "sf4s8f7sel",
    menu: "Games",
    icon: <CgGames />,
    permission: ["admin"],
    dropdown: [
      {
        id: "f4s8fezzz",
        menu: "Color Games",
        route: "/dashboard/color-games",
        permission: ["admin"],
      },
      // {
      //   id: "458s7fs8f8sf",
      //   menu: "Game History",
      //   route: "/dashboard/game-history",
      //   permission: ["admin"],
      // },
    ],
  },
  {
    id: "sf4s8f7ser",
    menu: "Setting",
    icon: <FiSettings />,
    permission: ["admin"],
    dropdown: [
      {
        id: "f4s8fe8r8",
        menu: "Change Password",
        route: "/dashboard/change-password",
        permission: ["admin"],
      },
      {
        id: "f5sfsf8sf",
        menu: "Change Email",
        route: "/dashboard/change-email",
        permission: ["admin"],
      },
      // {
      //   id: "sf4se8r9w",
      //   menu: "Popup Image",
      //   route: "/dashboard/popup-image",
      //   permission: ["admin"],
      // },
      {
        id: "4f7sfs8fs8f",
        menu: "PDF Controller",
        route: "/dashboard/pdf-controller",
        permission: ["admin"],
      },
      {
        id: "4f7sfs8fs8fnaj3w",
        menu: "Winning Percentage",
        route: "/dashboard/winning-percentage",
        permission: ["admin"],
      },
      {
        id: "4f7sfs8fs8fkaj3w",
        menu: "Game Percentage",
        route: "/dashboard/game-percentage",
        permission: ["admin"],
      },
      {
        id: "4s88sfs5f8wr",
        menu: "ROI Percentage",
        route: "/dashboard/roi-percentage",
        permission: ["admin"],
      },
      {
        id: "4s88sfs5f8hgh",
        menu: "Manage",
        route: "/dashboard/minimum-amount-percentage",
        permission: ["admin"],
      },
    ],
  },
  // ************************************* user dashboard menu ************************//
  {
    id: "7dfser8srf",
    menu: "profile",
    icon: <FiUser />,
    permission: ["user"],
    dropdown: [
      {
        id: "8389r4ifd",
        menu: "my profile",
        route: "/dashboard/profile/my-profile",
        permission: ["user"],
      },
      {
        id: "f7d8e8sfrw",
        menu: "Edit profile",
        route: "/dashboard/profile/edit-profile",
        permission: ["user"],
      },
      {
        id: "sf7s8f5s8er",
        menu: "Update password",
        route: "/dashboard/profile/update-password",
        permission: ["user"],
      },
      // {
      //   id: "f7s5f8se8r",
      //   menu: "Update trx password",
      //   route: "/dashboard/profile/update-trxPassword",
      //   permission: ["user"],
      // },
      {
        id: "sfs4f8se8",
        menu: "Update email",
        route: "/dashboard/profile/update-email",
        permission: ["user"],
      },
      {
        id: "d7f8wer8s",
        menu: "Add Bank",
        route: "/dashboard/profile/add-bank",
        permission: ["user"],
      },
      {
        id: "d7f8wer8s",
        menu: "Add KYC",
        route: "/dashboard/profile/add-kyc",
        permission: ["user"],
      },
    ],
  },
  {
    id: "f7df8sfd7f",
    menu: "wallet",
    icon: <AiOutlineWallet />,
    permission: ["user"],
    dropdown: [
      {
        id: "7854s8dfs5d",
        menu: "my wallet",
        route: "/dashboard/wallet/my-wallet",
        permission: ["user"],
      },
      {
        id: "8s8dfdepser",
        menu: "deposit fund",
        icon: <RiMoneyDollarCircleLine />,
        route: "/dashboard/wallet/deposit-fund",
        permission: ["user"],
      },
      {
        id: "e7rfs5fs25gsenbv565",
        menu: "Game Wallet History",
        route: "/dashboard/wallet/game-wallet",
        permission: ["user"],
      },
      {
        id: "fd7d8s48574",
        menu: "deposit history",
        route: "/dashboard/wallet/deposit-history",
        permission: ["user"],
      },
    ],
  },
  {
    id: "f7df8sfccc",
    menu: "Games",
    icon: <GrGamepad />,
    permission: ["user"],
    dropdown: [
      // {
      //   id: "7854s8dfs5d",
      //   menu: "Color game",
      //   route: "/dashboard/games/color-game",
      //   permission: ["user"],
      // },
      {
        id: "7854s8dfs5jk",
        menu: "My Game History",
        route: "/dashboard/games/color-game/betting-history",
        permission: ["user"],
      },
    ],
  },
  {
    id: "df79er8suf",
    menu: "My Partner",
    icon: <RiTeamLine />,
    permission: ["user"],
    dropdown: [
      {
        id: "r3er8re8sdf7dn",
        menu: "Referral Partner",
        route: "/dashboard/team/direct-team",
        permission: ["user"],
      },
      {
        id: "fs7erw55s",
        menu: "level Partner",
        route: "/dashboard/team/level-team",
        permission: ["user"],
      },
      //commented unnecesssary route
      // {
      //   id: "fs7erw55ssts",
      //   menu: "team business",
      //   route: "/dashboard/team/team-business",
      //   permission: ["user"],
      // },
    ],
  },
  {
    id: "m5vko5f5sfo3s5f",
    menu: "Top up",
    icon: <AiOutlineToTop />,
    permission: ["user"],
    dropdown: [
      {
        id: "fnd5fhs5or5f",
        menu: "topup account",
        route: "/dashboard/topup/topup-account",
        permission: ["user"],
      },
      {
        id: "vnzs5dajio5df8",
        menu: "topup history",
        route: "/dashboard/topup/topup-history",
        permission: ["user"],
      },
    ],
  },
  {
    id: "fsfsfusf8se4r",
    menu: "my earning",
    icon: <GiTakeMyMoney />,
    permission: ["user"],
    dropdown: [
      {
        id: "e7rfs5fs25gsenbvjj",
        menu: "Earning",
        route: "/dashboard/earnings/earning",
        permission: ["user"],
      },
      {
        id: "e7rfs5fs25gsenbv",
        menu: "Levels",
        route: "/dashboard/earnings/level-income",
        permission: ["user"],
      },
      {
        id: "fs55s8fs8fs",
        menu: " ROI Income",
        route: "/dashboard/earnings/roi-income",
        permission: ["user"],
      },
      {
        id: "fs55s8fs8fpt",
        menu: " Winning Amount",
        route: "/dashboard/earnings/winning-amount",
        permission: ["user"],
      },
      //commenting unnessesary route
      // {
      //   id: "fs55s8fs8fssstrs",
      //   menu: "Rank Income",
      //   route: "/dashboard/earnings/rank-income",
      //   permission: ["user"],
      // },
      // {
      //   id: "fdf8s8f8s8fs",
      //   menu: "Reward",
      //   route: "/dashboard/earnings/reward",
      //   permission: ["user"],
      // },
    ],
  },
  {
    id: "bv2sre2ws7sf",
    menu: "withdraw",
    icon: <BiTransfer />,
    permission: ["user"],
    dropdown: [
      {
        id: "vv4mk4ufi4sf",
        menu: "withdraw funds",
        route: "/dashboard/withdraw/withdraw-fund",
        permission: ["user"],
      },
      {
        id: "vn2sff47s7f7d",
        menu: "withdraw history",
        route: "/dashboard/withdraw/withdraw-history",
        permission: ["user"],
      },
    ],
  },
  {
    id: "vn3es6uru3sf7",
    menu: "support",
    icon: <MdOutlineSupportAgent />,
    permission: ["user"],
    dropdown: [
      {
        id: "sfs4f4s8e8r",
        menu: "updates",
        route: "/dashboard/support/updates",
        permission: ["user"],
      },
      {
        id: "vmj4dfs4f8sf",
        menu: "support ticket",
        route: "/dashboard/support/support-ticket",
        permission: ["user"],
      },
      {
        id: "vmj4de4ru4sf7s7",
        menu: "ticket history",
        route: "/dashboard/support/ticket-history",
        permission: ["user"],
      },
      {
        id: "f7s8f8fd",
        menu: "Contact Us",
        route: "/dashboard/support/contact-us",
        permission: ["user"],
      },
    ],
  },
];
