export default (res, code, obj) => {
    res.status(code).send(obj);
};