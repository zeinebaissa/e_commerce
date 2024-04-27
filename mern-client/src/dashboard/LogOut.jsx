

const LogOut = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/signin';
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
};

export default LogOut;
