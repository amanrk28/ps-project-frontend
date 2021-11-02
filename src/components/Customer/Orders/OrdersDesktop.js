import ListTable from 'components/common/ListTable/ListTable';

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
  { name: 'Delivery Date', dataname: 'delivery_date' },
  { name: 'Status', dataname: 'status' },
];

export default function OrdersDesktop({
  orderList,
  isLoading,
  renderListItem,
  onOpenOrderDetails,
}) {
  return (
    <ListTable
      headers={ORDER_TABLE_HEADERS}
      dataList={orderList}
      tableFor="Orders"
      isLoading={isLoading}
      customTableWrapper="customTableWrapper"
      renderListItem={renderListItem}
      onClickListItem={onOpenOrderDetails}
    />
  );
}
