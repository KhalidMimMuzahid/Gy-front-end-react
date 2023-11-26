import React from "react";
import ft from "../../../../assets/globe.png";

const FutureSection = () => {
    return (
        <div className='future_container'>
            <div className="container">
                <div className="future_inner">
                    <div className="future_left">
                        <img src={ft} alt="" />
                    </div>
                    <div className="future_right">
                        <h2>What is going to happen?</h2>
                        <p>The next decade will be a transformational one for Grow More, as we recruit and develop a new, diverse generation of talent, for a new world of work. This is essential for three reasons. Firstly, we passionately believe that greater diversity will further strengthen our open, inclusive culture. Secondly, diverse teams ask better questions and therefore help us make better investment decisions. Lastly, it is the right thing to do.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FutureSection;
