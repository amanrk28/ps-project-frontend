import React, { ReactNode, memo } from 'react';
import { ObjectType } from 'store/reducers/rootState';
import Loading from '../Loading/Loading';
import './ListTable.scss';

interface RenderListItemProps {
  idx: number;
  dataItem: any;
  item: ObjectType;
}

interface ListTableProps {
  isLoading?: boolean;
  headers: ObjectType[];
  dataList: ObjectType[];
  customTableWrapper?: string;
  tableFor: string;
  onClickListItem?: (id: any) => void;
  renderListItem: (props: RenderListItemProps) => ReactNode;
}

const ListTable = ({
  renderListItem,
  isLoading = false,
  headers,
  dataList,
  customTableWrapper = '',
  tableFor,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickListItem = () => {},
}: ListTableProps) => {
  return (
    <ul className={`table-wrapper ${customTableWrapper || ''}`}>
      <li key="header">
        {headers.map(header => (
          <div
            key={header.dataname}
            className={`tableHeader ${header.dataname}`}
          >
            {header.name}
          </div>
        ))}
      </li>
      {isLoading ? (
        <Loading />
      ) : dataList.length > 0 ? (
        dataList.map((dataItem, idx) => (
          <li key={dataItem.id} onClick={() => onClickListItem(dataItem.id)}>
            {headers.map(item => renderListItem({ idx, dataItem, item }))}
          </li>
        ))
      ) : (
        <div className="tableEmpty center">No {tableFor} Found</div>
      )}
    </ul>
  );
};

export default memo(ListTable);
