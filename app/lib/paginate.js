export const paginate = async (response, model, req) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let total;

  if (req.query.date && req.query.conferenceRoom) {
    const date = new Date(parseInt(req.query.date));
    date.setUTCHours(2, 0, 0, 0);

    total = await model.countDocuments({
      conferenceRoom: req.query.conferenceRoom,
      date: date.getTime()
    });
  } else {
    total = await model.countDocuments();
  }

  response = response.skip(startIndex).limit(limit);

  // Executing query
  const results = await response;

  // Pagination result
  const pagination = {};

  pagination.currentPage = page;

  pagination.pagesNumber = Math.ceil(total / limit);

  return {
    results,
    count: results.length,
    pagination
  };
};
