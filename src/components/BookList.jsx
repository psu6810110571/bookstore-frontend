import { Space, Table, Button, Image, Tag } from 'antd';

export default function BookList(props) {
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true, 
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 80,
      render: (price) => `$${price}`
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
      width: 120,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: 'Cover',
      dataIndex: 'coverUrl',
      key: 'cover',
      width: 90,
      render: (coverUrl) => {
        // ✅ ตรวจสอบว่าเป็น URL เต็มหรือไม่
        const isExternalUrl = coverUrl?.startsWith('http://') || coverUrl?.startsWith('https://');
        const imageSrc = isExternalUrl ? coverUrl : `http://localhost:3080${coverUrl}`;
        
        return (
          <Image
            width={70}
            src={imageSrc}
            fallback="https://via.placeholder.com/70x100"
            alt="Book Cover"
            preview={false}
          />
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (cat) => {
        const categoryName = cat?.name || 'Unknown';
        let color;
        if (categoryName === 'Fiction') color = 'volcano'; 
        else if (categoryName === 'Science Fiction') color = 'green';
        else if (categoryName === 'Biography') color = 'blue';
        else color = 'geekblue'; 
        return <Tag color={color}>{categoryName}</Tag>
      }
    },
    {
      title: 'Liked',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 80,
    },
    {
      title: 'Action',
      key: 'action',
      width: 170,
      render: (text, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            onClick={() => props.onLiked && props.onLiked(record)}
          >
            Like
          </Button>
          
          <Button 
            size="small" 
            onClick={() => props.onEdit(record)}
          >
            Edit
          </Button> 
          
          <Button 
            danger 
            size="small" 
            onClick={() => props.onDeleted(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={props.data} 
      rowKey="id" 
      style={{ borderRadius: '8px', overflow: 'hidden' }}
    />
  );
}