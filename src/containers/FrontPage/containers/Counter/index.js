import React from 'react'
import { useGetWebsiteAnalyticsQuery } from '../../../../Services/Setting';

const Counter = () => {
    const {data} = useGetWebsiteAnalyticsQuery();
    const totalUsers = Number(data?.analytics?.totalUsers);
    const todayUsers = Number(data?.analytics?.todayUsers);
    const boosterUsers = Number(data?.analytics?.boosterUsers);
  return (
    <div className='ss-trade_counter_section_wrapper'>
        <div className="container">
            <div className="ss-trade_counter_box_wrapper">
                <div className="counter">
                    <span>{totalUsers.toLocaleString()}</span>
                    <h2>Total Users</h2>
                </div>
                <div className="counter">
                    <span>{todayUsers.toLocaleString()}</span>
                    <h2>Today Users</h2>
                </div>
                <div className="counter">
                    <span>{boosterUsers.toLocaleString()}</span>
                    <h2>Booster Users</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Counter