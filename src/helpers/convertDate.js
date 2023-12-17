export const convertDate = (data) => {
    // Chuyển đổi timestamp thành đối tượng Date
    const timestamp = data * 1000; // Chuyển đổi từ giây sang mili giây
    const date = new Date(timestamp);

    const formattedDate = formatDate(date);
    return formattedDate;

    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}