import queryAsync from "../helpers/query.js"

const handleBooking = async (req, res) => {
    try {
        // Ví dụ: lưu dữ liệu đặt phòng vào bảng bookings
        const { name, email, date, time } = req.body;
        console.log(req.body,1)
        console.log({name ,email, date, time},2);
        const insertSql = `
            INSERT INTO bookings (customer_name, email, date, time)
            VALUES (?, ?, ?, ?)
        `;
        console.log('3')
        await queryAsync(insertSql, [name, email, date, time]);
        console.log('4')
        // Phản hồi lại frontend
        res.json({ message: 'Booking received successfully', data: bookingData });
    } catch (err) {
        console.error('Error handling booking:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFormData = async (req, res) => {
    try {
        const sql = 'SELECT service_name FROM services';
        const sql2 = `SELECT * FROM bookings WHERE user_id NOT IN (SELECT user_id FROM users`
        const services = await queryAsync(sql);
        const services2 = await queryAsync(sql2);
        console.log(services2)


        // Cấu trúc dữ liệu trả về
        const formData = {
            services: services.map(service => service.service_name),
            availableTimes: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
        };

        // Trả về dữ liệu dưới dạng JSON
        res.json(formData);
    } catch (err) {
        console.error('Error fetching form data:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { handleBooking, getFormData }
