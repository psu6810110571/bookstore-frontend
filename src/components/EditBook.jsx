import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
    const [form] = Form.useForm();

    // เมื่อเปิด Modal หรือเปลี่ยนเล่ม ให้เอารายละเอียดเก่าไปใส่ในฟอร์ม
    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue(props.item);
            // กรณี category เป็น object ต้องดึง id ออกมาใส่แทนเพื่อให้ Select รู้จัก
            if (props.item.category) {
                form.setFieldValue('categoryId', props.item.category.id);
            }
        }
    }, [props.isOpen, props.item, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            props.onSave(values); // ส่งข้อมูลกลับไปบันทึก
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
        >
            <Form form={form} layout="vertical" name="edit_book_form">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select options={props.categories} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
