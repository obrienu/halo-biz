import React from 'react';
import "../user-profile-styles.scss";
import Button  from "../../../../components/CustomResables/Button/button"
function TopBlock(props) {
    return (
        <div className="cutom-backdrop">
            <div className="button-container">
                <Button
                    onClick= {() => {}}
                    style={{color: "#fff", margin: "1rem"}}
                >
                    Contact Line Manager
                </Button>

                <Button
                    onClick= {() => {}}
                    style={{color: "#fff", margin: "1rem"}}
                >
                    Contact HR-BP
                </Button>

            </div>
        </div>
    );
}

export default TopBlock;