import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue(props.item);
            if (props.item.category) {
                form.setFieldValue('categoryId', props.item.category.id);
            }
        }
    }, [props.isOpen, props.item, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            props.onSave(values);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal 
            title="Edit Book" 
            open={props.isOpen} 
            onOk={handleOk} 
            onCancel={props.onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="edit_book_form">
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
                    <Select options={props.categories} />
                </Form.Item>

                <Form.Item name="coverUrl" label="Cover URL">
                    <Input placeholder="Paste image URL or leave blank" />
                </Form.Item>
            </Form>
        </Modal>
    );
}