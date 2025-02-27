const CountdownServer = () => {
    const targetDate = new Date("2025-10-04T00:00:00Z").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
  
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  
    return (
      <div className="text-white text-lg md:text-xl font-semibold">
        {timeLeft.days} dagar kvar
      </div>
    );
  };
  
  export default CountdownServer;