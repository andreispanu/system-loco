export type DeviceTableProps = {
  devices: any[];
  page: number;
  rowsPerPage: number;
  handleRowClick: (deviceId: string) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
};
