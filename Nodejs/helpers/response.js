const responseJson = (res, status, data) => {
    return res.status(status).json(data);
};
export default responseJson