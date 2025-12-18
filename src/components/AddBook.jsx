import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import { useState } from 'react';

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
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        + Add New Book
      </Button>

      <Modal
        title="Add New Book"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
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

          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select 
                placeholder="Select a category"
                options={categories}
            />
          </Form.Item>

          <Form.Item 
            name="coverUrl" 
            label="Cover URL"
            initialValue=""
          >
            <Input placeholder="Paste image URL or leave blank" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}