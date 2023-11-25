import React from "react";

const Newslettersection = () => {
  return (
    <div className="sst_newsletter">
      <div className="sst_newsletter-body">
        <div className="sst_news-image">
          <img
            src="https://digitrader.netlify.app/img/core-img/cash.png"
            alt=""
          />
        </div>
        <div className="sst_news-form">
          <h2>Don’t Miss Our News And Updates!</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.
          </p> */}
          <div>
            <input placeholder="Enter your email address" />
            <button>Add Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newslettersection;
