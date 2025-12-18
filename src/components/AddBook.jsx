import { Modal, Form, Input, InputNumber, Select, Button, Row, Col } from 'antd';
import { useState } from 'react';
import { PlusOutlined, BookOutlined, DollarOutlined, NumberOutlined, LinkOutlined } from '@ant-design/icons';

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
    const newBook = {
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        categoryId: values.categoryId
    };

    onBookAdded(newBook); 
    
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}