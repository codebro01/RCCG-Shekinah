export const pagePaginationHelper = (page, limit) => {
    const currentPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 5;
    const skip = (currentPage - 1) * pageLimit;

    return {pageLimit, skip, currentPage};
}