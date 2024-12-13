export const pagePaginationHelper = (page, limit) => {
    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * pageLimit;

    return {limit, skip};
}