/**
 * User Profile Page
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";
import MyModal from "../../../components/MyModal/MyModal"
// Components
import Profile from './component/Profile';
import UserBlock from './component/UserBlock';
import "./user-profile-styles.scss";

// rct card box
import { RctCard } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import TopBlock from "./component/TopBlock";

// For Tab Content
function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   );
}

export default class UserProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   }

   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }

   render() {
      const { activeTab } = this.state;
      return (
         <div className="userProfile-wrapper">
            <Helmet>
               <title>User Profile</title>
               <meta name="description" content="User Profile" />
            </Helmet>
            <PageTitleBar title="User Profile" match={this.props.match} />
            <MyModal/>
            <RctCard>
            <main className="user-main">
                  <TopBlock/>
                   
               
                  <div className="user-bottom">
                  <UserBlock />
               <div className="rct-tabs">
                  <AppBar className="" position="static">
                     <Tabs
                        value={activeTab}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        indicatorColor="primary"
                     >
                        <Tab
                           label="Profile"
                        />
                        <Tab
                           label="Pay Slip"
                        />
                        <Tab
                           label="Leave History"
                        />
                        <Tab
                           label="Attachments"
                        />
                      
                     </Tabs>
                  </AppBar>
                  
                  {activeTab === 0 &&
                     <div className="user-profile-tab">
                        <Profile />
                     </div>}
                  {activeTab === 1 &&
                     <TabContainer>
                        
                     </TabContainer>}
                  {activeTab === 2 &&
                     <TabContainer>
                        
                     </TabContainer>}
                  {activeTab === 3 &&
                     <TabContainer>
                        
                     </TabContainer>}
               </div>
            
               </div>

          
            </main>
       
            </RctCard>
            
         </div>
      );
   }
}
