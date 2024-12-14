export const pagePaginationHelper = (page, limit) => {
    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 5;
    const skip = (pageNumber - 1) * pageLimit;

    return {pageLimit, skip};
}