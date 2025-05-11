import { useMemo } from 'react';

import Icon from '@/components/common/Icon';
import '@/assets/scss/components/common/pagination.scss';

interface Props {
    totalPage: number
    currentPage: number
    viewLength?: number
    updatePage: (page: number) => void
}

function Pagination ({totalPage, currentPage, updatePage, viewLength = 5}: Props) {

    const updatePageByStep = (step: number): number => {
        const result = currentPage + step;
        if (result <= 1) {
            return 1;
        } else if (result >= totalPage) {
            return totalPage
        }
        return result;
    };

    const updatePageHandler = (page: number): void => {
        if (page !== currentPage) {
            updatePage(page);
        }
    };

    const slicePageList = useMemo<number[]>(() => {
        // 依總頁數生成完整長度的 page list
        const pageList = Array.from({length: totalPage}, (_, index) => index + 1);

        let sliceStartIndex = 1;
        let sliceEndIndex = -1;

        // # 當總頁數長度足夠時, 計算需進行過濾顯示的中間段頁數切片
        if (pageList.length > viewLength + 2) {
            // 取得 current page 和最左與最右的距離
            const leftDistance = currentPage - 1;
            const rightDistance = totalPage - currentPage;
            // 根據 viewLength 計算扣除 current page item 後, 往左右可延伸的 page item 數量 (無條件進位)
            const singleSideButtonCount = Math.round((viewLength - 1) / 2);
            // 計算左右側觸底時, 另一側須補全的 item 數量
            const leftSideSliceFix = rightDistance - singleSideButtonCount <= 0 ? singleSideButtonCount - rightDistance + 1 : 0;
            const rightSideSliceFix = leftDistance - singleSideButtonCount <= 0 ? singleSideButtonCount - leftDistance + 1 : 0;
            // 定義切片位置
            sliceStartIndex = leftDistance <= singleSideButtonCount ? 1 : leftDistance - singleSideButtonCount - leftSideSliceFix;
            sliceEndIndex = rightDistance <= singleSideButtonCount ? -1 : (rightDistance - singleSideButtonCount - rightSideSliceFix) * -1;
        }
        return pageList.slice(sliceStartIndex, sliceEndIndex);
    }, [totalPage, currentPage, viewLength]);

    return(
        <div className="flex items-center justify-center">
            <ul className="rps-pagination">
                <li
                    className={`pagination-item icon-item ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => updatePageHandler(updatePageByStep(-1))}
                >
                    <Icon type="chevronLeft" />
                </li>
                <li
                    className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => updatePageHandler(1)}
                >
                    {1}
                </li>
                {slicePageList[0] - 1 > 1 && <li>...</li>}
                {slicePageList.map((item) => (
                    <li
                        key={item}
                        className={`pagination-item ${currentPage === item ? 'active' : ''}`}
                        onClick={() => updatePageHandler(item)}
                    >
                        {item}
                    </li>
                ))}
                {totalPage - slicePageList[slicePageList.length - 1] > 1 && <li>...</li>}
                {
                    totalPage > 1 &&
                    <li
                        className={`pagination-item ${currentPage === totalPage ? 'active' : ''}`}
                        onClick={() => updatePageHandler(totalPage)}
                    >
                        {totalPage}
                    </li>
                }
                <li
                    className={`pagination-item icon-item ${currentPage === totalPage ? 'disabled' : ''}`}
                    onClick={() => updatePageHandler(updatePageByStep(1))}
                >
                    <Icon type="chevronRight" />
                </li>
            </ul>
        </div>
    )
};

export default Pagination