export default class PageSequencer {
    constructor(pageContainer) {
        this.pageIndex = 0;
        this.pageContainer = pageContainer;
        this.pagesList = Array.from(this.pageContainer.children);
        this.currentPage = this.pagesList[this.pageIndex];
    };

    next() {
        this.pageIndex = this.pageIndex > this.pagesList.length ? 0 : this.pageIndex;

        let nextPage = this.pagesList[this.pageIndex + 1];
        
        this.currentPage.toggleAttribute('data-disabled');
        this.currentPage = nextPage;

        this.pageIndex++;
        
        delete this.currentPage.dataset.disabled;
    };

    prev() {
        this.pageIndex = this.pageIndex <= 0 ? this.pagesList.length : this.pageIndex;

        let prevPage = this.pagesList[this.pageIndex - 1];

        this.currentPage.toggleAttribute('data-disabled');
        this.currentPage = prevPage;

        this.pageIndex--;
        
        delete this.currentPage.dataset.disabled;
    };

    jumpTo(index) {
        if (!this.pagesList[index])
            return;
     

        let page = this.pagesList[index]

        this.currentPage.setAttribute('data-disabled');
        this.currentPage = page;
        
        this.pageIndex = index;

        delete this.currentPage.dataset.disabled;
    };
}