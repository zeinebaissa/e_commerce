

const Dashboard = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
    width: '100%', 
    color: 'black'
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px', 
  };

  const infoStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}  >
      <h1 style={titleStyle}>Welcome to your workspace</h1>
      <p style={infoStyle}>This is the admin part of FOR HER Store.</p>
    </div>
  );
}

export default Dashboard;
