import { ReactNode } from 'react';

import { TableColumn, DataItem } from '@/types/common';
import Icon from '@/components/common/Icon';
import '@/assets/scss/components/common/table.scss';

interface Props {
    tableColumns: TableColumn[]
    dataList: DataItem[]
    noDataText?: string
    isLoading?: boolean
    renderChild?: (item: DataItem, column: string) => ReactNode | null // 自定義渲染內容
}

function Table({tableColumns, dataList, renderChild, noDataText = '暫無資料', isLoading }: Props) {
    return(
        <div className={`rps-table ${ isLoading ? 'table-loading' : '' } `}>
            <table>
                <thead>
                    <tr>
                        {tableColumns.map((headItem) => (
                            <th
                                key={headItem.column}
                                className={`column-align-${headItem.align || 'left'}`}
                            >
                                {headItem.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList.length ?
                        dataList.map((bodyItem, index) => (
                            <tr key={`${JSON.stringify(bodyItem)}-${index}`}>
                                {
                                    tableColumns.map((columnItem) => (
                                        <td
                                            key={columnItem.column}
                                            className={`column-align-${columnItem.align || 'left'}`}
                                        >
                                            {renderChild && renderChild(bodyItem, columnItem.column) || bodyItem[columnItem.column]}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                        :
                        <tr>
                            <td
                                className="empty-data"
                                colSpan={tableColumns.length}
                            >
                                {noDataText}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="loading-icon">
                <Icon type="spinner" />
            </div>
        </div>
    )
};
export default Table