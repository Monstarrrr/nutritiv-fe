export const COLUMNS = [
  {
    Header: 'Id',
    accessor: '_id',
    Footer: 'Personal info',
  },
  {
    Header: 'Count in stock',
    accessor: 'countInStock',
    Footer: 'Personal info',
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    Footer: 'Personal info',
  },
  {
    Header: 'Description',
    accessor: 'desc',
    Footer: 'Personal info',
  },
  {
    Header: 'Images',
    accessor: 'imgs',
    Footer: 'Some other info',
  },
  // {
  //   Header: 'Items',
  //   accessor: 'productItems',
  // },
  {
    Header: 'Shape',
    accessor: 'shape',
    Footer: 'Some other info',
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Footer: 'Some other info',
  },
  {
    Header: 'Title',
    accessor: 'title',
    Footer: 'Some other info',
  },
  {
    Header: 'Updated at',
    accessor: 'updatedAt',
    Footer: 'Some other info',
  },
  {
    Header: '__v',
    accessor: '__v',
    Footer: 'Some other info',
  },
]

export const GROUPED_COLUMNS = [
  {
    Header: 'Personal Info',
    columns: [
      {
        Header: 'Id',
        accessor: '_id',
      },
      {
        Header: 'Count in stock',
        accessor: 'countInStock',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Description',
        accessor: 'desc',
      },
    ]
  },
  {
    Header: 'Some other info',
    columns: [
      {
        Header: 'Images',
        accessor: 'imgs',
      },
      // {
      //   Header: 'Items',
      //   accessor: 'productItems',
      // },
      {
        Header: 'Shape',
        accessor: 'shape',
      },
      {
        Header: 'Tags',
        accessor: 'tags',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Updated at',
        accessor: 'updatedAt',
      },
      {
        Header: '__v',
        accessor: '__v',
      },
    ]
  },
]