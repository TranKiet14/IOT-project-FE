export const convertTime = (data) => {
    // Chuyển đổi timestamp thành đối tượng Date
    const timestamp = data * 1000; // Chuyển đổi từ giây sang mili giây
    const date = new Date(timestamp);

    const formattedTime = formatTimeWithAMPM(date);
    return formattedTime;

    function formatTimeWithAMPM(date) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    }
}