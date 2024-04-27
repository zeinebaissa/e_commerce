import "./Time.css"
const Timing = () => {
    return (
      <div>
        <h2 className="text-4xl font-extrabold text-center font-bold my-5">Explore Our World - Opening Hours</h2>
        <table className="custom-table">
            <tr>
                <td> Monday to Friday</td>
                <td>Open: 8:00 AM
Close: 6:00 PM</td>
            </tr>
            <tr>
                <td> Saturday</td>
                <td>Open: 9:00 AM
Close: 3:00 PM</td>
            </tr>
            <tr>
                <td> Sunday</td>
                <td>Closed</td>
            </tr>
            <tr>
                <td colSpan={2}>
                Plan your visit wisely, and immerse yourself in a world of quality used vehicles and premium services at OUR GARAGE! 🚗✨
                </td>
            </tr>
        </table>
      </div>
    )
  }
  
  export default Timing
  