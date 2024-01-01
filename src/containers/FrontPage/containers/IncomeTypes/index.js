import React from "react";
import CustomLink from "../../../../components/Link";
const IncomeTypes = () => {
  return (
    <div className='ss-trade_front_plan_wrapper'>
      <div className='landingPage_container container'>
        <div className='ss-trade_front_plan_content'>
          <div className='title'>
            <h2 id='packages'>INCOMES</h2>
          </div>
          <div className='table_sale_card'>
            <Card
              buttonText='START'
              buttonStyle='#e8c743'
              discountText='Income 1'
              packageAmount='Direct Income'
              mining='Package Profit'
              className='dark_blue'
              fontSize='20px'
              headingSize='45px'
            />
            <Card
              className='dark_blue'
              discountText='Income 2'
              packageAmount='Level ROI'
              mining='Package Profit'
              buttonText='START'
              buttonStyle='#e8c743'
              fontSize='20px'
              headingSize='45px'
            />
            <Card
              className='dark_blue'
              discountText='Income 3'
              packageAmount='Global Pool Income'
              mining='Package Profit'
              buttonText='START'
              buttonStyle='#e8c743'
              fontSize='20px'
              headingSize='45px'
            />
            <Card
              discountText='Income 4'
              packageAmount='Rank Income'
              mining='Package Profit'
              className='dark_blue'
              buttonText='START'
              buttonStyle='#e8c743'
              fontSize='20px'
              headingSize='45px'
            />
            <Card
              discountText='Income 5'
              packageAmount='Staking Income'
              mining='Package Profit'
              className='dark_blue'
              buttonText='START'
              buttonStyle='#e8c743'
              fontSize='20px'
              headingSize='45px'
            />
            <Card
              discountText='Income 6'
              packageAmount='Bonus Reward Income'
              mining='Package Profit'
              className='dark_blue'
              buttonText='START'
              buttonStyle='#e8c743'
              fontSize='20px'
              headingSize='45px'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTypes;

const Card = ({
  className,
  discountStyle,
  discountText,
  h4Style,
  headingSize,
  fontWeight,
  margin,
  buttonText,
  textGray,
  buttonStyle,
  buttonColor,
  discountTextClass,
  packageAmount,
}) => {
  return (
    <div className={`table_sale ${className}`}>
      <p className='center_element'>
        <span
          style={{
            background: `${discountStyle}`,
            fontWeight: `${fontWeight}`,
          }}
          className={discountTextClass}
        >
          {discountText}
        </span>
      </p>
      <div className='horizontal' style={{ margin: `${margin}` }}></div>
      <h4
        className={`center_element text_white ${textGray}`}
        style={{ color: `${h4Style}`, fontSize: `${headingSize}` }}
      >
        {packageAmount}
      </h4>
      <div className='horizontal'></div>
      <div className='button'>
        <CustomLink
          to='/register'
          className='card_btn'
          style={{ backgroundColor: `${buttonStyle}` }}
        >
          <span
            className='buy_button'
            style={{
              color: `${buttonColor} !important`,
            }}
          >
            {buttonText}
          </span>
        </CustomLink>
      </div>
    </div>
  );
};
