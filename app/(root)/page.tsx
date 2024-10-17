import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";


const Home = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    redirect("/sign-in");
  }
  // let loggedIn = {firstName: ''}
  
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "guest"}
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
