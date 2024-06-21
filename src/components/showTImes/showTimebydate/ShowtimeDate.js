
import MovieBlock from "../movieBlock/MovieBlock";
const ShowtimeDate = ({showTimesData ,selectedDate, selectedMonth, theaters, movies}) => {
    const filteredShowTimes = showTimesData.filter(
        (showTime) => showTime.date.substring(8, 10) == selectedDate && showTime.date.substring(5, 7) == selectedMonth
      );
      console.log(filteredShowTimes);
    return (
        <div>
            <h2>Show Times for {selectedDate}</h2>
            {filteredShowTimes.length > 0 ? (
                    <MovieBlock theater={theaters} movie={movies} showTimes={filteredShowTimes} />
            ) : (
                <p>No show times available for this date.</p>
            )}
        </div>
    );
}

export default ShowtimeDate;