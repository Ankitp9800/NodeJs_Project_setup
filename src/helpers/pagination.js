
const paginate = async (model, page = 1, limit = 10, query = {}) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    
    const skip = (page - 1) * limit;
    const totalDocuments = await model.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);
    
    const data = await model.find(query).skip(skip).limit(limit);
    
    return {
        totalDocuments,
        totalPages,
        currentPage: page,
        pageSize: limit,
        data
    };
};

module.exports = { paginate };
