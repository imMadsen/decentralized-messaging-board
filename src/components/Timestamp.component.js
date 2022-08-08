export const Timestamp = ({ date }) => {
    return (
        <div className="timestamp">
            <hr />
            <p>{date.toLocaleString()}</p>
            <hr />
        </div>
    )
}