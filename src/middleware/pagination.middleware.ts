exports.getPagination = (page, size) => {
    const limit = size ? +size : 50;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: payload } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, payload, totalPages, currentPage };
};