<<<<<<< HEAD
import { Modal, Form, Input, InputNumber, Select, Button, Row, Col } from 'antd';
import { useState } from 'react';
import { PlusOutlined, BookOutlined, DollarOutlined, NumberOutlined, LinkOutlined } from '@ant-design/icons';
=======
import { Modal, Form, Input, InputNumber, Select, Button, message } from 'antd';
import { useState } from 'react';
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c

export default function AddBook({ onBookAdded, categories }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
<<<<<<< HEAD
=======
    // แปลงค่าตัวเลขให้ชัวร์ก่อนส่ง
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
    const newBook = {
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        categoryId: values.categoryId
    };

<<<<<<< HEAD
    onBookAdded(newBook); 
    
=======
    // ✅ แก้ไขแล้ว: ลบตัวหนังสือ ออก เรียกใช้ฟังก์ชันได้ปกติ
    onBookAdded(newBook); 
    
    // ปิด Modal และล้างค่า
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
<<<<<<< HEAD
      <Button 
        type="primary" 
        onClick={showModal} 
        icon={<PlusOutlined />} 
        size="large"
        style={{ marginBottom: 16, borderRadius: '6px' }}
      >
        Add New Book
      </Button>

      <Modal
        title={<span><BookOutlined /> Add New Book to Inventory</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        width={700}
        okText="Create Book"
        cancelText="Cancel"
      >
        <Form 
            form={form} 
            layout="vertical" 
            onFinish={handleSubmit}
            style={{ marginTop: '20px' }}
        >
          <Row gutter={16}>
            <Col span={24}>
                <Form.Item 
                    name="title" 
                    label="Book Title" 
                    rules={[{ required: true, message: 'Please enter book title' }]}
                >
                    <Input placeholder="e.g. The Great Gatsby" />
                </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
                <Form.Item 
                    name="author" 
                    label="Author" 
                    rules={[{ required: true, message: 'Author name is required' }]}
                >
                    <Input placeholder="e.g. F. Scott Fitzgerald" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item 
                    name="categoryId" 
                    label="Category" 
                    rules={[{ required: true, message: 'Select a category' }]}
                >
                    <Select 
                        placeholder="Select category"
                        options={categories}
                    />
                </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Brief summary of the book..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
                <Form.Item 
                    name="price" 
                    label="Price" 
                    rules={[{ required: true, message: 'Enter price' }]}
                >
                    <InputNumber 
                        min={0} 
                        step={0.01} 
                        style={{ width: '100%' }} 
                        prefix={<DollarOutlined />}
                        placeholder="0.00"
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item 
                    name="stock" 
                    label="Stock Quantity" 
                    rules={[{ required: true, message: 'Enter stock' }]}
                >
                    <InputNumber 
                        min={0} 
                        style={{ width: '100%' }} 
                        placeholder="0"
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item 
                    name="isbn" 
                    label="ISBN" 
                    rules={[{ required: true, message: 'Enter ISBN' }]}
                >
                    <Input prefix={<NumberOutlined />} placeholder="13 digits" />
                </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            name="coverUrl" 
            label="Cover Image URL"
            initialValue=""
          >
            <Input 
                prefix={<LinkOutlined />} 
                placeholder="https://example.com/image.jpg" 
            />
=======
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        + Add New Book
      </Button>

      <Modal
        title="Add New Book"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()} // สั่งให้ Form submit เมื่อกดปุ่ม OK
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          {/* ใช้ Select ของ Ant Design เพื่อความสวยงามและรับค่า categories */}
          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select 
                placeholder="Select a category"
                options={categories} // รับ options มาจาก props
            />
          </Form.Item>

          <Form.Item 
            name="coverUrl" 
            label="Cover URL"
            initialValue=""
          >
            <Input placeholder="Paste image URL or leave blank" />
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}