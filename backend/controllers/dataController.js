const data = require('../utils/data.json');

const dataset = async (req, res) => {
    const { age, gender, start_date, end_date } = req.query;
    console.log('inputs : ', age, gender, start_date, end_date);
    // Validate query parameters
    if (!age || !gender || !start_date || !end_date) {
        // console.log('object');
        return res.status(200).json(data);
    }

    // Convert start_date and end_date to Date objects
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Validate date formats
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
            message: 'Invalid date format. Use YYYY-MM-DD.',
        });
    }

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Function to handle age comparison
    const isAgeMatch = (itemAge, queryAge) => {
        if (queryAge === itemAge) {
            return true;
        }

        // Handle the case where queryAge is in the format ">25"
        if (queryAge.startsWith(">")) {
            const ageLimit = parseInt(queryAge.slice(1)); // extract the number part from ">25"
            return parseInt(itemAge) > ageLimit;
        }

        // Handle the case where queryAge is a range (e.g., "15-25")
        if (queryAge.includes("-")) {
            const [minAge, maxAge] = queryAge.split("-").map(num => parseInt(num));
            const ageValue = parseInt(itemAge);
            return ageValue >= minAge && ageValue <= maxAge;
        }

        return false;
    };

    // Filter the data
    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.Day); // Day is already in YYYY-MM-DD format

        // Compare age and ensure it matches
        const ageMatches = isAgeMatch(item.Age, age);

        // Return true if all conditions match
        return (
            ageMatches &&
            item.Gender === gender &&
            itemDate >= startDate &&
            itemDate <= endDate
        );
    });

    // console.log('Filtered Data:', filteredData);

    return res.status(200).json(filteredData);
};

module.exports = { dataset };
