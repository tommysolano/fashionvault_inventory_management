import Card from "../components/Card";
import Chart from "../components/Chart";

const Home = () => {
  return (
    <div className="home">
      <div className="cards">
        <Card/>
      </div>
      <div className="chart">
        <h3>Sales of the Month</h3>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
