import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Biswanath",
    lastName: "Bose",
    email: "bose@JSM.com",
  };
  // let loggedIn = {firstName: ''}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
        </header>
        <TotalBalanceBox
          accounts={[]}
          totalBanks={3}
          totalCurrentBalance={6550.89}
        />
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 225.89}, {currentBalance: 477.00}]} />
    </section>
  );
};

export default Home;
