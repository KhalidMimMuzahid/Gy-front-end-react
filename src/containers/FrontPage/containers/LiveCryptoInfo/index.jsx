import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DataTable from "../../../../components/DataTable";

const LiveCryptoInfo = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    const cryptoFecth = async () => {
      await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      )
        .then((res) => res.json())
        .then((data) => setCoins(data));
    };
    cryptoFecth();
  }, []);

  const columns = [
    { id: "rank", label: "Rank", minWidth: 10 },
    { id: "Coin", label: "Coin", minWidth: 50 },
    { id: "price", label: "Price", minWidth: 50 },
    { id: "lastUpdate", label: "Last Update", minWidth: 50 },
    { id: "lowest_in_24h", label: "Lowest in 24h ", minWidth: 50 },
    { id: "marketCap", label: "Market Cap", minWidth: 50 },
    { id: "price_change", label: "Change", minWidth: 50 },
    { id: "market_change_in_24h", label: "Market Change in 24h", minWidth: 50 },
  ];

  function createData(
    rank,
    Coin,
    price,
    lastUpdate,
    lowest_in_24h,
    marketCap,
    price_change,
    market_change_in_24h
  ) {
    return {
      rank,
      Coin,
      price,
      lastUpdate: lastUpdate,
      lowest_in_24h,
      marketCap,
      price_change,
      market_change_in_24h,
    };
  }
  // const dataupdate = new Date();
  const rows = coins?.map((da) =>
    createData(
      da.market_cap_rank,
      da.name,
      da.current_price,
      new Date().toLocaleString(da.lastUpdate),
      da.low_24h,
      da.market_cap,
      da.price_change_24h,
      da.market_cap_change_24h
    )
  );

  return (
    <>
      {/* <div className="Live_crypto_Info_wrapper" id="about">
          <div className="Live_crypto_Info_section">
          
          </div>
          </div>
        </div> */}
      <div className="LiveCrypto_Container">
        <div className="container">
          <Paper>
            <DataTable
              columns={columns}
              rows={rows}
              perPageShow={10}
              tableHeight={590}
              className="common_table"
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default LiveCryptoInfo;
