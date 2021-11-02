import { ORDER_STATUSES } from 'components/GlobalConstants';
import './OrdersMobile.scss';

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
  { name: 'Delivery Date', dataname: 'delivery_date' },
];

export default function OrdersMobile({ orderList, onOpenOrderDetails }) {
  return (
    <ul className="mobile-table-wrapper">
      {orderList.length > 0 ? (
        orderList.map(order => (
          <li key={order.id}>
            <div
              className="touchableContent"
              onClick={() => onOpenOrderDetails(order.id)}
            >
              {ORDER_TABLE_HEADERS.map(item => (
                <div className={`${item.dataname}`} key={item.dataname}>
                  <div className="fieldName">{item.name}:</div>
                  <div className="value">{order[item.dataname] || 'N/A'}</div>
                </div>
              ))}
            </div>
            <div className={`status ${order.status}`}>
              {ORDER_STATUSES.find(x => x.id === order.status).name}
            </div>
          </li>
        ))
      ) : (
        <div className="tableEmpty center">No Orders available right now</div>
      )}
    </ul>
  );
}
